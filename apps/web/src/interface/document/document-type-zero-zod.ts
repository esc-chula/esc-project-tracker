import { z } from "zod";
import { ObjectiveType, ActivityType, GraduateAttribute } from "@/src/constant/enum";

export const DocumentTypeZeroSchema = z.object({
  id: z.string(),
  filing_code: z.string(),
  project_code: z.string(),
  project_name_th: z.string(),
  project_name_en: z.string(),
  student_id: z.string(),
  leader_name: z.string(),
  professor_name: z.string(),
  department: z.string(),
  start_date: z.date(),
  end_date: z.date(),
  body_detail: z.string(),
  reason_detail: z.string(),
  work_place: z.string(),
  type_of_activity: z.nativeEnum(ActivityType),
  actual_work_hours: z.number(),
  actual_volunteer_hours: z.number(),
});

export const SignatureSchema = z.object({
  id: z.string(),
  project_id: z.string(),
  name: z.string(),
  signature: z.string(), // base64
});

export const ObjectiveSchema = z.object({
  id: z.string(),
  project_id: z.string(),
  percent: z.number(),
  type: z.nativeEnum(ObjectiveType),
  detail: z.string(),
});

export const IndicatorSchema = z.object({
  id: z.string(),
  project_id: z.string(),
  detail: z.string(),
  measurement: z.string(),
});

export const IndicatorObjectiveSchema = z.object({
  id: z.string(),
  objective_id: z.array(z.string()),
});

export const ParticipantSchema = z.object({
  project_id: z.string(),
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
  project_id: z.string(),
  detail: z.string(),
});

export const ManagementStructureSchema = z.object({
  id: z.string(),
  project_id: z.string(),
  role: z.enum(["Advisor", "President", "Vice President", "Secretary", "Treasurer", "Division VP"]),
  division: z.string().optional(),
  name: z.string(),
  tel: z.string(),
});

export const ImprovementPlanSchema = z.object({
  id: z.string(),
  project_id: z.string(),
  phase: z.enum(["Preparation", "Execution", "Conclusion"]),
  problem: z.string(),
  solution: z.string(),
});

export const ExpectedOutcomesSchema = z.object({
  id: z.string(),
  project_id: z.string(),
  category: z.enum(["Participant", "Worker", "Faculty/University"]),
  detail: z.string(),
});

export const WorkPlanSchema = z.object({
  id: z.string(),
  project_id: z.string(),
  phase: z.enum(["Preparation", "Execution", "Conclusion"]),
  activity_detail: z.string(),
  start_date: z.date(),
  end_date: z.date(),
});

export const BudgetSchema = z.object({
  id: z.string(),
  project_id: z.string(),
  source: z.enum(["Faculty", "Sponsor", "Other"]),
  category: z.enum(["Material", "Expense"]),
  name: z.string(),
  amount: z.number(),
  cost_per_unit: z.number(),
  total_cost: z.number(),
});

export const GraduateAttributesSchema = z.object({
  id: z.string(),
  project_id: z.string(),
  attribute: z.nativeEnum(GraduateAttribute),
  question: z.string(),
  response_leader: z.boolean(),
  response_worker: z.boolean(),
  response_attendee: z.boolean(),
});

export const SustainableDevelopmentGoalsSchema = z.object({
  id: z.string(),
  project_id: z.string(),
  goal: z.string(),
  activity_type: z.string(),
});

export const TQFStandardsSchema = z.object({
  project_id: z.string(),
  ethics_and_moral: z.boolean(),
  knowledge: z.boolean(),
  cognitive_skills: z.boolean(),
  interpersonal_skills: z.boolean(),
  numerical_analysis: z.boolean(),
});
