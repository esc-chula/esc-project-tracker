import { FilingSubType, ProjectStatus } from './enum';

export const ProjectStatusToThai = new Map([
  [ProjectStatus.CLOSED, 'ปิดโครงการเรียบร้อย'],
  [ProjectStatus.CONTINUE, 'กำลังดำเนินกิจกรรม'],
  [ProjectStatus.WAIT_FOR_CLOSE, 'รอปิดโครงการ'],
  [ProjectStatus.WAIT_FOR_APPROVE, 'รออนุมัติ'],
]);

export const TextFilingSubType = {
  // 1xxx - เอกสารขอใช้งานกายภาพ
  [FilingSubType.LOCATION_REQUEST]: 'ขอใช้สถานที่และอุปกรณ์',
  [FilingSubType.EQUIPMENT_REQUEST]: 'ขอใช้อุปกรณ์',
  [FilingSubType.PARKING_REQUEST]: 'ขอใช้ลานจอดรถ',
  [FilingSubType.TRAFFIC_REROUTE_REQUEST]: 'ขอเปลี่ยนเส้นทางจราจร',

  // 5xxx - เอกสารในโครงการ
  [FilingSubType.GENERAL_INTERNAL_LETTER]: 'จดหมายทั่วไปในคณะ',
  [FilingSubType.GENERAL_EXTERNAL_LETTER]: 'จดหมายทั่วไปนอกคณะ',
  [FilingSubType.SPEAKER_INVITATION_LETTER]: 'จดหมายเชิญวิทยากร',
  [FilingSubType.SPEAKER_GRATITUDE_LETTER]: 'จดหมายขอบคุณวิทยากร',
};
