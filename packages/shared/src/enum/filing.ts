export enum FilingStatus {
  APPROVED = 'APPROVED',
  WAIT_FOR_STUDENT_AFFAIR = 'WAIT_FOR_STUDENT_AFFAIR',
  WAIT_FOR_SECRETARY = 'WAIT_FOR_SECRETARY',
  RETURNED = 'RETURNED',
  DRAFT = 'DRAFT',
  DOCUMENT_CREATED = 'DOCUMENT_CREATED',
}

export enum FilingSubType {
  // 1xxx - เอกสารขอใช้งานกายภาพ
  LOCATION_REQUEST = 'LOCATION_REQUEST', // ขอใช้สถานที่และอุปกรณ์
  EQUIPMENT_REQUEST = 'EQUIPMENT_REQUEST', // ขอใช้อุปกรณ์
  PARKING_REQUEST = 'PARKING_REQUEST', // ขอใช้ลานจอดรถ
  TRAFFIC_REROUTE_REQUEST = 'TRAFFIC_REROUTE_REQUEST', // ขอเปลี่ยนเส้นทางจราจร

  // 5xxx - เอกสารในโครงการ
  GENERAL_INTERNAL_LETTER = 'GENERAL_INTERNAL_LETTER', // จดหมายทั่วไปในคณะ
  GENERAL_EXTERNAL_LETTER = 'GENERAL_EXTERNAL_LETTER', // จดหมายทั่วไปนอกคณะ
  SPEAKER_INVITATION_LETTER = 'SPEAKER_INVITATION_LETTER', // จดหมายเชิญวิทยากร
  SPEAKER_GRATITUDE_LETTER = 'SPEAKER_GRATITUDE_LETTER', // จดหมายขอบคุณวิทยากร
}

export enum FilingType {
  PROJECT_OPENING = '0', // เอกสารเปิดโครงการ
  FACILITY_REQUEST = '1', // เอกสารขอใช้งานกายภาพ
  ADVANCE_PAYMENT = '2', // เอกสารขอยืมสำรองจ่าย
  SPONSOR_REQUEST = '3', // เอกสารขอสปอนเซอร์
  SPONSOR_THANK_YOU = '4', // เอกสารขอบคุณสปอนเซอร์
  PROJECT_DOCUMENT = '5', // เอกสารในโครงการ
  ACTIVITY_REPORT = '6', // เอกสารรายงานผลการดำเนินงาน (สรุปกิจกรรม)
  EXPENSE_APPROVAL = '7', // เอกสารขออนุมัติเบิกจ่าย (สรุปค่าใช้จ่าย)
  PAYMENT_REQUEST = '8', // เอกสารขอเบิกเงิน
  EXTERNAL_DOCUMENT = '9', // เอกสารนอกโครงการ
}
