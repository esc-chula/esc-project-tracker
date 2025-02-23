import type { ObjectiveType, ActivityType, GraduateAttributeType, FilingType, ManagementRole, TQFType, SDGType, PlanPhase } from "@/src/constant/enum";

// design by following figma: https://www.figma.com/design/Dz6HOGk6pFbHFLdsra05Fh/ESC-Project-Tracker--%5BPhase-2%5D?node-id=0-1&p=f&t=fT3aiSmCE6oX1NMj-0
export interface DocumentTypeZero { // เอกสารเปิดโครง
  readonly id: string;
  projectCode: string;
  projectNameTh: string;
  projectNameEn: string;
  filingType: FilingType;
  filingCode: string;
  filingName: string;
  department: string | null; // esc fields, club, null
  isOneDay: boolean;
  startDate: string;
  endDate?: string; // For projects lasting more than 1 day
  principleAndRationalDetail: string; // หลักการและเหตุ
  objectiveSummarizeDetail: string; // วัตถุประสงค์โครงการแบบย่อ
  objectives: Objective[]; // วัตถุประสงค์โครงการ
  indicators: Indicator[]; // ตัวชี้วัดความสำเร็จ
  approximateParticipants: Participant; // จำนวนผู้เข้าร่วมที่คาดว่าจะเข้าร่วมโครงการ
  approximateWorkers: Participant; // จำนวนผู้ปฏิบัติงานที่คาดว่าจะเข้าร่วมโครงการ
  workPlace: string;
  activityFormat: ActivityFormat[]; // รูปแบบกิจกรรม
  members: Member[]; // โครงสร้างบริหารและผู้ประสานโครงการ
  improvementPlans: ImprovementPlan[]; // แนวทางการพัฒนาโครงการจากที่ผ่านมา
  expectedOutcomes: ExpectedOutcomes[]; // ผลที่คาดว่าจะได้รับ
  workPlans: WorkPlan[]; // แผนการดำเนินงาน
  actualWorkHours: number;
  actualVolunteerHours: number;
  budgets: Budget[]; // งบประมาณที่ใช้ในการดำเนินงาน
  graduateAttributes: GraduateAttribute[]; // คุณลักษณะบัณณิตจุณา
  typeOfActivity: ActivityType;
  sdgs: SDG[]; // เป้าหมายพัฒนายั่งยืน
  tqfStandards: TQF[]; // มาตรฐาน TQF
  createdBy: string;
  updatedBy: string;
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
  relatedObjective: string[]; // id of objectives
}

export interface Participant {
  readonly id: string;
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
  studentId: string;
  tel: string;
}

export interface ImprovementPlan {
  readonly id: string;
  phase: PlanPhase;
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
  phase: PlanPhase;
  details :WorkPlanItem[];
}

export interface WorkPlanItem {
  readonly id: string;
  detail: string;
  startDate: string;
  endDate: string;
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
  costPerUnit: number;
}

export interface BudgetType1 extends BaseBudgetDeatil {
  type: 'Type 1';
}

export interface BudgetType2 extends BaseBudgetDeatil {
  type: 'Type 2';
  numberOfDays: number;
  dayUnit: string;
}

export interface GraduateAttribute {
  readonly id: string;
  attribute: GraduateAttributeType;
  question: ObjectiveType;
  responseLeader: boolean;
  responseWorker: boolean;
  responseAttendee: boolean;
  activityId: string[]; // id of activities
}

export interface SDG {
  readonly id: string;
  sdgGoal: SDGType;
  activityId: string[]; // id of activities
}

export interface TQF { // จับคู่กิจกรรมกับมาตรฐาน TQF
  readonly id: string;
  tqfStandard: TQFType;
  activityId: string[]; // id of activities
}