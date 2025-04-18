import type { ProjectStatus, ProjectType } from '@repo/shared';

export interface Project {
  id: string;
  name: string;
  projectCode: string;
  type: ProjectType;
  detail: string;
  reserveDate: string;
  status: ProjectStatus;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectWithLastOpen {
  project: Project;
  lastOpen: string;
  pinnedAt?: string;
}
