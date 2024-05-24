import { FillingStatus } from "../../../shared/constant/enum";

export interface FillingType {
  id: string;
  project: any;
  user: any;
  name: string;
  fillingCode: string;
  status: FillingStatus;
  projectCode: string;
  createdAt: string;
  updatedAt: string;
}
