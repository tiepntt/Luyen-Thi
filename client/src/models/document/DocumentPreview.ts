import { QuestionHistory } from "models/question/QuestionHistory";
import { QuestionSetDetail } from "models/questionSet/QuestionSetDetail";
import { DocumentHistory } from "./DocumentHistory";

export interface DocumentPreview {
  id: string;
  name: string;
  description: string;
  times: number;
  numberQuestion: number;
  questionSets: QuestionSetDetail[];
  documentHistory?: DocumentHistory;
}
