import { FilingStatus } from "../constant/enum";

export interface FilingType {
  id: string;
  projectId: string;
  userId: string;
  name: string;
  FilingCode: string;
  status: FilingStatus;
  type: number;
  projectCode: string;
  createdAt: string;
  updatedAt: string;
}
