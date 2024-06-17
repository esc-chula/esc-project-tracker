"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { projectTypeMap } from "@/src/constant/Map";

export default function CreateDocument() {
  const createdFormSchema = z.object({
    activity: z.string().min(1, { message: "Please select an activity." }),
    detail: z.string().min(1, { message: "กรุณากรอกรายละเอียด" }),
    note: z.string().optional(),
  });

  const form = useForm<z.infer<typeof createdFormSchema>>({
    resolver: zodResolver(createdFormSchema),
    defaultValues: {
      activity: "",
      detail: "",
      note: "",
    },
  });

  function onSubmit(values: z.infer<typeof createdFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex">
            <div className="flex flex-row">
              <div>
                <FormField
                  control={form.control}
                  name="activity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold text-lg block">
                        กิจกรรม<span className="text-red">*</span>
                      </FormLabel>
                      <FormControl>
                        <input
                          placeholder="ใส่ชื่อโครงการ"
                          {...field}
                          className="border-2 border-black rounded-xl p-2"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="detail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold text-lg block">
                        {"รายละเอียดเอกสาร (ชื่อเรื่องที่ระบุในเอกสาร)"}
                        <span className="text-red">*</span>
                      </FormLabel>
                      <FormControl>
                        <input
                          placeholder="ใส่หัวข้อเอกสาร"
                          {...field}
                          className="border-2 border-black rounded-xl p-2"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
}
/*

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
                  <FormLabel className="font-bold text-lg">
                    รายละเอียด (optional)
                  </FormLabel>
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
                {/* TODO: change to current user's student ID }
                <li>
                  นภันต์ โชติช่วงนภา&emsp;รหัสนิสิต{" "}
                  {form.getValues().members[0]}
                </li>
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
                    />
                  ) : undefined
                )}
              </ol>
            </div>
          </div>
          <Button
            type="submit"
            className="my-8 mx-auto rounded-lg text-2xl px-6 h-12 bg-red font-bold"
            disabled={isDisabled}
          >
            <FilePlus className="h-8 w-8 mr-3" />
            เปิดโครงการ
          </Button>*/
