import { FilingType, Budget } from '@repo/shared';

export interface DocumentTypeTwo {
  // เอกสารเปิดโครง
  projectNameEN: string;
  department: string | null; // esc fields, club, null
  startDate: string;
  endDate?: string; // For projects lasting more than 1 day
  objectiveSummarizeDetail: string; // วัตถุประสงค์โครงการแบบย่อ

  budgets: Budget[]; // งบประมาณที่ใช้ในการดำเนินงาน
  procurementBudgets: number;

  updatedBy: string;
}
