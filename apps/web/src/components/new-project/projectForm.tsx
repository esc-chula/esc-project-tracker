'use client';
import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { z } from 'zod';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { AiFillEdit } from 'react-icons/ai';
import { projectFormAction, type ProjectType } from '@repo/shared';
import { newProjectFormSchema } from '@/src/constant/schema';
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
import { projectTypeMap } from '@/src/constant/map';
import createProject from '@/src/service/project/createProject';
import { getUserId } from '@/src/service/auth';
import { findUserByUserId } from '@/src/service/user/findUserByUserId';
import leaveProjectByStudentId from '@/src/service/user-proj/leaveProjectByStudentId';
import { findUserByCondition } from '@/src/service/user/findUserByCondition';
import updateProject from '@/src/service/project/updateProject';
import type { User } from '@/src/interface/user';
import joinProjectByStudentId from '@/src/service/user-proj/joinProjectByStudentId';
import type { Project } from '@/src/interface/project';
import { Textarea } from '../ui/textarea';
import { toast } from '../ui/use-toast';
import MembersInput from './membersInput';
import FormLabelWithCondition from './formLabelWithCondition';
import SubmitButtonGroup from './submitButtonGroup';
import DeleteProjectDialog from './deleteProjectDialog';

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
  const router = useRouter();

  const [action, setAction] = useState<projectFormAction>(formAction);
  const [studentIdsInitialMembers, setStudentIdsInitialMembers] = useState<
    string[]
  >([]);
  const [isAfterCancelUpdate, setIsAfterCancelUpdate] = useState(false);

  const [user, setUser] = useState<User | null>();

  useEffect(() => {
    const fetchUser = async () => {
      const userId = await getUserId();
      const userData = await findUserByUserId(userId);
      setUser(userData);
      if (
        action === projectFormAction.USER_CREATE ||
        action === projectFormAction.ADMIN_CREATE
      )
        replace([userData?.studentId, undefined]);
    };
    void fetchUser();
  }, []);

  const initialMembers = useMemo(() => joinUsers || [], [joinUsers]);
  const ownerUser = useMemo(
    () =>
      joinUsers?.find((joinedUser) => joinedUser.id === project?.ownerId) ||
      null,
    [joinUsers, project?.ownerId],
  );
  const canEdit = useMemo(
    () =>
      (action === projectFormAction.INFO && user?.id === project?.ownerId) ||
      isAdmin,
    [action, isAdmin, project?.ownerId, user?.id],
  );

  const form = useForm<z.infer<typeof newProjectFormSchema>>({
    resolver: zodResolver(newProjectFormSchema),
    defaultValues: {
      projectName: project?.name,
      type: project?.type,
      description: project?.detail || '',
      members: action === projectFormAction.INFO ? [ownerUser?.studentId] : [],
    },
    mode: 'onChange',
  });

  const { fields, remove, replace, append } = useFieldArray({
    name: 'members' as never,
    control: form.control,
  });

  useEffect(() => {
    if (action !== projectFormAction.INFO) return;

    form.reset();
    const initialMember = [ownerUser?.studentId || ''];
    const otherMembers = initialMembers.reduce((result: string[], member) => {
      if (member.id !== ownerUser?.id) result.push(member.studentId);
      return result;
    }, []);
    initialMember.push(...otherMembers);
    setStudentIdsInitialMembers(initialMember);
    replace(initialMember);
    void form.trigger('members');
  }, [isAfterCancelUpdate]);

  useEffect(() => {
    const handleFormAction = () => {
      switch (action) {
        case projectFormAction.CANCEL_UPDATE:
          setIsAfterCancelUpdate(!isAfterCancelUpdate);
          setAction(projectFormAction.INFO);
          break;
        default:
          break;
      }
    };

    handleFormAction();
  }, [action]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const index = parseInt(e.target.name.split('.')[1]);
    void form.trigger('members');

    if (e.target.value && index + 1 === fields.length) append(undefined);
  }

  function handleDelete(e: React.MouseEvent<HTMLButtonElement>, index: number) {
    remove(index);
    append(undefined);
    void form.trigger('members');
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
        if (err instanceof Error)
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

  async function onSubmitCreate(values: z.infer<typeof newProjectFormSchema>) {
    const getOwnerId = async () => {
      if (action === projectFormAction.USER_CREATE) return user?.id;

      const ownerStudentId =
        values.members.find((member) => member !== undefined) || '';
      const foundUser = await findUserByCondition({
        studentId: ownerStudentId,
      });
      return foundUser?.id ?? '';
    };

    const ownerId = await getOwnerId();
    if (!ownerId) throw new Error('ไม่พบเจ้าของโครงการ');

    const newProject = await createProject(
      values.projectName,
      values.type as ProjectType,
      ownerId,
      values.description,
    );

    return newProject;
  }

  async function onSubmit(values: z.infer<typeof newProjectFormSchema>) {
    let projCreated = false;
    let projectToJoin: Project | null = null;
    let userToAdd: (string | undefined)[] = values.members;
    let userToLeave: (string | undefined)[] = [];
    try {
      if (
        action === projectFormAction.USER_CREATE ||
        action === projectFormAction.ADMIN_CREATE
      ) {
        const newProject = await onSubmitCreate(values);
        projectToJoin = newProject;
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
        projectToJoin = project ? project : null;
      }

      const addStudentIdsNotFound: string[] = [];

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
          toast({
            title: `${
              action === projectFormAction.ADMIN_CREATE ||
              action === projectFormAction.USER_CREATE
                ? 'เปิด'
                : 'อัพเดท'
            }โครงการไม่สำเร็จ`,
            description: err.message,
            isError: true,
          });
        }
      }
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col max-w-2xl text-sm"
      >
        <div className="space-y-6 bg-lightgray px-6 py-5 rounded-lg ">
          <div className="flex flex-row justify-between">
            <div className="space-y-6 w-full">
              <FormField
                control={form.control}
                name="projectName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabelWithCondition
                      label="ชื่อโครงการ (TH)"
                      action={action}
                    />
                    <FormControl>
                      <Input
                        placeholder="ชื่อโครงการภาษาไทย"
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
                          <SelectValue placeholder="เลือกฝ่าย" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent {...field}>
                        <SelectGroup>
                          {projectTypeMap.map((item, _) => (
                            <SelectItem key={item.value} value={item.value}>
                              {item.label}
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
              <div className="font-sukhumvit font-bold ml-6">
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
                    className="disabled:bg-white disabled:opacity-100 disabled:cursor-default text-black text-sm border-black min-h-32"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-row justify-between gap-3">
            <div className="flex flex-col space-y-3 font-bold text-sm">
              ผู้ร่วมโครงการ
              <ol className="list-decimal pl-5 py-3 space-y-4 font-extrabold">
                {action === projectFormAction.USER_CREATE ||
                action === projectFormAction.ADMIN_CREATE ? (
                  <li>
                    <div className="flex text-sm text-black gap-6">
                      <span>{user?.username}</span>
                    </div>
                  </li>
                ) : action === projectFormAction.INFO ||
                  action === projectFormAction.UPDATE ? (
                  <li>
                    <div className="flex text-sm text-black gap-6 w-full justify-between">
                      <span>{ownerUser?.username}</span>
                    </div>
                  </li>
                ) : null}
                {fields.map((field, index) =>
                  index > 0 ? (
                    <MembersInput
                      control={form.control}
                      handleChange={handleChange}
                      key={field.id}
                      index={index}
                      handleDelete={
                        index + 1 === fields.length ? undefined : handleDelete
                      }
                      memberBeforeUpdated={initialMembers}
                      member={String(form.getValues().members[index])}
                      formAction={action}
                    />
                  ) : undefined,
                )}
              </ol>
            </div>
            {action === projectFormAction.INFO && canEdit ? (
              <div className="text-end flex items-end space-x-4">
                <button
                  type="button"
                  className="p-2 rounded-full bg-white flex items-center justify-center hover:cursor-pointer hover:scale-105 duration-75"
                  onClick={() => {
                    setAction(projectFormAction.UPDATE);
                    append(undefined);
                  }}
                >
                  <AiFillEdit size={20} className="text-red" />
                </button>
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
  );
}
