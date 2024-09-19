import { DocumentActivity, DocumentStatus } from '../constant/enum';

export class CreateDocumentDTO {
  filingId: string;
  name: string;
  detail?: string;
  pdfName: string;
  docName: string;
  activity: DocumentActivity;
  userId: string;
  status?: DocumentStatus;
  comment?: string;
}
