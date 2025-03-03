import type { DocumentActivity, DocumentStatus } from '../constant/enum';

export interface Document {
  id: string;
  filingId: string;
  name?: string;
  activity: DocumentActivity;
  status: DocumentStatus;
  detail?: string;
  comment?: string;
  pdfName?: string;
  docName?: string;
  pdfLastOpen?: string;
  docLastOpen?: string;
  userId: string;
  createdAt: string;
  updatedAt?: string;
}
