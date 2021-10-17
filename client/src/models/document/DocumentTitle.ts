import { DocumentTypeLabel } from "settings/document/documentType";

export interface DocumentTitle {
  name: string;
  imageUrl: string;
  description: string;
  id: string;
  documentType: DocumentTypeLabel;
  numberDo: number;
  createAt: Date;
}
