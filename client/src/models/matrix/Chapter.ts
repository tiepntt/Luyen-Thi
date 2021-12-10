import { Grade } from "./Grade";
import { Subject } from "./Subject";
import { Unit } from "./Unit";

export interface Chapter {
  name: string;
  id: string;
  subjectId: string;
  gradeId: string;
}
export interface ChapterDetail {
  name: string;
  id: string;
  subjectId: string;
  gradeId: string;
  units: Unit[];
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
