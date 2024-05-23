import { FillingStatus } from "@/src/constant/enum.ts";

export const buttonColors = {
  [FillingStatus.APPROVED]: "bg-[#49E66B] text-white",
  [FillingStatus.DRAFT]: "bg-[#C0C0C0] text-white",
  [FillingStatus.REJECTED]: "bg-pink text-red",
  [FillingStatus.SECRETARY]: "bg-[#FFD700] text-[#FBF2A0]",
};

export const TextMyProject = {
  [FillingStatus.APPROVED]: "ส่งให้กิจการนิสิตแล้ว",
  [FillingStatus.DRAFT]: "ฉบับร่าง",
  [FillingStatus.REJECTED]: "เอกสารถูกตีกลับ",
  [FillingStatus.SECRETARY]: "ส่งให้เลขาตรวจสอบ",
};
