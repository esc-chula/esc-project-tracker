import { FilingStatus } from "@/src/constant/enum.ts";

export const buttonColors = {
  [FilingStatus.WAIT_FOR_STUDENT_AFFAIR]: "bg-[#49E66B] text-white",
  [FilingStatus.RETURNED]: "bg-pink text-red",
  [FilingStatus.APPROVED]: "bg-[#49E66B] text-white",
  [FilingStatus.WAIT_FOR_SECRETARY]: "bg-[#ECC700] text-[#FBF2A0]",
  [FilingStatus.DRAFT]: "bg-[#C0C0C0] text-white",
};

export const TextMyProject = {
  [FilingStatus.APPROVED]: "เรียบร้อย",
  [FilingStatus.RETURNED]: "เอกสารถูกตีกลับ",
  [FilingStatus.WAIT_FOR_SECRETARY]: "ส่งให้เลขาตรวจสอบ",
  [FilingStatus.WAIT_FOR_STUDENT_AFFAIR]: "ส่งให้กิจการนิสิตแล้ว",
  [FilingStatus.DRAFT]: "ฉบับร่าง",
};

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
    value: "REJECTED",
  },
];

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
];
