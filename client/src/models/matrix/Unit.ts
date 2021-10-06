import { Chapter } from "./Chapter";
import { TemplateQuestion } from "./TemplateQuestion";

export interface Unit {
  name: string;
  code: string;
  id: string;
  templateQuestions?: TemplateQuestion[];
}
export interface UnitCreate {
  name: string;
  chapterId: string;
}
export interface UnitDetail {
  id: string;
  name: string;
  chapter: Chapter;
}
