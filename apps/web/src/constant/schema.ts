import { z } from "zod"
import { filterProjectType } from "../styles/enumMap"

const projectTypes = filterProjectType.map((item) => item.value)
console.log([projectTypes[0], ...projectTypes])

export const newProjectFormSchema = z.object({
  name: z.string().trim().min(1, {
    message: "โปรดกรอกชื่อโครงการ",
  }),
  description: z.string().optional(),
  type: z.enum([projectTypes[0], ...projectTypes] as const, {
    message: "ประเภทโครงการไม่ถูกต้อง",
  }),
})
