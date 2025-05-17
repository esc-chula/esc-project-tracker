'use client';
import { HiDocumentAdd } from 'react-icons/hi';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { z } from 'zod';
import type { FilingSubType } from '@repo/shared';
import createFiling from '@/src/service/filing/createFiling';
import type { Filing } from '@/src/interface/filing';
import { getUserId } from '@/src/service/auth';
import { typeFilingItemsV2 } from '@/src/constant/filterFiling';
import { addFilingFormSchema } from '@/src/constant/schema';
import { toast } from '../ui/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from "../ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "../ui/select";
import { findUserByUserId } from "@/src/service/user/findUserByUserId";
import getProjectsByUserId from "@/src/service/project/getProjectsByUserId";
import type { Project } from "@/src/interface/project";
import { Button } from "../ui/button";
import { User } from '@/src/interface/user';

export default function PopoverAddFiling({
  children,
  projectId,
  addFilingToParent,
}: {
  children?: React.ReactNode;
  projectId: string;
  addFilingToParent: (filing: Filing) => void;
}) {
  const [joinedProjects, setJoinedProjects] = useState<Project[]>([])
  const [userId, setUserId] = useState<string>("")
  const [user, setUser] = useState<User | null>(null)
  const [open, setOpen] = useState<boolean>(false)

  const form = useForm<z.infer<typeof addFilingFormSchema>>({
    resolver: zodResolver(addFilingFormSchema),
    defaultValues: {
      projectId: projectId || "",
      filingTypeAndSubType: "",
      filingName: "",
      responsibleStudent: "",
      tel: ""
    },
    mode: "onChange"
  })

  const fetchUser = async () => {
    const id = await getUserId()
    const userData = await findUserByUserId(id)
    setUserId(id)
    setUser(userData)
    if (userData) {
      form.setValue("responsibleStudent", userData.username)
      form.setValue("tel", userData.tel ?? "")
    }
    return id
  }

  const fetchProject = async (id: string) => {
    const allJoinedProject = await getProjectsByUserId(id)
    const projects = allJoinedProject.map((project) => project.project)
    setJoinedProjects(projects)
    return projects
  }

  const openAddFilingPopOver = async () => {
    setOpen(!open)
    if (!open) {
      form.reset({
        projectId: projectId || "",
        filingTypeAndSubType: "",
        filingName: "",
        responsibleStudent: form.getValues("responsibleStudent"),
        tel: form.getValues("tel")
      })
    }
    
    if (joinedProjects.length === 0) {
      const data = await fetchUser()
      const projects = await fetchProject(data)

      if (projectId !== "") {
        const foundProject = projects.find((project) => project.id === projectId)
        if (foundProject) {
          form.setValue("projectId", foundProject.id)
        }
      }
    }
  }

  const onSubmit = async (values: z.infer<typeof addFilingFormSchema>) => {
    try {
      const [filingType, filingSubType] = values.filingTypeAndSubType.split("-")
      const data = await createFiling(
        values.projectId,
        values.filingName.trim(),
        parseInt(filingType),
        userId,
        filingSubType ? (filingSubType as FilingSubType) : null,
        // tel,
      );

      const newFiling = {
        ...data,
        ...(user && { user }),
      };

      addFilingToParent(newFiling);
      toast({
        title: "สร้างสำเร็จ",
        description: `เอกสาร ${data.projectCode} - ${data.filingCode} ถูกสร้างเรียบร้อยแล้ว`,
      })
      setOpen(false)
      form.reset({
        projectId: projectId,
        filingTypeAndSubType: "",
        filingName: "",
        responsibleStudent: form.getValues("responsibleStudent"),
        tel: form.getValues("tel")
      })
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: "ไม่สำเร็จ",
          description: error.message,
          isError: true,
        })
      }
    }
  }

  return (
    <Dialog open={open} onOpenChange={openAddFilingPopOver}>
      <DialogTrigger asChild>
        {children ? (
          children
        ) : (
          <Button variant="outline" className="hover:cursor-pointer rounded-lg px-4 py-2 bg-red text-white">
            <HiDocumentAdd size={20} className="inline-block mr-2" />
            สร้างเอกสารใหม่
          </Button>
        )}
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>สร้างเอกสารใหม่</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="bg-white rounded-lg pt-2 space-y-4">
            <FormField
              control={form.control}
              name="projectId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    ชื่อโครงการ (TH)
                    <span className="text-red">*</span>
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full border-1 border-black rounded-lg px-4">
                        <SelectValue placeholder="เลือกโครงการ" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {joinedProjects.length > 0 ? (
                        joinedProjects.map((project) => (
                          <SelectItem key={project.id} value={project.id}>
                            {project.name}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="none" disabled>
                          ไม่พบโครงการ
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="filingTypeAndSubType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    ประเภทเอกสาร
                    <span className="text-red">*</span>
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full border-1 border-black rounded-lg px-4">
                        <SelectValue placeholder="เลือกประเภทเอกสาร" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {typeFilingItemsV2.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="filingName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    ชื่อเอกสาร
                    <span className="text-red">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="ใส่ชื่อเอกสาร"
                      className="border-1 w-full px-4 rounded-lg border-black"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="responsibleStudent"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    นิสิตที่รับผิดชอบ
                    <span className="text-red">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="สมชาย สายชล"
                      className="border-1 w-full px-4 rounded-lg border-black"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    เบอร์โทรศัพท์
                    <span className="text-red">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="เบอร์โทรศัพท์ 0xx-xxx-xxxx"
                      className="border-1 w-full px-4 rounded-lg border-black"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-row justify-end gap-2 py-2">
              <Button
                type="button"
                className="text-base text-gray-500 border-gray-500 border-1 bg-transparent px-4 h-10 hover:bg-slate-200 rounded-lg transition duration-300"
                onClick={() => {setOpen(false)}}
              >
                ยกเลิก
              </Button>
              <Button
                type="submit"
                className="rounded-lg text-base px-4 h-10 font-medium bg-red text-white"
              >
                <HiDocumentAdd size={20} className="inline-block mr-2" />
                สร้างเอกสาร
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}