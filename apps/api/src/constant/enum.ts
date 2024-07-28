//Filing
export enum FilingStatus {
  APPROVED = 'APPROVED',
  WAIT_FOR_STUDENT_AFFAIR = 'WAIT_FOR_STUDENT_AFFAIR',
  WAIT_FOR_SECRETARY = 'WAIT_FOR_SECRETARY',
  RETURNED = 'RETURNED',
  DRAFT = 'DRAFT',
  DOCUMENT_CREATED = 'DOCUMENT_CREATED',
}

//Document
export enum DocumentStatus {
  APPROVED = 'APPROVED',
  WAIT_FOR_STUDENT_AFFAIR = 'WAIT_FOR_STUDENT_AFFAIR',
  WAIT_FOR_SECRETARY = 'WAIT_FOR_SECRETARY',
  RETURNED = 'RETURNED',
  DRAFT = 'DRAFT',
}

export enum DocumentActivity {
  CREATE = 'CREATE', // User Only
  REPLY = 'REPLY', // Admin Only
  EDIT = 'EDIT', // Both
}

//Project
export enum ProjectStatus {
  CONTINUE = 'CONTINUE',
  WAIT_FOR_CLOSE = 'WAIT_FOR_CLOSE',
  CLOSED = 'CLOSED',
}

export enum ProjectType {
  INTERNAL_AFFAIR = '10', // กิจการภายใน
  ARTS_CULTURE_AFFAIR = '11', // ศิลปะและวัฒนธรรม
  SPORTS_AFFAIR = '12', // กีฬา
  SOCIAL_SERVICE_AFFAIR = '13', // พัฒนาสังคมและบำเพ็ญประโยชน์
  STUDENTS_WELFARE_ENV_AFFAIR = '14', // สวัสดิการนิสิตและสิ่งแวดล้อม
  EXTERNAL_AFFAIR = '20', // กิจการภายนอก
  NISITSUMPAN_AFFAIR = '30', // นิสิตสัมพันธ์
  TECH_AFFAIR = '40', //เทคโนโลยี
  ORGANIZATION_AFFAIR = '50', // พัฒนาองค์กร
  PR_MARGETING_AFFAIR = '60', // ประชาสัมพันธ์และการตลาด
  ACADEMICS_AFFAIR = '70', // วิชาการ
  OTHER_ESC = '80', // อื่นๆของกวศ
  OFFICE_SUPPLY_AFFAIR = '90', // สำนักงานและพัสดุ
}
