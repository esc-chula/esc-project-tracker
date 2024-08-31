'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { newProjectFormSchema } from '@/src/constant/schema';
import { set, z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/src/components/ui/form';
import { Input } from '@/src/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/src/components/ui/select';

import { Textarea } from '../ui/textarea';
import { useEffect, useMemo, useState } from 'react';
import { projectTypeMap } from '@/src/constant/Map';
import createProject from '@/src/service/project/createProject';
import { ProjectType } from '@/src/constant/enum';
import { useToast } from '../ui/use-toast';
import { useRouter } from 'next/navigation';
import joinProjectByStudentId from '@/src/service/user-proj/joinProjectByStudentId';
import MembersInput from './membersInput';
import { Project } from '@/src/interface/project';
import { projectFormAction } from '@/src/constant/formAction';
import FormLabelWithCondition from './formLabelWithCondition';
import { AiFillEdit } from 'react-icons/ai';
import SubmitButtonGroup from './submitButtonGroup';
import DeleteProjectDialog from './deleteProjectDialog';
import { User } from '@/src/interface/user';
import { findUserByCondition } from '@/src/service/findUserByCondition';
import updateProject from '@/src/service/project/updateProject';
import leaveProjectByStudentId from '@/src/service/user-proj/leaveProjectByStudentId';

const mockCurrentUser = {
  id: 'd1c0d106-1a4a-4729-9033-1b2b2d52e98a',
  name: 'นภันต์ โชติช่วงนภา',
  username: 's',
  studentId: '6432083021',
  createdAt: 's',
  password: 's',
  updatedAt: 's',
};

export default function ProjectForm({
  formAction,
  project,
  joinUsers,
  isAdmin,
}: {
  formAction: projectFormAction;
  project?: Project | null;
  joinUsers?: User[];
  isAdmin: boolean;
}) {
  const { toast } = useToast();
  const router = useRouter();

  const [action, setAction] = useState<projectFormAction>(formAction);
  const [studentIdsInitialMembers, setStudentIdsInitialMembers] = useState<
    string[]
  >([]);
  const [membersCount, setMembersCount] = useState(1);
  const [isAfterCancelUpdate, setIsAfterCancelUpdate] = useState(false);

  const initialMembers = useMemo(() => joinUsers || [], [joinUsers]);
  const ownerUser = useMemo(() => {
    return joinUsers?.find((user) => user.id === project?.ownerId) || null;
  }, [joinUsers, project?.ownerId]);
  const canEdit = useMemo(() => {
    if (
      (action === projectFormAction.INFO &&
        mockCurrentUser.id === project?.ownerId) ||
      isAdmin
    ) {
      return true;
    }
    return false;
  }, [action, isAdmin, project?.ownerId]);

  const form = useForm<z.infer<typeof newProjectFormSchema>>({
    resolver: zodResolver(newProjectFormSchema),
    defaultValues: {
      projectName: project?.name,
      type: project?.type,
      description: project?.detail || '',
      members:
        action === projectFormAction.USER_CREATE
          ? [mockCurrentUser.studentId]
          : action === projectFormAction.INFO
            ? [ownerUser?.studentId]
            : [],
      //TODO : USER CREATE USE OWN STUDENT NUMBER
      //TODO : INTEGRATE WITH GET JOIN USER FROM PROJECT
    },
    mode: 'onChange',
  });

  useEffect(() => {
    const mapOldMembersToForm = () => {
      if (action === projectFormAction.INFO) {
        const initialMember = [ownerUser?.studentId || ''];
        const otherMembers = initialMembers.reduce((result, user) => {
          if (user.id !== ownerUser?.id) {
            result.push(user.studentId);
          }
          return result;
        }, [] as string[]);

        initialMember.push(...otherMembers);
        setStudentIdsInitialMembers(initialMember);
        form.setValue('members', initialMember, { shouldDirty: false });
        setMembersCount(initialMember.length);
      }
    };
    form.reset();
    mapOldMembersToForm();
  }, [isAfterCancelUpdate]);

  useEffect(() => {
    const handleFormAction = () => {
      switch (action) {
        case projectFormAction.CANCEL_UPDATE:
          setIsAfterCancelUpdate(!isAfterCancelUpdate);
          setAction(projectFormAction.INFO);
          break;

        default:
          return;
      }
    };

    handleFormAction();
  }, [action]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const index = parseInt(e.target.name.split('.')[1]);
    form.setValue(`members.${index}`, e.target.value, { shouldDirty: true });
    form.trigger(`members`);
    if (e.target.value) {
      setMembersCount(Math.max(membersCount, index + 1));
    }
  }

  function handleDelete(e: React.MouseEvent<HTMLButtonElement>, index: number) {
    e.preventDefault();
    form.resetField(`members.${index}`);
  }

  async function onSubmitUpdate(
    values: z.infer<typeof newProjectFormSchema>,
  ): Promise<{
    membersToAdd: (string | undefined)[];
    membersToLeave: (string | undefined)[];
  }> {
    const currentMembers = values.members;

    const membersToAdd = currentMembers.filter(
      (member) => !studentIdsInitialMembers.includes(String(member)),
    );
    const membersToLeave = studentIdsInitialMembers.filter(
      (member) => !currentMembers.includes(member),
    );

    await updateProject({
      projectId: project?.id || '',
      name: values.projectName,
      detail: values.description,
      type: values.type as ProjectType,
    })
      .catch((err) => {
        toast({
          title: `ไม่สามารถอัพเดทโครง ${project?.projectCode} ${project?.name} ได้`,
          description: err.message,
          isError: true,
          duration: 5000,
        });
      })
      .then(() => {
        toast({
          title: 'อัพเดทโครงการสำเร็จ',
          description: `อัพเดทโครงการ ${project?.projectCode} ${project?.name} เรียบร้อยแล้ว`,
          duration: 2000,
        });
      });

    return { membersToAdd, membersToLeave };
  }

  async function onSubmitCreate(
    values: z.infer<typeof newProjectFormSchema>,
  ): Promise<Project> {
    const getOwnerId = async () => {
      if (action === projectFormAction.USER_CREATE) {
        // TODO use real current user
        return mockCurrentUser.id;
      } else {
        const ownerStudentId =
          values.members.find((member) => member !== undefined) || '';

        return await findUserByCondition({ studentId: ownerStudentId }).then(
          (user) => user?.id || '',
        );
      }
    };

    const newProject = await createProject(
      values.projectName,
      values.type as ProjectType,
      await getOwnerId(),
      values.description,
    );

    return newProject;
  }

  async function onSubmit(values: z.infer<typeof newProjectFormSchema>) {
    let projCreated = false;
    var projectToJoin: Project | null = null;
    var userToAdd: (string | undefined)[] = values.members;
    var userToLeave: (string | undefined)[] = [];
    try {
      if (
        action === projectFormAction.USER_CREATE ||
        action === projectFormAction.ADMIN_CREATE
      ) {
        const newProject = await onSubmitCreate(values);
        projectToJoin = newProject as Project;
        projCreated = true;
        toast({
          title: 'เปิดโครงการสำเร็จ',
          description: `เปิดโครงการ ${newProject.projectCode} ${newProject.name} เรียบร้อยแล้ว`,
          duration: 2000,
        });
      } else if (action === projectFormAction.UPDATE) {
        const userAddAndLeave = await onSubmitUpdate(values);
        userToAdd = userAddAndLeave.membersToAdd;
        userToLeave = userAddAndLeave.membersToLeave;
        projectToJoin = project as Project;
      }

      let addStudentIdsNotFound: string[] = [];

      const addUserProjPromises = userToAdd.map((studentId) =>
        studentId
          ? joinProjectByStudentId(studentId, projectToJoin?.id || '').catch(
              () => {
                addStudentIdsNotFound.push(studentId);
              },
            )
          : undefined,
      );

      if (action === projectFormAction.UPDATE) {
        const removeUserProjPromises = userToLeave.map((studentId) =>
          studentId
            ? leaveProjectByStudentId(studentId, projectToJoin?.id || '')
            : undefined,
        );

        await Promise.all(removeUserProjPromises);
      }

      await Promise.all(addUserProjPromises);

      if (addStudentIdsNotFound.length > 0) {
        toast({
          title: `ไม่สามารถเพิ่มนิสิตเข้า ${projectToJoin?.projectCode} ${projectToJoin?.name} ได้`,
          description: `ไม่สามารถเพิ่มนิสิตรหัส ${addStudentIdsNotFound.join(', ')} เข้า ${projectToJoin?.projectCode} ${projectToJoin?.name}`,
          isError: true,
          duration: 5000,
        });
      }

      switch (action) {
        case projectFormAction.USER_CREATE:
          router.push(`/project/${projectToJoin?.id}`);
          break;
        case projectFormAction.ADMIN_CREATE:
          window.location.replace(`/admin/project/${projectToJoin?.id}`);
          break;
        case projectFormAction.UPDATE:
          window.location.reload();
          break;
        default:
          break;
      }
    } catch (err) {
      if (err instanceof Error) {
        if (projCreated) {
          toast({
            title: 'เปิดโครงการสำเร็จ แต่ไม่สามารถเพิ่มนิสิตเข้าโครงการได้',
            description: err.message,
            isError: true,
          });
        } else {
          if (
            action === projectFormAction.ADMIN_CREATE ||
            action === projectFormAction.USER_CREATE
          ) {
            toast({
              title: 'เปิดโครงการไม่สำเร็จ',
              description: err.message,
              isError: true,
            });
          } else {
            toast({
              title: 'อัพเดทโครงการไม่สำเร็จ',
              description: err.message,
              isError: true,
            });
          }
        }
      }
    }

    return;
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col max-w-3xl text-sm"
        >
          <div className="space-y-6 bg-lightgray px-6 py-5 rounded-lg ">
            <div className="flex flex-row justify-between">
              <div className="space-y-6 w-[50%]">
                <FormField
                  control={form.control}
                  name="projectName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabelWithCondition
                        label="ชื่อโครงการ"
                        action={action}
                      />
                      <FormControl>
                        <Input
                          placeholder="ใส่ชื่อโครงการ"
                          {...field}
                          disabled={action === projectFormAction.INFO}
                          className="disabled:bg-white disabled:opacity-100 disabled:cursor-default text-black text-sm border-black"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabelWithCondition
                        label="ประเภทโครงการ"
                        action={action}
                      />
                      <Select
                        onValueChange={field.onChange}
                        {...field}
                        disabled={action === projectFormAction.INFO}
                      >
                        <FormControl>
                          <SelectTrigger
                            className="text-sm border-black"
                            disabled={action === projectFormAction.INFO}
                          >
                            <SelectValue placeholder="ฝ่ายวิชาการ, ฝ่ายกิจกรรมภายในคณะ, ฝ่ายเทคโนโลยี" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent {...field}>
                          <SelectGroup>
                            {projectTypeMap.map((item, index) => (
                              <SelectItem key={index} value={item.value}>
                                {item.value + ' - ' + item.label}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {action === projectFormAction.INFO ||
              action === projectFormAction.UPDATE ? (
                <div className="font-sukhumvit font-bold">
                  <div className="text-center">รหัสโครงการ</div>
                  <div className="text-center text-4xl">
                    {project?.projectCode || 'ไม่มีรหัสโครงการ'}
                  </div>
                </div>
              ) : null}
            </div>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">
                    รายละเอียด (optional)
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="รายละเอียดเพิ่มเติม"
                      disabled={action === projectFormAction.INFO}
                      {...field}
                      className="disabled:bg-white disabled:opacity-100 disabled:cursor-default text-black text-sm border-black"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-row justify-between">
              <div className="space-y-3 font-bold text-sm">
                ผู้ร่วมโครงการ
                <ol className="list-decimal pl-5 py-2 space-y-3 font-extrabold w-[30vw] ">
                  {/* TODO: change to current user's student ID */}
                  {action === projectFormAction.USER_CREATE ? (
                    <li>
                      <div className="flex text-sm text-black justify-between w-[85%]">
                        <span>{mockCurrentUser.name}</span>
                        <span>
                          รหัสนิสิต&emsp;{form.getValues().members[0]}
                        </span>
                      </div>
                    </li>
                  ) : action === projectFormAction.INFO ||
                    action === projectFormAction.UPDATE ? (
                    <li>
                      <div className="flex text-sm text-black justify-between w-[85%]">
                        <span>{ownerUser?.username}</span>
                        <span>รหัสนิสิต&emsp;{ownerUser?.studentId}</span>
                      </div>
                    </li>
                  ) : null}
                  {[...Array(membersCount)].map((_, index) =>
                    index === membersCount - 1 ||
                    form.getValues().members[index + 1] ? (
                      <MembersInput
                        control={form.control}
                        handleChange={handleChange}
                        key={index}
                        index={index + 1}
                        handleDelete={
                          index === membersCount - 1 ? undefined : handleDelete
                        }
                        memberBeforeUpdated={initialMembers}
                        member={String(form.getValues().members[index + 1])}
                        formAction={action}
                      />
                    ) : undefined,
                  )}
                </ol>
              </div>
              {action === projectFormAction.INFO && canEdit ? (
                <div className="text-end flex items-end space-x-4">
                  <div
                    className="p-2 rounded-full bg-white flex items-center justify-center hover:cursor-pointer hover:scale-105 duration-75"
                    onClick={() => {
                      setAction(projectFormAction.UPDATE);
                    }}
                  >
                    <AiFillEdit size={20} className="text-red" />
                  </div>
                  <DeleteProjectDialog projectId={project?.id || ''} />
                </div>
              ) : null}
            </div>
          </div>
          <SubmitButtonGroup
            formAction={action}
            form={form}
            changeFormActionToParent={(
              actionChangeFromChild: projectFormAction,
            ) => {
              setAction(actionChangeFromChild);
            }}
          />
        </form>
      </Form>
    </>
  );
}
