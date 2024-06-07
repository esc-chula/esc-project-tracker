import { ProjectType } from "./enum";

export const filingTypeMap = [
  {
    label: "เอกสารขอเปิดโครงการ",
    value: 0,
  },
  {
    label:
      "เอกสารขอใช้งานกายภาพ : ขอใช้สถานที่และอุปกรณ์ / ขอใช้อุปกรณ์ / ขอใช้ลานจอดรถ / ขอเปลี่ยนเส้นทางจารจร",
    value: 1,
  },
  {
    label: "เอกสารขอยืมสำรองจ่าย",
    value: 2,
  },
  {
    label: "เอกสารขอสปอนเซอร์",
    value: 3,
  },
  {
    label: "เอกสารขอบคุณสปอนเซอร์",
    value: 4,
  },
  {
    label:
      "เอกสารในโครงการ : จดหมายทั่วไปในคณะ / ทั่วไปนอกคณะ / เชิญวิทยากร / ขอบคุณวิทยากร",
    value: 5,
  },
  {
    label: "เอกสารรายงานผลการดำเนินงาน (สรุปกิจกรรม)",
    value: 6,
  },
  {
    label: "เอกสารขออนุมัติเบิกจ่าย (สรุปค่าใช้จ่าย)",
    value: 7,
  },
  {
    label: "เอกสารขอเบิกเงิน",
    value: 8,
  },
  {
    label: "เอกสารนอกโครงการ",
    value: 9,
  },
];

export const projectTypeMap = [
  {
    label: "โครงการฝ่ายกิจการภายใน",
    value: ProjectType.INTERNAL_AFFAIR,
  },
  {
    label: "โครงการฝ่ายศิลปะและวัฒนธรรม",
    value: ProjectType.ARTS_CULTURE_AFFAIR,
  },
  {
    label: "โครงการฝ่ายกีฬา",
    value: ProjectType.SPORTS_AFFAIR,
  },
  {
    label: "โครงการฝ่ายพัฒนาสังคมและบำเพ็ญประโยชน์",
    value: ProjectType.SOCIAL_SERVICE_AFFAIR,
  },
  {
    label: "โครงการสวัสดิการนิสิตและสิ่งแวดล้อม",
    value: ProjectType.STUDENTS_WELFARE_ENV_AFFAIR,
  },
  {
    label: "โครงการฝ่ายกิจการภายนอก",
    value: ProjectType.EXTERNAL_AFFAIR,
  },
  {
    label: "โครงการฝ่ายนิสิตสัมพันธ์",
    value: ProjectType.NISITSUMPAN_AFFAIR,
  },
  {
    label: "โครงการฝ่ายเทคโนโลยี",
    value: ProjectType.TECH_AFFAIR,
  },
  {
    label: "โครงการฝ่ายพัฒนาองค์กร",
    value: ProjectType.ORGANIZATION_AFFAIR,
  },
  {
    label: "โครงการฝ่ายประชาสัมพันธ์และการตลาด",
    value: ProjectType.PR_MARGETING_AFFAIR,
  },
  {
    label: "โครงการฝ่ายวิชาการ",
    value: ProjectType.ACADEMICS_AFFAIR,
  },
  {
    label: "โครงการอื่นๆของกวศ.",
    value: ProjectType.OTHER_ESC,
  },
  {
    label: "โครงการฝ่ายสำนักงานและพัสดุ",
    value: ProjectType.OFFICE_SUPPLY_AFFAIR,
  },
];
