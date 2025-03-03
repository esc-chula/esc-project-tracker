export enum FilingStatus {
  APPROVED = 'APPROVED',
  WAIT_FOR_STUDENT_AFFAIR = 'WAIT_FOR_STUDENT_AFFAIR',
  WAIT_FOR_SECRETARY = 'WAIT_FOR_SECRETARY',
  RETURNED = 'RETURNED',
  DRAFT = 'DRAFT',
  DOCUMENT_CREATED = 'DOCUMENT_CREATED',
}

export enum FilingSubType {
  // 1xxx - เอกสารขอใช้งานกายภาพ
  LOCATION_REQUEST = 'LOCATION_REQUEST', // ขอใช้สถานที่และอุปกรณ์
  EQUIPMENT_REQUEST = 'EQUIPMENT_REQUEST', // ขอใช้อุปกรณ์
  PARKING_REQUEST = 'PARKING_REQUEST', // ขอใช้ลานจอดรถ
  TRAFFIC_REROUTE_REQUEST = 'TRAFFIC_REROUTE_REQUEST', // ขอเปลี่ยนเส้นทางจราจร

  // 5xxx - เอกสารในโครงการ
  GENERAL_INTERNAL_LETTER = 'GENERAL_INTERNAL_LETTER', // จดหมายทั่วไปในคณะ
  GENERAL_EXTERNAL_LETTER = 'GENERAL_EXTERNAL_LETTER', // จดหมายทั่วไปนอกคณะ
  SPEAKER_INVITATION_LETTER = 'SPEAKER_INVITATION_LETTER', // จดหมายเชิญวิทยากร
  SPEAKER_GRATITUDE_LETTER = 'SPEAKER_GRATITUDE_LETTER', // จดหมายขอบคุณวิทยากร
}

export enum ProjectStatus {
  CONTINUE = 'CONTINUE',
  WAIT_FOR_CLOSE = 'WAIT_FOR_CLOSE',
  CLOSED = 'CLOSED',
  CLOSING = 'CLOSING',
  WAIT_FOR_APPROVE = 'WAIT_FOR_APPROVE',
}

export enum ProjectType {
  INTERNAL_AFFAIR = '10', // กิจการภายใน
  ARTS_CULTURE_AFFAIR = '11', // ศิลปะและวัฒนธรรม
  SPORTS_AFFAIR = '12', // กีฬา
  SOCIAL_SERVICE_AFFAIR = '13', // พัฒนาสังคมและบำเพ็ญประโยชน์
  STUDENTS_WELFARE_ENV_AFFAIR = '14', // สวัสดิการนิสิตและสิ่งแวดล้อม
  EXTERNAL_AFFAIR = '20', // กิจการภายนอก
  NISITSUMPAN_AFFAIR = '30', // นิสิตสัมพันธ์
  TECH_AFFAIR = '40', //เทคโนโลยี
  ORGANIZATION_AFFAIR = '50', // พัฒนาองค์กร
  PR_MARGETING_AFFAIR = '60', // ประชาสัมพันธ์และการตลาด
  ACADEMICS_AFFAIR = '70', // วิชาการ
  OTHER_ESC = '80', // อื่นๆของกวศ
  OFFICE_SUPPLY_AFFAIR = '90', // สำนักงานและพัสดุ
}

export enum FilingType {
  PROJECT_OPENING = '0', // เอกสารเปิดโครงการ
  FACILITY_REQUEST = '1', // เอกสารขอใช้งานกายภาพ
  ADVANCE_PAYMENT = '2', // เอกสารขอยืมสำรองจ่าย
  SPONSOR_REQUEST = '3', // เอกสารขอสปอนเซอร์
  SPONSOR_THANK_YOU = '4', // เอกสารขอบคุณสปอนเซอร์
  PROJECT_DOCUMENT = '5', // เอกสารในโครงการ
  ACTIVITY_REPORT = '6', // เอกสารรายงานผลการดำเนินงาน (สรุปกิจกรรม)
  EXPENSE_APPROVAL = '7', // เอกสารขออนุมัติเบิกจ่าย (สรุปค่าใช้จ่าย)
  PAYMENT_REQUEST = '8', // เอกสารขอเบิกเงิน
  EXTERNAL_DOCUMENT = '9', // เอกสารนอกโครงการ
}

export enum DocumentStatus {
  APPROVED = 'APPROVED',
  WAIT_FOR_STUDENT_AFFAIR = 'WAIT_FOR_STUDENT_AFFAIR',
  WAIT_FOR_SECRETARY = 'WAIT_FOR_SECRETARY',
  RETURNED = 'RETURNED',
  DRAFT = 'DRAFT',
}

export enum DocumentActivity {
  CREATE = 'CREATE', // User Only
  REPLY = 'REPLY', // Admin Only
  EDIT = 'EDIT', // Both
}

