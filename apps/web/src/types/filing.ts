import { Document } from '../interface/document';
import { Filing } from '../interface/filing';

export interface FilingsWithDocument {
  filing: Filing;
  document: Document;
}
