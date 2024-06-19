import { FilingStatus } from "../constant/enum";
import { Project } from "./project";

export interface FilingType {
  id: string;
  project: Project;
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