export enum ObjectiveType {
  KNOWLEDGE_BROAD = 'KNOWLEDGE_BROAD',
  KNOWLEDGE_DEEP = 'KNOWLEDGE_DEEP',
  ETHICS_PROFESSIONALISM = 'ETHICS_PROFESSIONALISM',
  ETHICS_MORALITY = 'ETHICS_MORALITY',
  CRITICAL_THINKING_CREATIVITY = 'CRITICAL_THINKING_CREATIVITY',
  CRITICAL_THINKING_ANALYTICAL = 'CRITICAL_THINKING_ANALYTICAL',
  CRITICAL_THINKING_PROBLEM_SOLVING = 'CRITICAL_THINKING_PROBLEM_SOLVING',
  SKILL_INFORMATION_TECHNOLOGY = 'SKILL_INFORMATION_TECHNOLOGY',
  SKILL_MATH_STATS = 'SKILL_MATH_STATS',
  SKILL_PROFESSIONAL_SKILLS = 'SKILL_PROFESSIONAL_SKILLS',
  SKILL_COMMUNICATION = 'SKILL_COMMUNICATION',
  SKILL_MANAGEMENT = 'SKILL_MANAGEMENT',
  LIFELONG_LEARNING_CURIOSITY = 'LIFELONG_LEARNING_CURIOSITY',
  LIFELONG_LEARNING_METHODS = 'LIFELONG_LEARNING_METHODS',
  LEADERSHIP = 'LEADERSHIP',
  HEALTH_WELLBEING = 'HEALTH_WELLBEING',
  VOLUNTEERISM_PUBLIC_AWARENESS = 'VOLUNTEERISM_PUBLIC_AWARENESS',
  THAI_IDENTITY_GLOBALIZATION = 'THAI_IDENTITY_GLOBALIZATION',
}

export enum ActivityType {
  ACADEMIC_GRADUATE_ATTRIBUTES = 'ACADEMIC_GRADUATE_ATTRIBUTES',
  SPORTS_HEALTH = 'SPORTS_HEALTH',
  VOLUNTEERING_ENVIRONMENT = 'VOLUNTEERING_ENVIRONMENT',
  CULTURAL_ARTS = 'CULTURAL_ARTS',
  ETHICS_MORALITY = 'ETHICS_MORALITY',
}

export enum GraduateAttributeType {
  KNOWLEDGE = 'KNOWLEDGE',
  ETHICS = 'ETHICS',
  CRITICAL_THINKING = 'CRITICAL_THINKING',
  SKILL = 'SKILL',
  LEADERSHIP = 'LEADERSHIP',
  HEALTH = 'HEALTH',
  VOLUNTEER = 'VOLUNTEER',
  THAI_IDENTITY = 'THAI_IDENTITY',
}

export enum ManagementRole {
  ADVISOR = 'ADVISOR',
  PRESIDENT = 'PRESIDENT',
  VICE_PRESIDENT = 'VICE_PRESIDENT',
  SECRETARY = 'SECRETARY',
  TREASURER = 'TREASURER',
  DIVISION_VP = 'DIVISION_VP',
}

export enum SDGType {
  NO_POVERTY = 'NO_POVERTY',
  ZERO_HUNGER = 'ZERO_HUNGER',
  GOOD_HEALTH_AND_WELL_BEING = 'GOOD_HEALTH_AND_WELL_BEING',
  QUALITY_EDUCATION = 'QUALITY_EDUCATION',
  GENDER_EQUALITY = 'GENDER_EQUALITY',
  CLEAN_WATER_AND_SANITATION = 'CLEAN_WATER_AND_SANITATION',
  AFFORDABLE_AND_CLEAN_ENERGY = 'AFFORDABLE_AND_CLEAN_ENERGY',
  DECENT_WORK_AND_ECONOMIC_GROWTH = 'DECENT_WORK_AND_ECONOMIC_GROWTH',
  INDUSTRY_INNOVATION_AND_INFRASTRUCTURE = 'INDUSTRY_INNOVATION_AND_INFRASTRUCTURE',
  REDUCED_INEQUALITIES = 'REDUCED_INEQUALITIES',
  SUSTAINABLE_CITIES_AND_COMMUNITIES = 'SUSTAINABLE_CITIES_AND_COMMUNITIES',
  RESPONSIBLE_CONSUMPTION_AND_PRODUCTION = 'RESPONSIBLE_CONSUMPTION_AND_PRODUCTION',
  CLIMATE_ACTION = 'CLIMATE_ACTION',
  LIFE_BELOW_WATER = 'LIFE_BELOW_WATER',
  LIFE_ON_LAND = 'LIFE_ON_LAND',
  PEACE_JUSTICE_AND_STRONG_INSTITUTIONS = 'PEACE_JUSTICE_AND_STRONG_INSTITUTIONS',
  PARTNERSHIPS_FOR_THE_GOALS = 'PARTNERSHIPS_FOR_THE_GOALS',
}

export enum TQFType {
  ETHICS_AND_MORAL = 'ETHICS_AND_MORAL',
  KNOWLEDGE = 'KNOWLEDGE',
  COGNITIVE_SKILLS = 'COGNITIVE_SKILLS',
  INTERPERSONAL_SKILLS_AND_RESPONSIBILITY = 'INTERPERSONAL_SKILLS_AND_RESPONSIBILITY',
  NUMERICAL_ANALYSIS_COMMUNICATION_AND_INFORMATION_TECHNOLOGY_SKILLS = 'NUMERICAL_ANALYSIS_COMMUNICATION_AND_INFORMATION_TECHNOLOGY_SKILLS',
}

export enum PlanPhase {
  PREPARATION = 'PREPARATION',
  EXECUTION = 'EXECUTION',
  CONCLUSION = 'CONCLUSION',
}