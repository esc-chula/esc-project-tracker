import type { ProjectStatus, ProjectType } from "../constant/enum";

export interface Project {
  id: string;
  name: string;
  projectCode: string;
  type: ProjectType;
  detail: string;
  reserveDate: string;
  status: ProjectStatus;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectWithLastOpen {
  project: Project;
  lastOpen: string;
}
