import { Grade } from "models/matrix/Grade";
import { Subject } from "models/matrix/Subject";
import { DocumentFormLabel } from "settings/document/documentForm";
import { ShuffleTypeLabel } from "settings/document/documentShuffle";
import { DocumentStatusLabel } from "settings/document/documentStatus";

export interface DocumentDetail {
  name: string;
  id: string;
  grade: Grade;
  subject: Subject;
  documentType: number;
  description: string;
  status: DocumentStatusLabel;
  createAt: Date;
  updateAt: Date;
  form: DocumentFormLabel;
  shuffleType: ShuffleTypeLabel;
  times: number;
  isApprove?: boolean;
  imageUrl: string;
  googleDocId: string;
}
