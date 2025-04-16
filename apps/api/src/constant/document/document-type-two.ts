import { FilingType } from '../enum';
import type { Budget } from './document-type-zero';

export interface DocumentTypeTwo {
  // เอกสารเปิดโครง
  readonly id: string;
  projectCode: string;
  projectNameTH: string;
  projectNameEN: string;
  filingType: FilingType;
  filingCode: string;
  filingName: string;
  department: string | null; // esc fields, club, null
  startDate: string;
  endDate?: string; // For projects lasting more than 1 day
  objectiveSummarizeDetail: string; // วัตถุประสงค์โครงการแบบย่อ

  budgets: Budget[]; // งบประมาณที่ใช้ในการดำเนินงาน
  procurementBudgets: number;

  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt?: string;
}
