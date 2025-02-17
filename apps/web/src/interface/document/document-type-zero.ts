import type { ObjectiveType, ActivityType, GraduateAttribute } from "@/src/constant/enum";

export interface DocumentTypeZero {
  id: string;
  filing_code: string;
  project_code: string;
  project_name_th: string;
  project_name_en: string;
  student_id: string;
  leader_name: string;
  professor_name: string;
  department: string; // esc fields, club
  start_date: Date;
  end_date: Date;
  body_detail: string;
  reason_detail: string;
  work_place: string;
  type_of_activity: ActivityType;
  actual_work_hours: number;
  actual_volunteer_hours: number;
}

export interface Signature {
  id: string;
  project_id: string;
  name: string;
  signature: string; // base64
}

export interface Objective {
  id: string;
  project_id: string;
  percent: number;
  type: ObjectiveType;
  detail: string;
}

export interface Indicator {
  id: string;
  project_id: string;
  detail: string;
  measurement: string;
}

export interface IndicatorObjective {
  id: string;
  objective_id: string[];
}

export interface Participant {
  project_id: string;
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
  project_id: string;
  detail: string;
}

export interface ManagementStructure {
  id: string;
  project_id: string;
  role: 'Advisor' | 'President' | 'Vice President' | 'Secretary' | 'Treasurer' | 'Division VP';
  division?: string;
  name: string;
  tel: string;
}

export interface ImprovementPlan {
  id: string;
  project_id: string;
  phase: 'Preparation' | 'Execution' | 'Conclusion';
  problem: string;
  solution: string;
}

export interface ExpectedOutcomes {
  id: string;
  project_id: string;
  category: 'Participant' | 'Worker' | 'Faculty/University';
  detail: string;
}

export interface WorkPlan {
  id: string;
  project_id: string;
  phase: 'Preparation' | 'Execution' | 'Conclusion';
  activity_detail: string;
  start_date: Date;
  end_date: Date;
}

export interface Budget {
  id: string;
  project_id: string;
  source: 'Faculty' | 'Sponsor' | 'Other';
  category: 'Material' | 'Expense';
  name: string;
  amount: number;
  cost_per_unit: number;
  total_cost: number;
}

export interface GraduateAttributes {
  id: string;
  project_id: string;
  attribute: GraduateAttribute;
  question: string;
  response_leader: boolean;
  response_worker: boolean;
  response_attendee: boolean;
}

export interface SustainableDevelopmentGoals {
  id: string;
  project_id: string;
  goal: string;
  activity_type: string;
}

export interface TQFStandards {
  project_id: string;
  ethics_and_moral: boolean;
  knowledge: boolean;
  cognitive_skills: boolean;
  interpersonal_skills: boolean;
  numerical_analysis: boolean;
}