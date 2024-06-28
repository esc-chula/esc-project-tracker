import { DocumentActivity } from "../../../api/src/constant/enum"
import { Filing } from "./filing"

export interface Document {
  id: string
  filing: Filing
  name: string
  activity: DocumentActivity
  detail: string
  pdfLink: string
  docLink: string
  createdAt: string
  updatedAt: string
}
