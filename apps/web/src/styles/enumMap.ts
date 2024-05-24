import { FillingStatus } from "@/src/constant/enum.ts";

export const buttonColors = {
  [FillingStatus.WAIT_FOR_STUDENT_AFFAIR]: "bg-[#49E66B] text-white",
  [FillingStatus.RETURNED]: "bg-[#C0C0C0] text-white",
  [FillingStatus.APPROVED]: "bg-pink text-red", // TODO: MUST BE DRAFT
  [FillingStatus.WAIT_FOR_SECRETARY]: "bg-[#ECC700] text-[#FBF2A0]",
};

export const TextMyProject = {
  [FillingStatus.APPROVED]: "เรียบร้อย...", // TODO แก้เป็น DRAFT
  [FillingStatus.RETURNED]: "เอกสารถูกตีกลับ",
  [FillingStatus.WAIT_FOR_SECRETARY]: "ส่งให้เลขาตรวจสอบ",
  [FillingStatus.WAIT_FOR_STUDENT_AFFAIR]: "ส่งให้กิจการนิสิตแล้ว",
};

//Filtering
// TODO แก้
export const filterStatus = [
  {
    label: "ทั้งหมด",
    value: "all",
  },
  /*{
    label: "ฉบับร่าง",
    value: "DRAFT",
  },*/
  {
    label: "เรียบร้อย.....",
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
