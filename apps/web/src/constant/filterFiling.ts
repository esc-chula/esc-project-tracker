import { FilingStatus } from "./enum";

export const statusFilingItems = [
  {
    label: "สถานะ",
    value: "ALL",
  },
  {
    label: "APPROVED",
    value: FilingStatus.APPROVED,
  },
  {
    label: "DRAFT",
    value: FilingStatus.DRAFT,
  },
  {
    label: "RETURNED",
    value: FilingStatus.RETURNED,
  },
  {
    label: "WAIT_FOR_SECRETARY",
    value: FilingStatus.WAIT_FOR_SECRETARY,
  },
  {
    label: "WAIT_FOR_STUDENT_AFFAIR",
    value: FilingStatus.WAIT_FOR_STUDENT_AFFAIR,
  },
];

export const typeFilingItems = [
  {
    label: "ประเภท",
    value: "ALL",
  },
  {
    label: "เอกสารขอเปิดโครงการ",
    value: "0",
  },
  {
    label:
      "เอกสารขอใช้งานกายภาพ : ขอใช้สถานที่และอุปกรณ์ / ขอใช้อุปกรณ์ / ขอใช้ลานจอดรถ / ขอเปลี่ยนเส้นทางจารจร",
    value: "1",
  },
  {
    label: "เอกสารขอยืมสำรองจ่าย",
    value: "2",
  },
  {
    label: "เอกสารขอสปอนเซอร์",
    value: "3",
  },
  {
    label: "เอกสารขอบคุณสปอนเซอร์",
    value: "4",
  },
  {
    label:
      "เอกสารในโครงการ : จดหมายทั่วไปในคณะ / ทั่วไปนอกคณะ / เชิญวิทยากร / ขอบคุณวิทยากร",
    value: "5",
  },
  {
    label: "เอกสารรายงานผลการดำเนินงาน (สรุปกิจกรรม)",
    value: "6",
  },
  {
    label: "เอกสารขออนุมัติเบิกจ่าย (สรุปค่าใช้จ่าย)",
    value: "7",
  },
  {
    label: "เอกสารขอเบิกเงิน",
    value: "8",
  },
  {
    label: "เอกสารนอกโครงการ",
    value: "9",
  },
];
