import type { ObjectiveType, ActivityType, GraduateAttributeType, FilingType, ManagementRole, TQFStandardType, SustainableDevelopmentGoalType } from "@/src/constant/enum";

// design by following figma: https://www.figma.com/design/Dz6HOGk6pFbHFLdsra05Fh/ESC-Project-Tracker--%5BPhase-2%5D?node-id=0-1&p=f&t=fT3aiSmCE6oX1NMj-0
export interface DocumentTypeZero { // เอกสารเปิดโครง
  readonly id: string;
  project_code: string;
  project_name_th: string;
  project_name_en: string;
  filing_type: FilingType;
  filing_code: string;
  filing_name: string;
  department: string | null; // esc fields, club, null
  isOneDay: boolean;
  start_date: string;
  end_date?: string; // for project has more than 1 days
  principle_and_rational_detail: string; //หลักการและเหตุผล
  objective_summarize_detail: string; // วัตถุประสงค์โครงการแบบย่อ
  objectives: Objective[]; // วัตถุประสงค์โครงการ
  indicators: Indicator[]; // ตัวชี้วัดความสำเร็จ
  approximate_participants: Participant; // จำนวนผู้เข้าร่วมที่คาดว่าจะเข้าร่วมโครงการ
  approximate_workers: Participant; // จำนวนผู้ปฏิบัติงานที่คาดว่าจะเข้าร่วมโครงการ
  work_place: string;
  activity_format: ActivityFormat[]; // รูปแบบกิจกรรม
  member: Member[]; // โครงสร้างบริหารและผู้ประสานโครงการ
  improvement_plans: ImprovementPlan[]; // แนวทางการพัฒนาโครงการจากที่ผ่านมา รวม ช่วงเตรียมงาน ช่วงดำเนินงาน ช่วงสรุปงาน
  expected_outcomes: ExpectedOutcomes[]; // ผลที่คาดว่าจะได้รับ รวม ผู้เข้าร่วมโครงการ ผู้ปฏิบัติงาน คณะ/มหาวิทยาลัย
  work_plans: WorkPlan[]; // แผนการดำเนินงาน รวม ช่วงเตรียมงาน ช่วงดำเนินงาน ช่วงสรุปงาน
  actual_work_hours: number;
  actual_volunteer_hours: number;
  budgets: Budget[]; // งบประมาณที่ใช้ในการดำเนินงาน รวม งบจากคณะวิศวกรรมศาสตร์ งบจากสปอนเซอร์ งบอื่นๆ
  graduate_attributes: GraduateAttribute[]; // คุณลักษณะบัณฑิตจุฬา ที่พึงประสงค์
  type_of_activity: ActivityType;
  sdgs: SustainableDevelopmentGoal[]; // เป้าหมายพัฒนายั่งยืน
  tqf_standards: TQFStandard[]; // มาตรฐาน TQF กับกิจกรรมที่เกี่ยวข้อง
  created_by: string; // user id
  updated_by: string; // user id
  createdAt: string;
  updatedAt?: string;
}

export interface Objective {
  readonly id: string;
  percent: number;
  type: ObjectiveType;
  detail: string;
}

export interface Indicator {
  readonly id: string;
  topic: string;
  measurement: string;
  related_objective: string[]; // id of objectives
}

export interface Participant {
  role: 'Worker' | 'Participant';
  year1: number;
  year2: number;
  year3: number;
  year4: number;
  professor: number;
  officer: number;
}

export interface ActivityFormat {
  readonly id: string;
  step: number;
  topic: string;
  detail: string;
}

export interface Member {
  readonly id: string;
  role: ManagementRole;
  division?: string;
  name: string; // ชื่อจริง-นามสกุล
  student_id: string;
  tel: string;
}

export interface ImprovementPlan {
  readonly id: string;
  phase: 'Preparation' | 'Execution' | 'Conclusion';
  details: ImprovementItem[];
}

export interface ImprovementItem{
  readonly id: string;
  problem: string;
  solution: string;
}

export interface ExpectedOutcomes {
  readonly id: string;
  category: 'Participant' | 'Worker' | 'Faculty/University';
  detail: string[];
}

export interface WorkPlan {
  readonly id: string;
  phase: 'Preparation' | 'Execution' | 'Conclusion';
  details :WorkPlanItem[];
}

export interface WorkPlanItem {
  readonly id: string;
  detail: string;
  start_date: string;
  end_date: string;
}

export interface Budget {
  readonly id: string;
  source: 'Faculty' | 'Sponsor' | 'Other';
  category: 'Material' | 'Expense';
  details: (BudgetType1 | BudgetType2)[];
}

interface BaseBudgetDeatil {
  readonly id: string;
  type: 'Type 1' | 'Type 2';
  name: string;
  amount: number;
  unit: string;
  cost_per_unit: number;
}

export interface BudgetType1 extends BaseBudgetDeatil {
  type: 'Type 1';
}

export interface BudgetType2 extends BaseBudgetDeatil {
  type: 'Type 2';
  number_of_days: number;
  day_unit: string;
}

export interface GraduateAttribute {
  readonly id: string;
  attribute: GraduateAttributeType;
  question: ObjectiveType;
  response_leader: boolean;
  response_worker: boolean;
  response_attendee: boolean;
  activity_id: string[]; // id of activities
}

export interface SustainableDevelopmentGoal {
  readonly id: string;
  sdgs_goal: SustainableDevelopmentGoalType;
  activity_id: string[]; // id of activities
}

export interface TQFStandard { // จับคู่กิจกรรมกับมาตรฐาน TQF
  readonly id: string;
  tqf_standards: TQFStandardType;
  activity_id: string[]; // id of activities
}