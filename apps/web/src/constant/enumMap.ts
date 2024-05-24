import { FillingStatus } from "@/src/constant/enum.ts"

export const buttonColors = {
  [FillingStatus.APPROVED]: "bg-[#49E66B] text-white",
  [FillingStatus.DRAFT]: "bg-[#C0C0C0] text-white",
  [FillingStatus.REJECTED]: "bg-pink text-red",
  [FillingStatus.SECRETARY]: "bg-[#FFD700] text-[#FBF2A0]",
}

export const TextMyProject = {
  [FillingStatus.APPROVED]: "ส่งให้กิจการนิสิตแล้ว",
  [FillingStatus.DRAFT]: "ฉบับร่าง",
  [FillingStatus.REJECTED]: "เอกสารถูกตีกลับ",
  [FillingStatus.SECRETARY]: "ส่งให้เลขาตรวจสอบ",
}

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
]

export const FillingStatusToStepper = {
  [FillingStatus.APPROVED]: [
    ["accepted", "accepted"],
    ["accepted", "accepted"],
    ["accepted", "accepted"],
    ["accepted", "accepted"],
    ["accepted"],
  ],
  [FillingStatus.DRAFT]: [
    ["accepted", "accepted"],
    ["accepted", "disabled"],
    ["disabled", "disabled"],
    ["disabled", "disabled"],
    ["disabled"],
  ],
  [FillingStatus.REJECTED]: [
    ["accepted", "accepted"],
    ["accepted", "rejected"],
    ["rejected", "disabled"],
    ["disabled", "disabled"],
    ["disabled"],
  ],
  [FillingStatus.SECRETARY]: [
    ["accepted", "accepted"],
    ["accepted", "pending"],
    ["pending", "disabled"],
    ["disabled", "disabled"],
    ["disabled"],
  ],
}
