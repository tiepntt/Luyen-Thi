import { Grade } from "./Grade";
import { Subject } from "./Subject";

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
