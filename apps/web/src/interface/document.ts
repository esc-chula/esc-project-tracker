import { DocumentActivity, DocumentStatus } from '../../../api/src/constant/enum';
import { FilingType } from './filing';
import { User } from './user';

export interface DocumentType {
  id: string;
  filing: FilingType;
  name: string;
  activity: DocumentActivity;
  status: DocumentStatus;
  detail: string;
  pdfName: string;
  docName: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}
