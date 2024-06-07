import { z } from "zod"
import { projectTypeMap } from "./Map"

const projectTypes = projectTypeMap.map((item) => item.value.toString())

export const newProjectFormSchema = z.object({
  projectName: z
    .string({
      message: "โปรดกรอกชื่อโครงการ",
    })
    .trim()
    .min(1, {
      message: "โปรดกรอกชื่อโครงการ",
    }),
  description: z.string().optional(),
  type: z.enum([projectTypes[0], ...projectTypes] as const, {
    message: "โปรดเลือกประเภทโครงการ",
  }),
  members: z
    .string()
    .regex(/^$|^\d{2}3\d{5}21$/, { message: "รหัสนิสิตไม่ถูกต้อง" })
    .optional()
    .array(),
})
