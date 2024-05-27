import { z } from "zod"

export const newProjectFormSchema = z.object({
  username: z.string().min(2).max(50),
})
