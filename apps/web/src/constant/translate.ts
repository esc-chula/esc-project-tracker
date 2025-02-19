import { FilingSubType, ProjectStatus, SustainableDevelopmentGoal } from './enum';

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

export const SustainableDevelopmentGoalToThai = {
  [SustainableDevelopmentGoal.NO_POVERTY]: 'ขจัดความยากจน',
  [SustainableDevelopmentGoal.ZERO_HUNGER]: 'ขจัดความหิวโหย',
  [SustainableDevelopmentGoal.GOOD_HEALTH_AND_WELL_BEING]: 'การมีสุขภาพและความเป็นอยู่ที่ดี',
  [SustainableDevelopmentGoal.QUALITY_EDUCATION]: 'การศึกษาที่เท่าเทียม',
[SustainableDevelopmentGoal.GENDER_EQUALITY]: 'ความเท่าเทียมทางเพศ',
  [SustainableDevelopmentGoal.CLEAN_WATER_AND_SANITATION]: 'การจัดการน้ำและสุขาภิบาล',
  [SustainableDevelopmentGoal.AFFORDABLE_AND_CLEAN_ENERGY]: 'พลังงานสะอาดที่ทุกคนเข้าถึงได้',
  [SustainableDevelopmentGoal.DECENT_WORK_AND_ECONOMIC_GROWTH]: 'การจ้างงานที่มีคุณค่าและการเติบโตทางเศรษฐกิจ',
  [SustainableDevelopmentGoal.INDUSTRY_INNOVATION_AND_INFRASTRUCTURE]: 'อุตสาหกรรม นวัตกรรม โครงสร้างพื้นฐาน',
  [SustainableDevelopmentGoal.REDUCED_INEQUALITIES]: 'ลดความเหลื่อมล้ำ',
  [SustainableDevelopmentGoal.SUSTAINABLE_CITIES_AND_COMMUNITIES]: 'เมืองและถิ่นฐานมนุษย์อย่างยั่งยืน',
  [SustainableDevelopmentGoal.RESPONSIBLE_CONSUMPTION_AND_PRODUCTION]: 'แผนการบริโภคและการผลิตที่ยั่งยืน',
  [SustainableDevelopmentGoal.CLIMATE_ACTION]: 'การรับมือการเปลี่ยนแปลงสภาพภูมิอากาศ',
  [SustainableDevelopmentGoal.LIFE_BELOW_WATER]: 'การใช้ประโยชน์จากมหาสมุทรและทรัพยากรทางทะเล',
  [SustainableDevelopmentGoal.LIFE_ON_LAND]:'การใช้ประโยชน์จากระบบนิเวศทางบก',
  [SustainableDevelopmentGoal.PEACE_JUSTICE_AND_STRONG_INSTITUTIONS]: 'สังคมสงบสุข ยุติธรรม ไม่แบ่งแยก',
  [SustainableDevelopmentGoal.PARTNERSHIPS_FOR_THE_GOALS]: 'ความร่วมมือเพื่อการพัฒนาที่ยั่งยืน',
};