import { ProjectStatus } from './enum';
import { projectTypeMap } from './map';

export const statusProjectItems = [
  {
    label: 'สถานะ',
    value: 'ALL',
  },
  {
    label: 'กำลังดำเนินกิจกรรม',
    value: ProjectStatus.CONTINUE,
  },
  {
    label: 'ปิดโครงการเรียบร้อย',
    value: ProjectStatus.CLOSED,
  },
  {
    label: 'รอปิดโครงการ',
    value: ProjectStatus.WAIT_FOR_CLOSE,
  },
];

export const departmentProjectItems = [
  {
    label: 'ฝ่าย',
    value: 'ALL',
  },
  ...projectTypeMap,
];
