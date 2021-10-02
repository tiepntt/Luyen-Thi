import { Grade } from "hooks/Grade-Subject/useGrades";
import { Subject } from "hooks/Grade-Subject/useSubjects";

export interface DocumentDetail {
  name: string;
  id: string;
  grade: Grade;
  subject: Subject;
  documentType: number;
  description: string;
  status: number;
  createAt: Date;
  updateAt: Date;
}
