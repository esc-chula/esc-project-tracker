import { z } from "zod";
import { ObjectiveType, ActivityType, GraduateAttributeType, FilingType, ManagementRole, TQFType, SDGType, PlanPhase } from "@/src/constant/enum";

export const ObjectiveSchema = z.object({
  id: z.string().readonly(),
  percent: z.number(),
  type: z.nativeEnum(ObjectiveType),
  detail: z.string(),
});

export const IndicatorSchema = z.object({
  id: z.string().readonly(),
  topic: z.string(),
  measurement: z.string(),
  relatedObjective: z.array(z.string()),
});

export const ParticipantSchema = z.object({
  id: z.string().readonly(),
  role: z.enum(["Worker", "Participant"]),
  year1: z.number(),
  year2: z.number(),
  year3: z.number(),
  year4: z.number(),
  professor: z.number(),
  officer: z.number(),
});

export const ActivityFormatSchema = z.object({
  id: z.string().readonly(),
  step: z.number(),
  topic: z.string(),
  detail: z.string(),
});

export const MemberSchema = z.object({
  id: z.string().readonly(),
  role: z.nativeEnum(ManagementRole),
  division: z.string().optional(),
  name: z.string(),
  studentId: z.string(),
  tel: z.string(),
});

export const ImprovementItemSchema = z.object({
  id: z.string().readonly(),
  problem: z.string(),
  solution: z.string(),
});

export const ImprovementPlanSchema = z.object({
  id: z.string().readonly(),
  phase: z.nativeEnum(PlanPhase),
  details: z.array(ImprovementItemSchema),
});

export const ExpectedOutcomesSchema = z.object({
  id: z.string().readonly(),
  category: z.enum(["Participant", "Worker", "Faculty/University"]),
  detail: z.array(z.string()),
});

export const WorkPlanItemSchema = z.object({
  id: z.string().readonly(),
  detail: z.string(),
  startDate: z.string(),
  endDate: z.string(),
});

export const WorkPlanSchema = z.object({
  id: z.string().readonly(),
  phase: z.nativeEnum(PlanPhase),
  details: z.array(WorkPlanItemSchema),
});

export const BudgetType1Schema = z.object({
  id: z.string().readonly(),
  type: z.literal("Type 1"),
  name: z.string(),
  amount: z.number(),
  unit: z.string(),
  costPerUnit: z.number(),
});

export const BudgetType2Schema = z.object({
  id: z.string().readonly(),
  type: z.literal("Type 2"),
  name: z.string(),
  amount: z.number(),
  unit: z.string(),
  costPerUnit: z.number(),
  numberOfDays: z.number(),
  dayUnit: z.string(),
});

export const BudgetSchema = z.object({
  id: z.string().readonly(),
  source: z.enum(["Faculty", "Sponsor", "Other"]),
  category: z.enum(["Material", "Expense"]),
  details: z.array(z.discriminatedUnion("type", [BudgetType1Schema, BudgetType2Schema])),
});

export const GraduateAttributeSchema = z.object({
  id: z.string().readonly(),
  attribute: z.nativeEnum(GraduateAttributeType),
  question: z.nativeEnum(ObjectiveType),
  responseLeader: z.boolean(),
  responseWorker: z.boolean(),
  responseAttendee: z.boolean(),
  activityId: z.array(z.string()),
});

export const SDGSchema = z.object({
  id: z.string().readonly(),
  sdgGoal: z.nativeEnum(SDGType),
  activityId: z.array(z.string()),
});

export const TQFSchema = z.object({
  id: z.string().readonly(),
  tqfStandard: z.nativeEnum(TQFType),
  activityId: z.array(z.string()),
});

export const DocumentTypeZeroSchema = z.object({
  id: z.string().readonly(),
  projectCode: z.string(),
  projectNameTh: z.string(),
  projectNameEn: z.string(),
  filingType: z.nativeEnum(FilingType),
  filingCode: z.string(),
  filingName: z.string(),
  department: z.string().nullable(),
  isOneDay: z.boolean(),
  startDate: z.string(),
  endDate: z.string().optional(),
  principleAndRationalDetail: z.string(),
  objectiveSummarizeDetail: z.string(),
  objectives: z.array(ObjectiveSchema),
  indicators: z.array(IndicatorSchema),
  approximateParticipants: ParticipantSchema,
  approximateWorkers: ParticipantSchema,
  workPlace: z.string(),
  activityFormat: z.array(ActivityFormatSchema),
  members: z.array(MemberSchema),
  improvementPlans: z.array(ImprovementPlanSchema),
  expectedOutcomes: z.array(ExpectedOutcomesSchema),
  workPlans: z.array(WorkPlanSchema),
  actualWorkHours: z.number(),
  actualVolunteerHours: z.number(),
  budgets: z.array(BudgetSchema),
  graduateAttributes: z.array(GraduateAttributeSchema),
  typeOfActivity: z.nativeEnum(ActivityType),
  sdgs: z.array(SDGSchema),
  tqfStandards: z.array(TQFSchema),
  createdBy: z.string(),
  updatedBy: z.string(),
  createdAt: z.string(),
  updatedAt: z.string().optional(),
});
