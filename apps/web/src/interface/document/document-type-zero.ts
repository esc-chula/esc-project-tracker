import type { ObjectiveType, ActivityType, GraduateAttribute, FilingType, ManagementRole, TQFStandard } from "@/src/constant/enum";

export interface DocumentTypeZero {
  id: string;
  project_code: string;
  project_name_th: string;
  filing_type: FilingType;
  filing_code: string;
  filing_name: string;
  project_name_en: string;
  department: string | null; // esc fields, club, null
  isOneDay: boolean;
  start_date: Date;
  end_date?: Date; // for project has more than 1 days
  principle_and_rational_detail: string;
  objective_summarize_detail: string;
  signatures: Signature[]; // เซ็นรับรอง
  objectives: Objective[];
  indicators: Indicator[];
  objective_map_indicators: ObjectiveMapIndicator[];
  participants: Participant[];
  workers: Participant[];
  work_place: string;
  activity_format: ActivityFormat[];
  member: Member[]; // โครงสร้างบริหารและผู้ประสานโครงการ
  improvement_plans: ImprovementPlan[];
  expected_outcomes: ExpectedOutcomes[];
  work_plans: WorkPlan[];
  actual_work_hours: number;
  actual_volunteer_hours: number;
  budgets: Budget[];
  graduate_attributes: GraduateAttributes[];
  activity_map_graduates: ActivityMapGraduate[];
  type_of_activity: ActivityType;
  sdgs: SustainableDevelopmentGoals[];
  tqf_standards: ActivityMapTQFStandards[];
}

export interface Signature {
  id: string;
  name: string;
  signature: string; // base64
}

export interface Objective {
  id: string;
  percent: number;
  type: ObjectiveType;
  detail: string;
}

export interface Indicator {
  id: string;
  detail: string;
  measurement: string;
}

export interface ObjectiveMapIndicator {
  id: string;
  indicator_id: string;
  objective_id: string;
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
  id: string;
  step: number;
  name: string;
  detail: string;
}

export interface Member {
  id: string;
  role: ManagementRole;
  division?: string;
  name: string;
  student_id: string;
  tel: string;
}

export interface ImprovementPlan {
  id: string;
  phase: 'Preparation' | 'Execution' | 'Conclusion';
  problem: string;
  solution: string;
}

export interface ExpectedOutcomes {
  id: string;
  category: 'Participant' | 'Worker' | 'Faculty/University';
  detail: string;
}

export interface WorkPlan {
  id: string;
  phase: 'Preparation' | 'Execution' | 'Conclusion';
  name: string;
  start_date: Date;
  end_date: Date;
}

export interface Budget {
  id: string;
  source: 'Faculty' | 'Sponsor' | 'Other';
  category: 'Material' | 'Expense';
  name: string;
  amount: number;
  cost_per_unit: number;
  total_cost: number;
}

export interface GraduateAttributes {
  id: string;
  attribute: GraduateAttribute;
  question: ObjectiveType;
  response_leader: boolean;
  response_worker: boolean;
  response_attendee: boolean;
}

export interface ActivityMapGraduate {
  id: string;
  graduate_id: ObjectiveType;
  activity_id: string;
}

export interface SustainableDevelopmentGoals {
  id: string;
  goal: string;
  activity_type: string;
}

export interface ActivityMapTQFStandards {
  id: string;
  tqf_standards: TQFStandard;
  activity_id: string;
}