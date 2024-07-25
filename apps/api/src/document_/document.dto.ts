import { DocumentActivity, DocumentStatus } from '../constant/enum';

export class CreateDocumentDTO {
  filingId: string;
  name: string;
  detail?: string;
  pdfLink: string;
  docLink: string;
  activity: DocumentActivity;
  userId: string;
  status?: DocumentStatus;
}
