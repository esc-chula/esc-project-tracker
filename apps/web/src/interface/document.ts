import { DocumentActivity, DocumentStatus } from '../constant/enum';
import { Filing } from './filing';
import { User } from './user';

export interface Document {
  id: string;
  filing: Filing;
  name: string;
  activity: DocumentActivity;
  status: DocumentStatus;
  detail: string;
  pdfName: string;
  docName: string;
  user: User;
  createdAt: string;
  updatedAt: string;
}
