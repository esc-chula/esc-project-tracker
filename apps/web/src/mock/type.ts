import { FillingStatus } from "../constant/enum";

export interface MockProject {
  id: string;
  code: string;
  name: string;
  type: string;
  status: string;
  objectType: string;
  createdAt: string;
  updatedAt: string;
}

export interface MockFilling {
  id: string;
  name: string;
  code: string;
  objectType: string;
  status: FillingStatus;
  createdAt: string;
}
