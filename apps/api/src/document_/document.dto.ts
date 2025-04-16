import { DocumentActivity, DocumentStatus } from '@repo/shared';

export class CreateDocumentDTO {
  filingId: string;
  name?: string;
  detail?: string;
  pdfName?: string;
  docName?: string;
  activity: DocumentActivity;
  userId: string;
  status?: DocumentStatus;
  comment?: string;
}
