import { ProjectStatus } from '../constant/enum';

export class createProjectDTO {
  name: string;

  code: string;

  type: number;

  detail: string;

  reserveDate: Date;

  status: ProjectStatus;
}
