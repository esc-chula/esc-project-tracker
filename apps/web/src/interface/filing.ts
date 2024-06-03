import { FilingStatus } from "../constant/enum";
import { ProjectType } from "./project";

export interface FilingType {
  id: string;
  project: ProjectType;
  user: UserType;
  name: string;
  FilingCode: string;
  status: FilingStatus;
  type: number;
  projectCode: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserType {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  username: string;
  studentId: string;
  password: string;
}
