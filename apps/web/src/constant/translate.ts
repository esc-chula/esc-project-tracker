import { FilingSubType, ProjectStatus, SDGType, ObjectiveType, ActivityType } from './enum';

export const ProjectStatusToThai = new Map([
  [ProjectStatus.CLOSED, 'ปิดโครงการเรียบร้อย'],
  [ProjectStatus.CONTINUE, 'กำลังดำเนินกิจกรรม'],
  [ProjectStatus.WAIT_FOR_CLOSE, 'รอปิดโครงการ'],
  [ProjectStatus.WAIT_FOR_APPROVE, 'รออนุมัติ'],
  [ProjectStatus.CLOSING, 'กำลังปิดโครงการ'],
]);

export const TextFilingSubType = {
  // 1xxx - เอกสารขอใช้งานกายภาพ
  [FilingSubType.LOCATION_REQUEST]: 'ขอใช้สถานที่และอุปกรณ์',
  [FilingSubType.EQUIPMENT_REQUEST]: 'ขอใช้อุปกรณ์',
  [FilingSubType.PARKING_REQUEST]: 'ขอใช้ลานจอดรถ',
  [FilingSubType.TRAFFIC_REROUTE_REQUEST]: 'ขอเปลี่ยนเส้นทางจราจร',

  // 5xxx - เอกสารในโครงการ
  [FilingSubType.GENERAL_INTERNAL_LETTER]: 'จดหมายทั่วไปในคณะ',
  [FilingSubType.GENERAL_EXTERNAL_LETTER]: 'จดหมายทั่วไปนอกคณะ',
  [FilingSubType.SPEAKER_INVITATION_LETTER]: 'จดหมายเชิญวิทยากร',
  [FilingSubType.SPEAKER_GRATITUDE_LETTER]: 'จดหมายขอบคุณวิทยากร',
};

export const SDGToThai = {
  [SDGType.NO_POVERTY]: 'ขจัดความยากจน',
  [SDGType.ZERO_HUNGER]: 'ขจัดความหิวโหย',
  [SDGType.GOOD_HEALTH_AND_WELL_BEING]: 'การมีสุขภาพและความเป็นอยู่ที่ดี',
  [SDGType.QUALITY_EDUCATION]: 'การศึกษาที่เท่าเทียม',
  [SDGType.GENDER_EQUALITY]: 'ความเท่าเทียมทางเพศ',
  [SDGType.CLEAN_WATER_AND_SANITATION]: 'การจัดการน้ำและสุขาภิบาล',
  [SDGType.AFFORDABLE_AND_CLEAN_ENERGY]: 'พลังงานสะอาดที่ทุกคนเข้าถึงได้',
  [SDGType.DECENT_WORK_AND_ECONOMIC_GROWTH]: 'การจ้างงานที่มีคุณค่าและการเติบโตทางเศรษฐกิจ',
  [SDGType.INDUSTRY_INNOVATION_AND_INFRASTRUCTURE]: 'อุตสาหกรรม นวัตกรรม โครงสร้างพื้นฐาน',
  [SDGType.REDUCED_INEQUALITIES]: 'ลดความเหลื่อมล้ำ',
  [SDGType.SUSTAINABLE_CITIES_AND_COMMUNITIES]: 'เมืองและถิ่นฐานมนุษย์อย่างยั่งยืน',
  [SDGType.RESPONSIBLE_CONSUMPTION_AND_PRODUCTION]: 'แผนการบริโภคและการผลิตที่ยั่งยืน',
  [SDGType.CLIMATE_ACTION]: 'การรับมือการเปลี่ยนแปลงสภาพภูมิอากาศ',
  [SDGType.LIFE_BELOW_WATER]: 'การใช้ประโยชน์จากมหาสมุทรและทรัพยากรทางทะเล',
  [SDGType.LIFE_ON_LAND]:'การใช้ประโยชน์จากระบบนิเวศทางบก',
  [SDGType.PEACE_JUSTICE_AND_STRONG_INSTITUTIONS]: 'สังคมสงบสุข ยุติธรรม ไม่แบ่งแยก',
  [SDGType.PARTNERSHIPS_FOR_THE_GOALS]: 'ความร่วมมือเพื่อการพัฒนาที่ยั่งยืน',
};

