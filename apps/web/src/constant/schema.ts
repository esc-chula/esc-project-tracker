import { z } from 'zod';
import { projectTypeMap } from './Map';
import { getFileType } from '../lib/utils';
import { DocumentActivity } from './enum';

const projectTypes = projectTypeMap.map((item) => item.value.toString());

export const newProjectFormSchema = z.object({
  projectName: z
    .string({
      message: 'โปรดกรอกชื่อโครงการ',
    })
    .trim()
    .min(1, {
      message: 'โปรดกรอกชื่อโครงการ',
    }),
  description: z.string().optional(),
  type: z.enum([projectTypes[0], ...projectTypes] as const, {
    message: 'โปรดเลือกประเภทโครงการ',
  }),
  members: z
    .array(
      z
        .string()
        .regex(
          /^\d{2}[013478]\d{5}(?:01|02|20|21|22|23|24|25|26|27|28|29|30|31|32|33|34|35|36|37|38|39|40|51|53|55|56|58|63|92|99)$/gm,
          { message: 'รหัสนิสิตไม่ถูกต้อง' },
        )
        .optional(),
    )
    .refine(
      (items) =>
        items.some((item) => item !== undefined && item.trim().length > 0),
      {
        message: 'ต้องมีรหัสนิสิตที่ถูกต้องอย่างน้อยหนึ่งรหัส',
      },
    )
    .superRefine((items, ctx) => {
      const uniqueValues = new Map<string | undefined, number>();
      items.forEach((item, idx) => {
        const firstAppearanceIndex = uniqueValues.get(item);
        if (firstAppearanceIndex !== undefined) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `รหัสนิสิตซ้ำกัน`,
            path: [idx],
          });
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `รหัสนิสิตซ้ำกัน`,
            path: [firstAppearanceIndex],
          });
          return;
        }
        if (item) uniqueValues.set(item, idx);
      });
    }),
});

const MAX_UPLOAD_SIZE = 1024 * 1024 * 10; // 10MB

export const zodDocumentAdminFile = (
  typeof window === 'undefined' ? z.any() : z.instanceof(FileList)
)
  .refine(
    (file: FileList) =>
      file.length === 0 ||
      (file.length === 1 && getFileType(file[0]) === 'pdf'),
    'เลือกได้แค่ไฟล์ที่มีนามสกุล .pdf ไฟล์เดียว',
  )
  .refine(
    (file: FileList) =>
      Array.from(file).every((f) => f.size <= MAX_UPLOAD_SIZE),
    'ไฟล์ใหญ่เกิน 10MB',
  );

export const zodDocumentFiles = (
  typeof window === 'undefined' ? z.any() : z.instanceof(FileList)
)
  .refine((file: FileList) => file.length > 0, 'กรุณาเลือกไฟล์')
  .refine((file: FileList) => file.length <= 2, 'เลือกได้มากสุด 2 ไฟล์')
  .refine(
    (file: FileList) =>
      getFileType(file[0]) === 'pdf' || getFileType(file[1]) === 'pdf',
    'กรุณาเลือกไฟล์ที่มีนามสกุล .pdf อย่างน้อย 1 ไฟล์',
  )
  .refine(
    (file: FileList) =>
      Array.from(file).every((f) => f.size <= MAX_UPLOAD_SIZE),
    'ไฟล์ใหญ่เกิน 10MB',
  );

export const createdFormSchema = z.object({
  file: zodDocumentFiles,
  activity: z.nativeEnum(DocumentActivity, { message: 'กรุณากรอกกิจกรรม' }),
  detail: z.string().min(1, { message: 'กรุณากรอกรายละเอียด' }),
  note: z.string().optional(),
  comment: z.string().optional(),
});
