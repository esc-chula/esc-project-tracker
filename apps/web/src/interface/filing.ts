import { FilingStatus } from "../constant/enum";

export interface Filing {
  id: string;
  project: any;
  user: any;
  name: string;
  FilingCode: string;
  status: FilingStatus;
  type: number;
  projectCode: string;
  createdAt: string;
  updatedAt: string;
}
