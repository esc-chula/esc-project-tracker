import { FilingType } from "./filing";

export interface documentType {
  id: string;
  filing: FilingType;
  name: string;
  activity: string;
  detail: string;
  pdfLink: string;
  docLink: string;
  createdAt: string;
  updatedAt: string;
}
