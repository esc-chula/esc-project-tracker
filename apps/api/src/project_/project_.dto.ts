import { ProjectStatus, ProjectType } from '../constant/enum';
import { Project } from '../entities/project.entity';

export class ProjectWithLastOpenDTO {
  project: Project;
  lastOpen: Date;
}

export class createProjectDTO {
  name: string;
  type: ProjectType;
  detail?: string;
}

export class filterProjectDTO {
  // department?: string;
  // type?: ProjectType;
  status?: ProjectStatus;
}
