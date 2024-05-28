import { FilingStatus } from "@/src/constant/enum.ts"

export const buttonColors = {
  [FilingStatus.WAIT_FOR_STUDENT_AFFAIR]: "bg-[#49E66B] text-white",
  [FilingStatus.RETURNED]: "bg-pink text-red",
  [FilingStatus.APPROVED]: "bg-[#49E66B] text-white",
  [FilingStatus.WAIT_FOR_SECRETARY]: "bg-[#ECC700] text-[#FBF2A0]",
  [FilingStatus.DRAFT]: "bg-[#C0C0C0] text-white",
}

export const TextMyProject = {
  [FilingStatus.APPROVED]: "เรียบร้อย",
  [FilingStatus.RETURNED]: "เอกสารถูกตีกลับ",
  [FilingStatus.WAIT_FOR_SECRETARY]: "ส่งให้เลขาตรวจสอบ",
  [FilingStatus.WAIT_FOR_STUDENT_AFFAIR]: "ส่งให้กิจการนิสิตแล้ว",
  [FilingStatus.DRAFT]: "ฉบับร่าง",
}

//Filing
export const filterStatus = [
  {
    label: "ทั้งหมด",
    value: "all",
  },
  {
    label: "ฉบับร่าง",
    value: "DRAFT",
  },
  {
    label: "เรียบร้อย",
    value: "APPROVED",
  },
  {
    label: "ส่งให้เลขาตรวจสอบ",
    value: "WAIT_FOR_SECRETARY",
  },
  {
    label: "ส่งให้กิจการนิสิตแล้ว",
    value: "WAIT_FOR_STUDENT_AFFAIR",
  },
  {
    label: "เอกสารถูกตีกลับ",
    value: "REJECTED",
  },
]

export const filterType = [
  {
    label: "ทั้งหมด",
    value: "11",
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
    label: "เอกสารในโครงการ : จดหมายทั่วไปในคณะ / ทั่วไปนอกคณะ / เชิญวิทยากร / ขอบคุณวิทยากร",
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
]

// PROJECt
export const filterProjectStatus = [
  {
    label: "ทั้งหมด",
    value: "all",
  },
  {
    label: "กำลังดำเนินการ",
    value: "CONTINUE",
  },
  {
    label: "รอปิดโครงการ",
    value: "WAIT_FOR_CLOSE",
  },
  {
    label: "ปิดโครงการ",
    value: "CLOSED",
  },
]

export const filterProjectType = [
  {
    label: "ทั้งหมด",
    value: "0",
  },
  {
    label: "โครงการฝ่ายกิจการภายใน",
    value: "10",
  },
  {
    label: "โครงการฝ่ายศิลปะและวัฒนธรรม",
    value: "11",
  },
  {
    label: "โครงการฝ่ายกีฬา",
    value: "12",
  },
  {
    label: "โครงการฝ่ายกิจการภายนอก",
    value: "20",
  },
  {
    label: "โครงการฝ่ายนิสิตสัมพันธ์",
    value: "30",
  },
  {
    label: "โครงการฝ่ายพัฒนาสังคมและบำเพ็ญประโยชน์",
    value: "40",
  },
  {
    label: "โครงการฝ่ายพัฒนาองค์กร",
    value: "50",
  },
  {
    label: "โครงการฝ่ายสนับสนุน",
    value: "60",
  },
  {
    label: "โครงการฝ่ายสื่อสารองค์กร",
    value: "70",
  },
  {
    label: "โครงการอื่น ๆ ของกวศ.",
    value: "80",
  },
  {
    label: "โครงการฝ่ายวิชาการ",
    value: "90",
  },
]
