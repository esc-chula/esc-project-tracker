import { z } from "zod"
import { filterProjectType } from "../styles/enumMap"

const projectTypes = filterProjectType.map((item) => item.value)

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
