import type { FilingStatus, FilingSubType } from '@repo/shared';
import type { Project } from './project';
import type { User } from './user';

export interface Filing {
  id: string;
  projectId: string;
  project?: Project;
  userId: string;
  user?: User;
  name: string;
  filingCode: string;
  status: FilingStatus;
  type: number;
  subType: FilingSubType | null;
  projectCode: string;
  createdAt: string;
  updatedAt: string;
}
