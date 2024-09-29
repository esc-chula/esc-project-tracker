import type { FilingStatus } from '../constant/enum';
import { Project } from './project';

export interface FilingType {
  id: string;
  projectId: string;
  project?: Project;
  userId: string;
  name: string;
  FilingCode: string;
  status: FilingStatus;
  type: number;
  projectCode: string;
  createdAt: string;
  updatedAt: string;
}
