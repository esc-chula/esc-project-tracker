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
