import { ProjectStatus, ProjectType } from "./enum";

export const statusProjectItems = [
  {
    label: "CONTINUE",
    value: ProjectStatus.CONTINUE,
  },
  {
    label: "CLOSED",
    value: ProjectStatus.CLOSED,
  },
  {
    label: "WAIT_FOR_CLOSE",
    value: ProjectStatus.WAIT_FOR_CLOSE,
  },
];

export const departmentProjectItems = [
  {
    label: "โครงการฝ่ายกิจการภายใน",
    value: ProjectType.INTERNAL_AFFAIR,
  },
  {
    label: "โครงการฝ่ายศิลปะและวัฒนธรรม",
    value: ProjectType.ARTS_CULTURE_AFFAIR,
  },
  {
    label: "โครงการฝ่ายกีฬา",
    value: ProjectType.SPORTS_AFFAIR,
  },
  {
    label: "โครงการฝ่ายพัฒนาสังคมและบำเพ็ญประโยชน์",
    value: ProjectType.SOCIAL_SERVICE_AFFAIR,
  },
  {
    label: "โครงการสวัสดิการนิสิตและสิ่งแวดล้อม",
    value: ProjectType.STUDENTS_WELFARE_ENV_AFFAIR,
  },
  {
    label: "โครงการฝ่ายกิจการภายนอก",
    value: ProjectType.EXTERNAL_AFFAIR,
  },
  {
    label: "โครงการฝ่ายนิสิตสัมพันธ์",
    value: ProjectType.NISITSUMPAN_AFFAIR,
  },
  {
    label: "โครงการฝ่ายเทคโนโลยี",
    value: ProjectType.TECH_AFFAIR,
  },
  {
    label: "โครงการฝ่ายพัฒนาองค์กร",
    value: ProjectType.ORGANIZATION_AFFAIR,
  },
  {
    label: "โครงการฝ่ายประชาสัมพันธ์และการตลาด",
    value: ProjectType.PR_MARGETING_AFFAIR,
  },
  {
    label: "โครงการฝ่ายวิชาการ",
    value: ProjectType.ACADEMICS_AFFAIR,
  },
  {
    label: "โครงการอื่นๆของกวศ.",
    value: ProjectType.OTHER_ESC,
  },
  {
    label: "โครงการฝ่ายสำนักงานและพัสดุ",
    value: ProjectType.OFFICE_SUPPLY_AFFAIR,
  },
];
