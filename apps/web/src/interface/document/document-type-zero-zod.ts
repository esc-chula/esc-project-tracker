import { z } from 'zod';
import { FilingType, ObjectiveType, ActivityType, GraduateAttribute, ManagementRole, TQFStandard } from '@/src/constant/enum';

// Define sub-schemas
export const SignatureSchema = z.object({
  id: z.string(),
  name: z.string(),
  signature: z.string(), // base64
});

export const ObjectiveSchema = z.object({
  id: z.string(),
  percent: z.number(),
  type: z.nativeEnum(ObjectiveType),
  detail: z.string(),
});

export const IndicatorSchema = z.object({
  id: z.string(),
  detail: z.string(),
  measurement: z.string(),
});

export const ObjectiveMapIndicatorSchema = z.object({
  id: z.string(),
  indicator_id: z.string(),
  objective_id: z.string(),
});

export const ParticipantSchema = z.object({
  role: z.enum(['Worker', 'Participant']),
  year1: z.number(),
  year2: z.number(),
  year3: z.number(),
  year4: z.number(),
  professor: z.number(),
  officer: z.number(),
});

export const ActivityFormatSchema = z.object({
  id: z.string(),
  step: z.number(),
  name: z.string(),
  detail: z.string(),
});

export const MemberSchema = z.object({
  id: z.string(),
  role: z.nativeEnum(ManagementRole),
  division: z.string().optional(),
  name: z.string(),
  student_id: z.string(),
  tel: z.string(),
});

export const ImprovementPlanSchema = z.object({
  id: z.string(),
  phase: z.enum(['Preparation', 'Execution', 'Conclusion']),
  problem: z.string(),
  solution: z.string(),
});

export const ExpectedOutcomesSchema = z.object({
  id: z.string(),
  category: z.enum(['Participant', 'Worker', 'Faculty/University']),
  detail: z.string(),
});

export const WorkPlanSchema = z.object({
  id: z.string(),
  phase: z.enum(['Preparation', 'Execution', 'Conclusion']),
  name: z.string(),
  start_date: z.date(),
  end_date: z.date(),
});

export const BudgetSchema = z.object({
  id: z.string(),
  source: z.enum(['Faculty', 'Sponsor', 'Other']),
  category: z.enum(['Material', 'Expense']),
  name: z.string(),
  amount: z.number(),
  cost_per_unit: z.number(),
  total_cost: z.number(),
});

export const GraduateAttributesSchema = z.object({
  id: z.string(),
  attribute: z.nativeEnum(GraduateAttribute),
  question: z.nativeEnum(ObjectiveType),
  response_leader: z.boolean(),
  response_worker: z.boolean(),
  response_attendee: z.boolean(),
});

export const ActivityMapGraduateSchema = z.object({
  id: z.string(),
  graduate_id: z.nativeEnum(ObjectiveType),
  activity_id: z.string(),
});

export const SustainableDevelopmentGoalsSchema = z.object({
  id: z.string(),
  goal: z.string(),
  activity_type: z.string(),
});

export const ActivityMapTQFStandardsSchema = z.object({
  id: z.string(),
  tqf_standards: z.nativeEnum(TQFStandard),
  activity_id: z.string(),
});

// Main DocumentTypeZero schema
export const DocumentTypeZeroSchema = z.object({
  id: z.string(),
  project_code: z.string(),
  project_name_th: z.string(),
  filing_type: z.nativeEnum(FilingType),
  filing_code: z.string(),
  filing_name: z.string(),
  project_name_en: z.string(),
  department: z.string().nullable(),
  isOneDay: z.boolean(),
  start_date: z.date(),
  end_date: z.date().optional(),
  principle_and_rational_detail: z.string(),
  objective_summarize_detail: z.string(),
  signatures: z.array(SignatureSchema),
  objectives: z.array(ObjectiveSchema),
  indicators: z.array(IndicatorSchema),
  objective_map_indicators: z.array(ObjectiveMapIndicatorSchema),
  participants: z.array(ParticipantSchema),
  workers: z.array(ParticipantSchema),
  work_place: z.string(),
  activity_format: z.array(ActivityFormatSchema),
  member: z.array(MemberSchema),
  improvement_plans: z.array(ImprovementPlanSchema),
  expected_outcomes: z.array(ExpectedOutcomesSchema),
  work_plans: z.array(WorkPlanSchema),
  actual_work_hours: z.number(),
  actual_volunteer_hours: z.number(),
  budgets: z.array(BudgetSchema),
  graduate_attributes: z.array(GraduateAttributesSchema),
  activity_map_graduates: z.array(ActivityMapGraduateSchema),
  type_of_activity: z.nativeEnum(ActivityType),
  sdgs: z.array(SustainableDevelopmentGoalsSchema),
  tqf_standards: z.array(ActivityMapTQFStandardsSchema),
});