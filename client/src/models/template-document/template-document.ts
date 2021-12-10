import { TemplateQuestionSet } from "./template-question-set";

export interface TemplateDocument {
  id: string;
  backgroundUrl: string;
  bannerUrl: string;
  gradeId: string;
  subjectId: string;
  name: string;
  templateQuestionSets: TemplateQuestionSet[];
}
