import { Grade } from "hooks/Grade-Subject/useGrades";
import { Subject } from "hooks/Grade-Subject/useSubjects";

export interface Chapter {
  name: string;
  id: string;
  subjectId: string;
  gradeId: string;
}
export interface ChapterCreate {
  name: string;
  subjectId: string;
  gradeId: string;
}
export interface ChapterDetail {
  id: string;
  name: string;
  subject: Subject;
  grade: Grade;
}
