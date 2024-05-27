import { Project } from '../entities/project.entity';

export class ProjectWithLastOpenDTO {
  project: Project;
  lastOpen: Date;
}
