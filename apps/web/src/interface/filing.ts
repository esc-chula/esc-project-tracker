import type { FilingStatus, FilingSubType } from '../constant/enum';
import type { Project } from './project';

export interface FilingType {
  id: string;
  projectId: string;
  project?: Project;
  userId: string;
  name: string;
  filingCode: string;
  status: FilingStatus;
  type: number;
  subType: FilingSubType;
  projectCode: string;
  createdAt: string;
  updatedAt: string;
}
