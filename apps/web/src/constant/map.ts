import { ProjectType, DocumentActivity, ObjectiveType } from "./enum";

export const projectTypeMap = [
  {
    label: "10xx - โครงการฝ่ายกิจการภายใน",
    value: ProjectType.INTERNAL_AFFAIR,
  },
  {
    label: "11xx - โครงการฝ่ายศิลปะและวัฒนธรรม",
    value: ProjectType.ARTS_CULTURE_AFFAIR,
  },
  {
    label: "12xx - โครงการฝ่ายกีฬา",
    value: ProjectType.SPORTS_AFFAIR,
  },
  {
    label: "13xx - โครงการฝ่ายพัฒนาสังคมและบำเพ็ญประโยชน์",
    value: ProjectType.SOCIAL_SERVICE_AFFAIR,
  },
  {
    label: "14xx - โครงการสวัสดิการนิสิตและสิ่งแวดล้อม",
    value: ProjectType.STUDENTS_WELFARE_ENV_AFFAIR,
  },
  {
    label: "20xx - โครงการฝ่ายกิจการภายนอก",
    value: ProjectType.EXTERNAL_AFFAIR,
  },
  {
    label: "30xx - โครงการฝ่ายนิสิตสัมพันธ์",
    value: ProjectType.NISITSUMPAN_AFFAIR,
  },
  {
    label: "40xx - โครงการฝ่ายเทคโนโลยี",
    value: ProjectType.TECH_AFFAIR,
  },
  {
    label: "50xx - โครงการฝ่ายพัฒนาองค์กร",
    value: ProjectType.ORGANIZATION_AFFAIR,
  },
  {
    label: "60xx - โครงการฝ่ายประชาสัมพันธ์และการตลาด",
    value: ProjectType.PR_MARGETING_AFFAIR,
  },
  {
    label: "70xx - โครงการฝ่ายวิชาการ",
    value: ProjectType.ACADEMICS_AFFAIR,
  },
  {
    label: "80xx - โครงการอื่นๆของกวศ.",
    value: ProjectType.OTHER_ESC,
  },
  {
    label: "90xx - โครงการฝ่ายสำนักงานและพัสดุ",
    value: ProjectType.OFFICE_SUPPLY_AFFAIR,
  },
];

export const DocumentActivityMapForUser = [
  {
    label: "สร้างเอกสาร",
    value: DocumentActivity.CREATE,
  },
  {
    label: "แก้ไขเอกสาร",
    value: DocumentActivity.EDIT,
  },
];

export const DocumentActivityMapForAdmin = [
  {
    label: "ตอบกลับ",
    value: DocumentActivity.REPLY,
  },
  {
    label: "แก้ไขเอกสาร",
    value: DocumentActivity.EDIT,
  },
];

export const ObjectiveTypeMap = [
  {
    label: 'มีความรู้: รู้รอบ',
    value: ObjectiveType.KNOWLEDGE_BROAD,
  },
  {
    label: 'มีความรู้: รู้ลึก',
    value: ObjectiveType.KNOWLEDGE_DEEP,
  },
  {
    label: 'มีคุณธรรม: มีจรรยาบรรณ',
    value: ObjectiveType.ETHICS_PROFESSIONALISM,
  },
  {
    label: 'มีคุณธรรม: มีคุณธรรมและจริยธรรม',
    value: ObjectiveType.ETHICS_MORALITY,
  },
  {
    label: 'คิดเป็น: สามารถคิดริเริ่มสร้างสรรค์',
    value: ObjectiveType.CRITICAL_THINKING_CREATIVITY,
  },
  {
    label: 'คิดเป็น: สามารถคิดอย่างมีวิจารณญาณ',
    value: ObjectiveType.CRITICAL_THINKING_ANALYTICAL,
  },
  {
    label: 'คิดเป็น: มีทักษะในการคิดแก้ปัญหา',
    value: ObjectiveType.CRITICAL_THINKING_PROBLEM_SOLVING,
  },
  {
    label: 'ทำเป็น: มีทักษะทางเทคโนโลยีสารสนเทศ',
    value: ObjectiveType.SKILL_INFORMATION_TECHNOLOGY,
  },
  {
    label: 'ทำเป็น: มีทักษะทางคณิตศาสตร์และสถิติ',
    value: ObjectiveType.SKILL_MATH_STATS,
  },
  {
    label: 'ทำเป็น: มีทักษะทางวิชาชีพ',
    value: ObjectiveType.SKILL_PROFESSIONAL_SKILLS,
  },
  {
    label: 'ทำเป็น: มีทักษะทางการสื่อสาร',
    value: ObjectiveType.SKILL_COMMUNICATION,
  },
  {
    label: 'ทำเป็น: มีทักษะการบริหารจัดการ',
    value: ObjectiveType.SKILL_MANAGEMENT,
  },
  {
    label: 'ใฝ่รู้และรู้จักวิธีการเรียนรู้: ใฝ่รู้',
    value: ObjectiveType.LIFELONG_LEARNING_CURIOSITY,
  },
  {
    label: 'ใฝ่รู้และรู้จักวิธีการเรียนรู้: รู้จักวิธีการเรียนรู้',
    value: ObjectiveType.LIFELONG_LEARNING_METHODS,
  },
  {
    label: 'มีภาวะผู้นำ',
    value: ObjectiveType.LEADERSHIP,
  },
  {
    label: 'มีสุขภาวะ',
    value: ObjectiveType.HEALTH_WELLBEING,
  },
  {
    label: 'มีจิตอาสาและสำนึกสาธารณะ',
    value: ObjectiveType.VOLUNTEERISM_PUBLIC_AWARENESS,
  },
  {
    label: 'ดำรงความเป็นไทยในกระแสโลกาภิวัฒน์',
    value: ObjectiveType.THAI_IDENTITY_GLOBALIZATION,
  },
];
