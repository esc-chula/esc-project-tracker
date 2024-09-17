import { FilingStatus } from './enum';

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
    label: 'สร้างฉบับร่างแล้ว',
    value: FilingStatus.DOCUMENT_CREATED,
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
    label: 'เรียบร้อย',
    value: FilingStatus.APPROVED,
  },
];

export const typeFilingItems = [
  {
    label: 'ทุกประเภท',
    value: 'ALL',
  },
  {
    label: '0 - เอกสารขอเปิดโครงการ',
    value: '0',
  },
  {
    label:
      '1 - เอกสารขอใช้งานกายภาพ : ขอใช้สถานที่และอุปกรณ์ / ขอใช้อุปกรณ์ / ขอใช้ลานจอดรถ / ขอเปลี่ยนเส้นทางจารจร',
    value: '1',
  },
  {
    label: '2 - เอกสารขอยืมสำรองจ่าย',
    value: '2',
  },
  {
    label: '3 - เอกสารขอสปอนเซอร์',
    value: '3',
  },
  {
    label: '4 - เอกสารขอบคุณสปอนเซอร์',
    value: '4',
  },
  {
    label:
      '5 - เอกสารในโครงการ : จดหมายทั่วไปในคณะ / ทั่วไปนอกคณะ / เชิญวิทยากร / ขอบคุณวิทยากร',
    value: '5',
  },
  {
    label: '6 - เอกสารรายงานผลการดำเนินงาน (สรุปกิจกรรม)',
    value: '6',
  },
  {
    label: '7 - เอกสารขออนุมัติเบิกจ่าย (สรุปค่าใช้จ่าย)',
    value: '7',
  },
  {
    label: '8 - เอกสารขอเบิกเงิน',
    value: '8',
  },
  {
    label: '9 - เอกสารนอกโครงการ',
    value: '9',
  },
];
