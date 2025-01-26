import { ProjectStatus } from './enum';

export const ProjectStatusToThai = new Map([
  [ProjectStatus.CLOSED, 'ปิดโครงการเรียบร้อย'],
  [ProjectStatus.CONTINUE, 'กำลังดำเนินกิจกรรม'],
  [ProjectStatus.WAIT_FOR_CLOSE, 'รอปิดโครงการ'],
  [ProjectStatus.WAIT_FOR_APPROVE, 'รออนุมัติ'],
]);
