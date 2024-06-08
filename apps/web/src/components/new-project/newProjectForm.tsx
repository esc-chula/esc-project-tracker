"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { newProjectFormSchema } from "@/src/constant/schema"
import { z } from "zod"
import { Button } from "@/src/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form"
import { Input } from "@/src/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select"

import { Textarea } from "../ui/textarea"
import MembersInput from "./membersInput"
import { useMemo, useState } from "react"
import { FilePlus } from "lucide-react"
import { projectTypeMap } from "@/src/constant/Map"
import createProject from "@/src/service/createProject"
import { ProjectType } from "@/src/constant/enum"
import joinProject from "@/src/service/joinProject"
import { useToast } from "../ui/use-toast"
import { useRouter } from "next/navigation"

export default function NewProjectForm() {
  const form = useForm<z.infer<typeof newProjectFormSchema>>({
    resolver: zodResolver(newProjectFormSchema),
    defaultValues: {
      members: ["6432083021"], // TODO: change to current user's student ID
    },
  })
  const { toast } = useToast()
  const router = useRouter()

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const index = parseInt(e.target.name.split(".")[1])
    form.setValue(`members.${index}`, e.target.value)
    form.trigger(`members.${index}`)
    if (e.target.value) {
      setMembersCount(Math.max(membersCount, index + 1))
    }
  }

  function handleDelete(e: React.MouseEvent<HTMLButtonElement>, index: number) {
    e.preventDefault()
    form.resetField(`members.${index}`)
  }

  async function onSubmit(values: z.infer<typeof newProjectFormSchema>) {
    let projCreated = false

    try {
      const newProject = await createProject(
        values.projectName,
        values.type as ProjectType,
        values.description
      )

      projCreated = true

      const userProjPromises = values.members.map((member) =>
        member ? joinProject(member, newProject.id) : undefined
      )

      await Promise.all(userProjPromises)

      toast({
        title: "สร้างโครงการสำเร็จ",
        description: `โครงการ ${newProject.projectCode} ${newProject.name} ถูกสร้างเรียบร้อยแล้ว`,
      })

      router.push(`/project/${newProject.id}`)
    } catch (err) {
      if (err instanceof Error) {
        if (projCreated) {
          toast({
            title: "เปิดโครงการสำเร็จ แต่ไม่สามารถเพิ่มผู้ใช้เข้าโครงการได้",
            description: err.message,
            isError: true,
          })
        } else {
          toast({
            title: "เปิดโครงการไม่สำเร็จ",
            description: err.message,
            isError: true,
          })
        }
      }
    }
  }

  const [membersCount, setMembersCount] = useState(1)
  const isDisabled = useMemo(
    () => form.formState.isSubmitting || !form.formState.isValid,
    [form.formState.isSubmitting, form.formState.isValid]
  )

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col max-w-3xl">
          <div className="space-y-6 bg-lightgray px-6 py-5 rounded-lg">
            <FormField
              control={form.control}
              name="projectName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold text-lg">
                    ชื่อโครงการ<span className="text-red">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="ใส่ชื่อโครงการ" {...field} />
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
                  <FormLabel className="font-bold text-lg">
                    ประเภทโครงการ<span className="text-red">*</span>
                  </FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="ฝ่ายวิชาการ, ฝ่ายกิจกรรมภายในคณะ, ฝ่ายเทคโนโลยี" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        {projectTypeMap.map((item, index) => (
                          <SelectItem key={index} value={item.value}>
                            {item.value + " - " + item.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold text-lg">รายละเอียด (optional)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="รายละเอียดเพิ่มเติม" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="space-y-3 font-bold text-lg">
              ผู้ร่วมโครงการ
              <ol className="list-decimal pl-5 py-2 space-y-3 font-semibold">
                {/* TODO: change to current user's student ID */}
                <li>นภันต์ โชติช่วงนภา&emsp;รหัสนิสิต {form.getValues().members[0]}</li>
                {[...Array(membersCount)].map((_, index) =>
                  index === membersCount - 1 || form.getValues().members[index + 1] ? (
                    <MembersInput
                      control={form.control}
                      handleChange={handleChange}
                      key={index}
                      index={index + 1}
                      handleDelete={index === membersCount - 1 ? undefined : handleDelete}
                    />
                  ) : undefined
                )}
              </ol>
            </div>
          </div>
          <Button
            type="submit"
            className="my-8 mx-auto rounded-lg text-2xl px-6 h-12 bg-red font-bold"
            disabled={isDisabled}>
            <FilePlus className="h-8 w-8 mr-3" />
            เปิดโครงการ
          </Button>
        </form>
      </Form>
    </>
  )
}
