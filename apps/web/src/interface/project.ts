import { ProjectStatus } from "../constant/enum";

export interface ProjectType {
  id: string;
  name: string;
  projectCode: string;
  type: number;
  detail: string;
  reserveDate: string;
  status: ProjectStatus;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectWithLastOpenType {
  project: ProjectType;
  lastOpen: string;
}