export const ObjectiveTypeToThai = {
  [ObjectiveType.KNOWLEDGE_BROAD]: 'มีความรู้: รู้รอบ',
  [ObjectiveType.KNOWLEDGE_DEEP]: 'มีความรู้: รู้ลึก',
  [ObjectiveType.ETHICS_PROFESSIONALISM]: 'มีคุณธรรม: มีจรรยาบรรณ',
  [ObjectiveType.ETHICS_MORALITY]: 'มีคุณธรรม: มีคุณธรรมและจริยธรรม',
  [ObjectiveType.CRITICAL_THINKING_CREATIVITY]: 'คิดเป็น: สามารถคิดริเริ่มสร้างสรรค์',
  [ObjectiveType.CRITICAL_THINKING_ANALYTICAL]: 'คิดเป็น: สามารถคิดอย่างมีวิจารณญาณ',
  [ObjectiveType.CRITICAL_THINKING_PROBLEM_SOLVING]: 'คิดเป็น: มีทักษะในการคิดแก้ปัญหา',
  [ObjectiveType.SKILL_INFORMATION_TECHNOLOGY]: 'ทำเป็น: มีทักษะทางเทคโนโลยีสารสนเทศ',
  [ObjectiveType.SKILL_MATH_STATS]: 'ทำเป็น: มีทักษะทางคณิตศาสตร์และสถิติ',
  [ObjectiveType.SKILL_PROFESSIONAL_SKILLS]: 'ทำเป็น: มีทักษะทางวิชาชีพ',
  [ObjectiveType.SKILL_COMMUNICATION]: 'ทำเป็น: มีทักษะทางการสื่อสาร',
  [ObjectiveType.SKILL_MANAGEMENT]: 'ทำเป็น: มีทักษะการบริหารจัดการ',
  [ObjectiveType.LIFELONG_LEARNING_CURIOSITY]: 'ใฝ่รู้และรู้จักวิธีการเรียนรู้: ใฝ่รู้',
  [ObjectiveType.LIFELONG_LEARNING_METHODS]: 'ใฝ่รู้และรู้จักวิธีการเรียนรู้: รู้จักวิธีการเรียนรู้',
  [ObjectiveType.LEADERSHIP]: 'มีภาวะผู้นำ',
  [ObjectiveType.HEALTH_WELLBEING]: 'มีสุขภาวะ',
  [ObjectiveType.VOLUNTEERISM_PUBLIC_AWARENESS]: 'มีจิตอาสาและสำนึกสาธารณะ',
  [ObjectiveType.THAI_IDENTITY_GLOBALIZATION]: 'ดำรงความเป็นไทยในกระแสโลกาภิวัฒน์',
};

export const ActivityTypeToThai = {
  [ActivityType.ACADEMIC_GRADUATE_ATTRIBUTES]: 'กิจกรรมวิชาการที่ส่งเสริมคุณลักษณะบัณฑิตที่พึงประสงค์',
  [ActivityType.SPORTS_HEALTH]: 'กิจกรรมกีฬาหรือการส่งเสริมสุขภาพ',
  [ActivityType.VOLUNTEERING_ENVIRONMENT]: 'กิจกรรมบำเพ็ญประโยชน์และรักษาสิ่งแวดล้อม',
  [ActivityType.CULTURAL_ARTS]: 'กิจกรรมส่งเสริมศิลปวัฒนธรรม',
  [ActivityType.ETHICS_MORALITY]: 'กิจกรรมเสริมสร้างคุณธรรมและจริยธรรม',
};
