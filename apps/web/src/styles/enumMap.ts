import { FilingStatus, ProjectStatus } from '@repo/shared';

export const buttonColors = {
  [FilingStatus.WAIT_FOR_STUDENT_AFFAIR]: 'bg-accepted text-white',
  [FilingStatus.RETURNED]: 'bg-pink text-red',
  [FilingStatus.APPROVED]: 'bg-accepted text-white',
  [FilingStatus.WAIT_FOR_SECRETARY]: 'bg-pending text-[#FBF2A0]',
  [FilingStatus.DRAFT]: 'bg-draft text-white',
  [FilingStatus.DOCUMENT_CREATED]: 'bg-draft text-white',
};

export const textColors = {
  [FilingStatus.WAIT_FOR_STUDENT_AFFAIR]: 'text-accepted',
  [FilingStatus.RETURNED]: 'text-pink',
  [FilingStatus.APPROVED]: 'text-accepted',
  [FilingStatus.WAIT_FOR_SECRETARY]: 'text-pending',
  [FilingStatus.DRAFT]: 'text-draft',
  [FilingStatus.DOCUMENT_CREATED]: 'text-draft',
};

export const TextMyProject = {
  [FilingStatus.APPROVED]: 'เรียบร้อย',
  [FilingStatus.RETURNED]: 'เอกสารถูกตีกลับ',
  [FilingStatus.WAIT_FOR_SECRETARY]: 'ส่งให้เลขาตรวจสอบ',
  [FilingStatus.WAIT_FOR_STUDENT_AFFAIR]: 'ส่งให้กิจการนิสิตแล้ว',
  [FilingStatus.DRAFT]: 'ฉบับร่าง',
  [FilingStatus.DOCUMENT_CREATED]: 'สร้างฉบับร่างแล้ว',
};

export const TextMyFilingStatus = {
  [FilingStatus.APPROVED]: 'อนุมัติ',
  [FilingStatus.RETURNED]: 'ตีกลับ',
  [FilingStatus.WAIT_FOR_SECRETARY]: 'เลขาตรวจสอบ',
  [FilingStatus.WAIT_FOR_STUDENT_AFFAIR]: 'ส่งให้กิจการนิสิต',
  [FilingStatus.DRAFT]: 'ฉบับร่าง',
  [FilingStatus.DOCUMENT_CREATED]: 'สร้างฉบับร่างแล้ว',
};

export const TextDocumentActivity = {
  CREATE: 'สร้างเอกสาร',
  EDIT: 'แก้ไขเอกสาร',
  REPLY: 'ตอบกลับ',
};

export const FilingStatusToStepper = {
  LOADING: [
    ['disabled', 'disabled'],
    ['disabled', 'disabled'],
    ['disabled', 'disabled'],
    ['disabled', 'disabled'],
    ['disabled'],
  ],
  DEFAULT: [
    ['rejected', 'rejected'],
    ['rejected', 'rejected'],
    ['rejected', 'rejected'],
    ['rejected', 'rejected'],
    ['rejected'],
  ],
  [FilingStatus.APPROVED]: [
    ['accepted', 'accepted'],
    ['accepted', 'accepted'],
    ['accepted', 'accepted'],
    ['accepted', 'accepted'],
    ['accepted'],
  ],
  [FilingStatus.DRAFT]: [
    ['accepted', 'disabled'],
    ['disabled', 'disabled'],
    ['disabled', 'disabled'],
    ['disabled', 'disabled'],
    ['disabled'],
  ],
  [FilingStatus.DOCUMENT_CREATED]: [
    ['accepted', 'accepted'],
    ['disabled', 'disabled'],
    ['disabled', 'disabled'],
    ['disabled', 'disabled'],
    ['disabled'],
  ],
  [FilingStatus.RETURNED]: [
    ['accepted', 'rejected'],
    ['rejected', 'disabled'],
    ['disabled', 'disabled'],
    ['disabled', 'disabled'],
    ['disabled'],
  ],
  [FilingStatus.WAIT_FOR_SECRETARY]: [
    ['accepted', 'pending'],
    ['pending', 'disabled'],
    ['disabled', 'disabled'],
    ['disabled', 'disabled'],
    ['disabled'],
  ],
  [FilingStatus.WAIT_FOR_STUDENT_AFFAIR]: [
    ['accepted', 'accepted'],
    ['accepted', 'accepted'],
    ['accepted', 'pending'],
    ['pending', 'disabled'],
    ['disabled'],
  ],
};

//Filing
export const filterStatus = [
  {
    label: 'ฉบับร่าง',
    value: 'DRAFT',
  },
  {
    label: 'เรียบร้อย',
    value: 'APPROVED',
  },
  {
    label: 'ส่งให้เลขาตรวจสอบ',
    value: 'WAIT_FOR_SECRETARY',
  },
  {
    label: 'ส่งให้กิจการนิสิตแล้ว',
    value: 'WAIT_FOR_STUDENT_AFFAIR',
  },
  {
    label: 'เอกสารถูกตีกลับ',
    value: 'RETURNED',
  },
];

// Project
export const filterProjectStatus = [
  {
    label: 'กำลังดำเนินกิจกรรม',
    value: ProjectStatus.CONTINUE,
  },
  {
    label: 'รอปิดโครงการ',
    value: ProjectStatus.WAIT_FOR_CLOSE,
  },
  {
    label: 'กำลังปิดโครงการ',
    value: ProjectStatus.CLOSING,
  },
  {
    label: 'ปิดโครงการเรียบร้อย',
    value: ProjectStatus.CLOSED,
  },
  {
    label: 'รออนุมัติ',
    value: ProjectStatus.WAIT_FOR_APPROVE,
  },
];
