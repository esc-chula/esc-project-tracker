import type { FilingStatus } from "../constant/enum";

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

export interface MockFiling {
  id: string;
  name: string;
  code: string;
  objectType: string;
  status: FilingStatus;
  createdAt: string;
}
