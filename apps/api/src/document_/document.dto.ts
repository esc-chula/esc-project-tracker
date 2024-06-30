import { DocumentActivity } from '../constant/enum';

export class CreateDocumentDTO {
  filingId: string;
  name: string;
  detail?: string;
  pdfLink: string;
  docLink: string;
  activity: DocumentActivity;
}

export class EditDocumentDTO {
  name?: string;
  activity?: DocumentActivity;
  detail?: string;
  pdfLink?: string;
  docLink?: string;
}
