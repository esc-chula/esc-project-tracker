import { zodResolver } from "@hookform/resolvers/zod";
import { Form, useForm } from "react-hook-form";
import { z } from "zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { projectTypeMap } from "@/src/constant/Map";
import { Input, Button } from "@mui/material";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@radix-ui/react-select";
import { FilePlus } from "lucide-react";

export default function CreateDocument() {
  const createdFormSchema = z.object({
    detail: z.string().min(1, { message: "กรุณากรอกรายละเอียด" }),
    note: z.string().optional(),
  });

  const form = useForm<z.infer<typeof createdFormSchema>>({
    resolver: zodResolver(createdFormSchema),
    defaultValues: {
      detail: "",
      note: "",
    },
  });

  const onSubmit = form.handleSubmit(
    (data: z.infer<typeof createdFormSchema>) => {
      console.log(data);
    }
  );

  return (
    <>
      <Form {...form}>
        <div className="flex">
          <div className="flex flex-row">
            <div>
              <FormField
                control={form.control}
                name="detail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-lg">
                      กิจกรรม<span className="text-red">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="ใส่ชื่อโครงการ" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>รายละเอียก</div>
          </div>
        </div>
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
