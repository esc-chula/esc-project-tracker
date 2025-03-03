import type { Document } from '../interface/document';
import type { Filing } from '../interface/filing';

export interface FilingWithDocument {
  filing: Filing;
  document: Document;
}
