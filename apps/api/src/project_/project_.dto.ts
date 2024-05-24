import { ProjectStatus } from '../constant/enum';

export class createProjectDTO {
  name: string;

  code: string;

  type: number;

  detail: string;

  reserDate: Date;

  status: ProjectStatus;
}
