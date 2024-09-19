import { FilingStatus } from "@/src/constant/enum.ts"

export const buttonColors = {
  [FilingStatus.WAIT_FOR_STUDENT_AFFAIR]: "bg-accepted text-white",
  [FilingStatus.RETURNED]: "bg-pink text-red",
  [FilingStatus.APPROVED]: "bg-accepted text-white",
  [FilingStatus.WAIT_FOR_SECRETARY]: "bg-[#ECC700] text-[#FBF2A0]",
  [FilingStatus.DRAFT]: "bg-[#C0C0C0] text-white",
  [FilingStatus.DOCUMENT_CREATED]: "bg-[#C0C0C0] text-white",
}

export const TextMyProject = {
  [FilingStatus.APPROVED]: "เรียบร้อย",
  [FilingStatus.RETURNED]: "เอกสารถูกตีกลับ",
  [FilingStatus.WAIT_FOR_SECRETARY]: "ส่งให้เลขาตรวจสอบ",
  [FilingStatus.WAIT_FOR_STUDENT_AFFAIR]: "ส่งให้กิจการนิสิตแล้ว",
  [FilingStatus.DRAFT]: "ฉบับร่าง",
  [FilingStatus.DOCUMENT_CREATED]: "สร้างฉบับร่างแล้ว",
}

export const TextMyFilingStatus = {
  [FilingStatus.APPROVED]: "อนุมัติ",
  [FilingStatus.RETURNED]: "ตีกลับ",
  [FilingStatus.WAIT_FOR_SECRETARY]: "เลขาตรวจสอบ",
  [FilingStatus.WAIT_FOR_STUDENT_AFFAIR]: "ส่งให้กิจการนิสิต",
  [FilingStatus.DRAFT]: "ฉบับร่าง",
  [FilingStatus.DOCUMENT_CREATED]: "สร้างฉบับร่างแล้ว",
}

export const TextDocumentActivity = {
  CREATE: "สร้างเอกสาร",
  EDIT: "แก้ไขเอกสาร",
  REPLY: "ตอบกลับ",
}

export const FilingStatusToStepper = {
  LOADING: [
    ["disabled", "disabled"],
    ["disabled", "disabled"],
    ["disabled", "disabled"],
    ["disabled", "disabled"],
    ["disabled"],
  ],
  DEFAULT: [
    ["rejected", "rejected"],
    ["rejected", "rejected"],
    ["rejected", "rejected"],
    ["rejected", "rejected"],
    ["rejected"],
  ],
  [FilingStatus.APPROVED]: [
    ["accepted", "accepted"],
    ["accepted", "accepted"],
    ["accepted", "accepted"],
    ["accepted", "accepted"],
    ["accepted"],
  ],
  [FilingStatus.DRAFT]: [
    ["accepted", "disabled"],
    ["disabled", "disabled"],
    ["disabled", "disabled"],
    ["disabled", "disabled"],
    ["disabled"],
  ],
  [FilingStatus.DOCUMENT_CREATED]: [
    ["accepted", "accepted"],
    ["accepted", "disabled"],
    ["disabled", "disabled"],
    ["disabled", "disabled"],
    ["disabled"],
  ],
  [FilingStatus.RETURNED]: [
    ["accepted", "accepted"],
    ["accepted", "rejected"],
    ["rejected", "disabled"],
    ["disabled", "disabled"],
    ["disabled"],
  ],
  [FilingStatus.WAIT_FOR_SECRETARY]: [
    ["accepted", "accepted"],
    ["accepted", "pending"],
    ["pending", "disabled"],
    ["disabled", "disabled"],
    ["disabled"],
  ],
  [FilingStatus.WAIT_FOR_STUDENT_AFFAIR]: [
    ["accepted", "accepted"],
    ["accepted", "accepted"],
    ["accepted", "accepted"],
    ["accepted", "pending"],
    ["pending"],
  ],
}

//Filing
export const filterStatus = [
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
    value: "RETURNED",
  },
]

// PROJECt
export const filterProjectStatus = [
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
