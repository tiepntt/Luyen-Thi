import { DocumentFormLabel } from "settings/document/documentForm";
import { ShuffleTypeLabel } from "settings/document/documentShuffle";
import { DocumentStatusLabel } from "settings/document/documentStatus";

export interface DocumentUpdateInfo {
  name: string;
  id: string;
  gradeId?: string;
  subjectId?: string;
  documentType: number;
  description: string;
  status: DocumentStatusLabel;
  form: DocumentFormLabel;
  shuffleType: ShuffleTypeLabel;
  times: number;
  imageUrl: string;
  googleDocId: string;
}
