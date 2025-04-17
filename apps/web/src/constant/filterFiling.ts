import { FilingStatus, FilingSubType } from '@repo/shared';

// DOCUMENT_CREATED is no longer used
export const statusFilingItems = [
  {
    label: 'ทุกสถานะ',
    value: 'ALL',
  },
  {
    label: 'ฉบับร่าง',
    value: FilingStatus.DRAFT,
  },
  {
    label: 'ส่งให้เลขาตรวจสอบ',
    value: FilingStatus.WAIT_FOR_SECRETARY,
  },
  {
    label: 'เอกสารถูกตีกลับ',
    value: FilingStatus.RETURNED,
  },
  {
    label: 'ส่งให้กิจการนิสิตแล้ว',
    value: FilingStatus.WAIT_FOR_STUDENT_AFFAIR,
  },
  {
    label: 'เอกสารอนุมัติแล้ว',
    value: FilingStatus.APPROVED,
  },
];

export const typeFilingItems = [
  {
    label: 'ทุกประเภท',
    value: 'ALL',
  },
  {
    label: '0xxx - เอกสารขอเปิดโครงการ',
    value: '0',
  },
  {
    label:
      '1xxx - เอกสารขอใช้งานกายภาพ : ขอใช้สถานที่และอุปกรณ์ / ขอใช้อุปกรณ์ / ขอใช้ลานจอดรถ / ขอเปลี่ยนเส้นทางจารจร',
    value: '1',
  },
  {
    label: '2xxx - เอกสารขอยืมสำรองจ่าย',
    value: '2',
  },
  {
    label: '3xxx - เอกสารขอสปอนเซอร์',
    value: '3',
  },
  {
    label: '4xxx - เอกสารขอบคุณสปอนเซอร์',
    value: '4',
  },
  {
    label:
      '5xxx - เอกสารในโครงการ : จดหมายทั่วไปในคณะ / ทั่วไปนอกคณะ / เชิญวิทยากร / ขอบคุณวิทยากร',
    value: '5',
  },
  {
    label: '6xxx - เอกสารรายงานผลการดำเนินงาน (สรุปกิจกรรม)',
    value: '6',
  },
  {
    label: '7xxx - เอกสารขออนุมัติเบิกจ่าย (สรุปค่าใช้จ่าย)',
    value: '7',
  },
  {
    label: '8xxx - เอกสารขอเบิกเงิน',
    value: '8',
  },
  {
    label: '9xxx - เอกสารนอกโครงการ',
    value: '9',
  },
];

export const typeFilingItemsV2 = [
  {
    label: '0xxx - เอกสารขอเปิดโครงการ',
    value: '0',
  },
  {
    label: '1xxx - เอกสารขอใช้งานกายภาพ : ขอใช้สถานที่และอุปกรณ์',
    value: `1-${FilingSubType.LOCATION_REQUEST}`,
  },
  {
    label: '1xxx - เอกสารขอใช้งานกายภาพ : ขอใช้อุปกรณ์',
    value: `1-${FilingSubType.EQUIPMENT_REQUEST}`,
  },
  {
    label: '1xxx - เอกสารขอใช้งานกายภาพ : ขอใช้ลานจอดรถ',
    value: `1-${FilingSubType.PARKING_REQUEST}`,
  },
  {
    label: '1xxx - เอกสารขอใช้งานกายภาพ : ขอเปลี่ยนเส้นทางจราจร',
    value: `1-${FilingSubType.TRAFFIC_REROUTE_REQUEST}`,
  },
  {
    label: '2xxx - เอกสารขอยืมสำรองจ่าย',
    value: '2',
  },
  {
    label: '3xxx - เอกสารขอสปอนเซอร์',
    value: '3',
  },
  {
    label: '4xxx - เอกสารขอบคุณสปอนเซอร์',
    value: '4',
  },
  {
    label: '5xxx - เอกสารในโครงการ : จดหมายทั่วไปในคณะ',
    value: `5-${FilingSubType.GENERAL_INTERNAL_LETTER}`,
  },
  {
    label: '5xxx - เอกสารในโครงการ : จดหมายทั่วไปนอกคณะ',
    value: `5-${FilingSubType.GENERAL_EXTERNAL_LETTER}`,
  },
  {
    label: '5xxx - เอกสารในโครงการ : จดหมายเชิญวิทยากร',
    value: `5-${FilingSubType.SPEAKER_INVITATION_LETTER}`,
  },
  {
    label: '5xxx - เอกสารในโครงการ : จดหมายขอบคุณวิทยากร',
    value: `5-${FilingSubType.SPEAKER_GRATITUDE_LETTER}`,
  },
  {
    label: '6xxx - เอกสารรายงานผลการดำเนินงาน (สรุปกิจกรรม)',
    value: '6',
  },
  {
    label: '7xxx - เอกสารขออนุมัติเบิกจ่าย (สรุปค่าใช้จ่าย)',
    value: '7',
  },
  {
    label: '8xxx - เอกสารขอเบิกเงิน',
    value: '8',
  },
  {
    label: '9xxx - เอกสารนอกโครงการ',
    value: '9',
  },
];
