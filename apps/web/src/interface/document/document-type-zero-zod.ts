import { z } from "zod";
import { ObjectiveType, ActivityType, GraduateAttributeType, FilingType, ManagementRole, TQFStandardType, SustainableDevelopmentGoalType } from "@/src/constant/enum";

export const ObjectiveSchema = z.object({
  id: z.string(),
  percent: z.number(),
  type: z.nativeEnum(ObjectiveType),
  detail: z.string(),
});

export const IndicatorSchema = z.object({
  id: z.string(),
  topic: z.string(),
  measurement: z.string(),
  related_objective: z.array(z.string()),
});

export const ParticipantSchema = z.object({
  role: z.enum(["Worker", "Participant"]),
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
  topic: z.string(),
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

export const ImprovementItemSchema = z.object({
  id: z.string(),
  problem: z.string(),
  solution: z.string(),
});

export const ImprovementPlanSchema = z.object({
  id: z.string(),
  phase: z.enum(["Preparation", "Execution", "Conclusion"]),
  details: z.array(ImprovementItemSchema),
});

export const ExpectedOutcomesSchema = z.object({
  id: z.string(),
  category: z.enum(["Participant", "Worker", "Faculty/University"]),
  detail: z.array(z.string()),
});

export const WorkPlanItemSchema = z.object({
  id: z.string(),
  detail: z.string(),
  start_date: z.string(),
  end_date: z.string(),
});

export const WorkPlanSchema = z.object({
  id: z.string(),
  phase: z.enum(["Preparation", "Execution", "Conclusion"]),
  details: z.array(WorkPlanItemSchema),
});

const BaseBudgetDetailSchema = z.object({
  id: z.string(),
  type: z.enum(["Type 1", "Type 2"]),
  name: z.string(),
  amount: z.number(),
  unit: z.string(),
  cost_per_unit: z.number(),
});

export const BudgetType1Schema = BaseBudgetDetailSchema.extend({
  type: z.literal("Type 1"),
});

export const BudgetType2Schema = BaseBudgetDetailSchema.extend({
  type: z.literal("Type 2"),
  number_of_days: z.number(),
  day_unit: z.string(),
});

export const BudgetSchema = z.object({
  id: z.string(),
  source: z.enum(["Faculty", "Sponsor", "Other"]),
  category: z.enum(["Material", "Expense"]),
  details: z.array(z.union([BudgetType1Schema, BudgetType2Schema])),
});

export const GraduateAttributeSchema = z.object({
  id: z.string(),
  attribute: z.nativeEnum(GraduateAttributeType),
  question: z.nativeEnum(ObjectiveType),
  response_leader: z.boolean(),
  response_worker: z.boolean(),
  response_attendee: z.boolean(),
  activity_id: z.array(z.string()),
});

export const SustainableDevelopmentGoalSchema = z.object({
  id: z.string(),
  sdgs_goal: z.nativeEnum(SustainableDevelopmentGoalType),
  activity_id: z.array(z.string()),
});

export const TQFStandardSchema = z.object({
  id: z.string(),
  tqf_standards: z.nativeEnum(TQFStandardType),
  activity_id: z.array(z.string()),
});

export const DocumentTypeZeroSchema = z.object({
  id: z.string(),
  project_code: z.string(),
  project_name_th: z.string(),
  project_name_en: z.string(),
  filing_type: z.nativeEnum(FilingType),
  filing_code: z.string(),
  filing_name: z.string(),
  department: z.string().nullable(),
  isOneDay: z.boolean(),
  start_date: z.string(),
  end_date: z.string().optional(),
  principle_and_rational_detail: z.string(),
  objective_summarize_detail: z.string(),
  objectives: z.array(ObjectiveSchema),
  indicators: z.array(IndicatorSchema),
  approximate_participants: ParticipantSchema,
  approximate_workers: ParticipantSchema,
  work_place: z.string(),
  activity_format: z.array(ActivityFormatSchema),
  member: z.array(MemberSchema),
  improvement_plans: z.array(ImprovementPlanSchema),
  expected_outcomes: z.array(ExpectedOutcomesSchema),
  work_plans: z.array(WorkPlanSchema),
  actual_work_hours: z.number(),
  actual_volunteer_hours: z.number(),
  budgets: z.array(BudgetSchema),
  graduate_attributes: z.array(GraduateAttributeSchema),
  type_of_activity: z.nativeEnum(ActivityType),
  sdgs: z.array(SustainableDevelopmentGoalSchema),
  tqf_standards: z.array(TQFStandardSchema),
  created_by: z.string(),
  updated_by: z.string(),
  createdAt: z.string(),
  updatedAt: z.string().optional(),
});
