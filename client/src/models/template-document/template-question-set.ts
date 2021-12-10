import { Grade } from "models/matrix/Grade";
import { TemplateQuestionGenerate } from "./template-question-generate";

export interface TemplateQuestionSet {
  id: string;
  name: string;
  show: boolean;
  content: string;
  grades: Grade[];
  questionGenerates: TemplateQuestionGenerate[];
}
