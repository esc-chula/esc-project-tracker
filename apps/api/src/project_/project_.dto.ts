import { ProjectType } from '@repo/shared';
import { Project } from '../entities/project.entity';

export class ProjectWithLastOpenDTO {
  project: Project;
  lastOpen: Date;
  pinnedAt: Date;
}

export class createProjectDTO {
  name: string;
  type: ProjectType;
  detail?: string;
  owner: string;
}
