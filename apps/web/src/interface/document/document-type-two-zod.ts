import { z } from 'zod';
import { BudgetSchema } from './document-type-zero-zod';

export const DocumentTypeTwoSchema = z.object({
  projectNameEN: z.string(),
  department: z.string().nullable(),
  startDate: z.string(),
  endDate: z.string().optional(),
  objectiveSummarizeDetail: z.string(),

  budgets: z.array(BudgetSchema),
  procurementBudgets: z.number().positive(),

  updatedBy: z.string(),
});
