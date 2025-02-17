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

export enum ProjectStatus {
  CONTINUE = 'CONTINUE',
  WAIT_FOR_CLOSE = 'WAIT_FOR_CLOSE',
  CLOSED = 'CLOSED',
  CLOSING = 'CLOSING',
  WAIT_FOR_APPROVE = 'WAIT_FOR_APPROVE',
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

export enum ObjectiveType {
  KNOWLEDGE_BROAD = 'มีความรู้: รู้รอบ',
  KNOWLEDGE_DEEP = 'มีความรู้: รู้ลึก',
  ETHICS_PROFESSIONALISM = 'มีคุณธรรม: มีจรรยาบรรณ',
  ETHICS_MORALITY = 'มีคุณธรรม: มีคุณธรรมและจริยธรรม',
  CRITICAL_THINKING_CREATIVITY = 'คิดเป็น: สามารถคิดริเริ่มสร้างสรรค์',
  CRITICAL_THINKING_ANALYTICAL = 'คิดเป็น: สามารถคิดอย่างมีวิจารณญาณ',
  CRITICAL_THINKING_PROBLEM_SOLVING = 'คิดเป็น: มีทักษะในการคิดแก้ปัญหา',
  SKILL_INFORMATION_TECHNOLOGY = 'ทำเป็น: มีทักษะทางเทคโนโลยีสารสนเทศ',
  SKILL_MATH_STATS = 'ทำเป็น: มีทักษะทางคณิตศาสตร์และสถิติ',
  SKILL_PROFESSIONAL_SKILLS = 'ทำเป็น: มีทักษะทางวิชาชีพ',
  COMMUNICATION_SKILLS = 'ทำเป็น: มีทักษะทางการสื่อสาร',
  MANAGEMENT_SKILLS = 'ทำเป็น: มีทักษะการบริหารจัดการ',
  LIFELONG_LEARNING_CURIOSITY = 'ใฝ่รู้และรู้จักวิธีการเรียนรู้: ใฝ่รู้',
  LIFELONG_LEARNING_METHODS = 'ใฝ่รู้และรู้จักวิธีการเรียนรู้: รู้จักวิธีการเรียนรู้',
  LEADERSHIP = 'มีภาวะผู้นำ',
  HEALTH_WELLBEING = 'มีสุขภาวะ',
  VOLUNTEERISM_PUBLIC_AWARENESS = 'มีจิตอาสาและสำนึกสาธารณะ',
  THAI_IDENTITY_GLOBALIZATION = 'ดำรงความเป็นไทยในกระแสโลกาภิวัฒน์',
}

export enum ActivityType {
  ACADEMIC_GRADUATE_ATTRIBUTES = 'กิจกรรมวิชาการที่ส่งเสริมคุณลักษณะบัณฑิตที่พึงประสงค์',
  SPORTS_HEALTH = 'กิจกรรมกีฬาหรือการส่งเสริมสุขภาพ',
  VOLUNTEERING_ENVIRONMENT = 'กิจกรรมบำเพ็ญประโยชน์และรักษาสิ่งแวดล้อม',
  CULTURAL_ARTS = 'กิจกรรมส่งเสริมศิลปวัฒนธรรม',
  ETHICS_MORALITY = 'กิจกรรมเสริมสร้างคุณธรรมและจริยธรรม',
}

export enum GraduateAttribute {
  KNOWLEDGE = 'Knowledge',
  ETHICS = 'Ethics',
  CRITICAL_THINKING = 'Critical Thinking',
  SKILL = 'Skill',
  LEADERSHIP = 'Leadership',
  HEALTH = 'Health',
  VOLUNTEER = 'Volunteer',
  THAI_IDENTITY = 'Thai Identity',
}