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
import { filterProjectType } from "@/src/styles/enumMap"
import { Textarea } from "../ui/textarea"

export default function NewProjectForm() {
  const form = useForm<z.infer<typeof newProjectFormSchema>>({
    resolver: zodResolver(newProjectFormSchema),
    defaultValues: {
      name: "",
    },
  })

  function onSubmit(values: z.infer<typeof newProjectFormSchema>) {
    console.log(values)
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
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
                <FormLabel>
                  ประเภทโครงการ<span className="text-red">*</span>
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="ฝ่ายวิชาการ, ฝ่ายกิจกรรมภายในคณะ, ฝ่ายสนับสนุน" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      {filterProjectType.map((item) => {
                        if (item.value !== "0")
                          return (
                            <SelectItem key={item.value} value={item.value}>
                              {item.value + "-" + item.label}
                            </SelectItem>
                          )
                      })}
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
                <FormLabel>รายละเอียด (optional)</FormLabel>
                <FormControl>
                  <Textarea placeholder="รายละเอียดเพิ่มเติม" className="resize-none" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </>
  )
}
