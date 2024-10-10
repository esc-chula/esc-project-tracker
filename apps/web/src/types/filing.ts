import { DocumentType } from "../interface/document";
import { FilingType } from "../interface/filing";

export interface FilingsWithDocument {
    filing : FilingType
    document: DocumentType
}