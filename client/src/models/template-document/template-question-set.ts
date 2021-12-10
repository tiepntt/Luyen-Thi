import { TemplateQuestionGenerate } from "./template-question-generate";

export interface TemplateQuestionSet {
  id: string;
  name: string;
  show: boolean;
  questionGenerates: TemplateQuestionGenerate[];
}
