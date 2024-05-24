import { FillingStatus } from "../constant/enum";

export interface FillingType {
  id: string;
  project: any;
  user: any;
  name: string;
  fillingCode: string;
  status: FillingStatus;
  type: number;
  projectCode: string;
  createdAt: string;
  updatedAt: string;
}
