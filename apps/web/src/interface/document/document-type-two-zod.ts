import { z } from 'zod';
import { FilingType } from '@repo/shared';
import { BudgetSchema } from './document-type-zero-zod';

export const DocumentTypeTwoSchema = z.object({
  projectCode: z.string(),
  projectNameTH: z.string(),
  projectNameEN: z.string(),
  filingType: z.nativeEnum(FilingType),
  filingCode: z.string(),
  filingName: z.string(),
  department: z.string().nullable(),
  startDate: z.string(),
  endDate: z.string().optional(),
  objectiveSummarizeDetail: z.string(),

  budgets: z.array(BudgetSchema),
  procurementBudgets: z.number().positive(),

  updatedBy: z.string(),
});
