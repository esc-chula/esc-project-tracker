import type {
  FilingSubType,
  DocumentTypeZero,
  DocumentTypeTwo,
} from '@repo/shared';
import type { Project } from './project';
import type { User } from './user';

export interface Gendoc {
  id: string;
  project?: Project;
  projectId: string;
  user?: User;
  userId: string;
  name: string;
  filingCode: string;
  type: number;
  subType: FilingSubType | null;
  projectCode: string;
  data: DocumentTypeZero | DocumentTypeTwo;
  createdAt: string;
  updatedAt: string;
}
