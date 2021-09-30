import { Question } from "models/question/Question";

export interface QuestionSetDetail {
  id: string;
  show: boolean;
  name: string;
  orderNumber: number;
  documentId: string;
  createAt: Date;
  updateAt: Date;
  questions: Question[];
}
