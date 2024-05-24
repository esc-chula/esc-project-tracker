import { FillingStatus } from "@/src/constant/enum.ts";

export const buttonColors = {
  [FillingStatus.APPROVED]: "bg-[#49E66B] text-white",
  [FillingStatus.RETURNED]: "bg-[#C0C0C0] text-white",
  [FillingStatus.WAIT_FOR_SECRETARY]: "bg-pink text-red",
  [FillingStatus.WAIT_FOR_STUDENT_AFFAIR]: "bg-[#FFD700] text-[#FBF2A0]",
};

export const TextMyProject = {
  [FillingStatus.APPROVED]: "ส่งให้กิจการนิสิตแล้ว",
  [FillingStatus.RETURNED]: "ฉบับร่าง",
  [FillingStatus.WAIT_FOR_SECRETARY]: "เอกสารถูกตีกลับ",
  [FillingStatus.WAIT_FOR_STUDENT_AFFAIR]: "ส่งให้เลขาตรวจสอบ",
};

//Filtering
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
    label: "ส่งให้เลขาตรวจสอบ",
    value: "SECRETARY",
  },
  {
    label: "ส่งให้กิจการนิสิตแล้ว",
    value: "APPROVED",
  },
  {
    label: "เอกสารถูกตีกลับ",
    value: "REJECTED",
  },
];
