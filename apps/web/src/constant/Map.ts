import { ProjectType, DocumentActivity } from "./enum";

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
  { label: "ทุกประเภท", value: 'all',},
  {
    label: "10 - โครงการฝ่ายกิจการภายใน",
    value: ProjectType.INTERNAL_AFFAIR,
  },
  {
    label: "11 - โครงการฝ่ายศิลปะและวัฒนธรรม",
    value: ProjectType.ARTS_CULTURE_AFFAIR,
  },
  {
    label: "12 - โครงการฝ่ายกีฬา",
    value: ProjectType.SPORTS_AFFAIR,
  },
  {
    label: "13 - โครงการฝ่ายพัฒนาสังคมและบำเพ็ญประโยชน์",
    value: ProjectType.SOCIAL_SERVICE_AFFAIR,
  },
  {
    label: "14 - โครงการสวัสดิการนิสิตและสิ่งแวดล้อม",
    value: ProjectType.STUDENTS_WELFARE_ENV_AFFAIR,
  },
  {
    label: "20 - โครงการฝ่ายกิจการภายนอก",
    value: ProjectType.EXTERNAL_AFFAIR,
  },
  {
    label: "30 - โครงการฝ่ายนิสิตสัมพันธ์",
    value: ProjectType.NISITSUMPAN_AFFAIR,
  },
  {
    label: "40 - โครงการฝ่ายเทคโนโลยี",
    value: ProjectType.TECH_AFFAIR,
  },
  {
    label: "50 - โครงการฝ่ายพัฒนาองค์กร",
    value: ProjectType.ORGANIZATION_AFFAIR,
  },
  {
    label: "60 - โครงการฝ่ายประชาสัมพันธ์และการตลาด",
    value: ProjectType.PR_MARGETING_AFFAIR,
  },
  {
    label: "70 - โครงการฝ่ายวิชาการ",
    value: ProjectType.ACADEMICS_AFFAIR,
  },
  {
    label: "80 - โครงการอื่นๆของกวศ.",
    value: ProjectType.OTHER_ESC,
  },
  {
    label: "90 - โครงการฝ่ายสำนักงานและพัสดุ",
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
