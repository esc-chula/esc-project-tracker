import { FilingType } from "./filing";

export interface DocumentType {
  id: string;
  filing: FilingType;
  name: string;
  activity: string;
  detail: string;
  pdfName: string;
  docName: string;
  createdAt: string;
  updatedAt: string;
}
