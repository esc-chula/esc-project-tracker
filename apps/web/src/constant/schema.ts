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
    .regex(
      /^\d{2}[013478]\d{5}(?:01|02|20|21|22|23|24|25|26|27|28|29|30|31|32|33|34|35|36|37|38|39|40|51|53|55|56|58|63|92|99)$/gm,
      { message: "รหัสนิสิตไม่ถูกต้อง" }
    )
    .optional()
    .array()
    .superRefine((items, ctx) => {
      const uniqueValues = new Map<string | undefined, number>()
      items.forEach((item, idx) => {
        const firstAppearanceIndex = uniqueValues.get(item)
        if (firstAppearanceIndex !== undefined) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `รหัสนิสิตซ้ำกัน`,
            path: [idx],
          })
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `รหัสนิสิตซ้ำกัน`,
            path: [firstAppearanceIndex],
          })
          return
        }
        if (item) uniqueValues.set(item, idx)
      })
    }),
})
