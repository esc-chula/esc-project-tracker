import type { FilingSubType } from '../constant/enum';
import type { DocumentTypeTwo } from './document/document-type-two';
import type { DocumentTypeZero } from './document/document-type-zero';
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
  createdAt: Date;
  updatedAt: Date;
}
