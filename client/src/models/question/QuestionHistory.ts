import { QuestionHistoryStatus } from "settings/question/questionHistoryStatus";

export interface QuestionHistory {
  questionId: string;
  id?: string;
  questionSetId?: string;
  documentId?: string;
  documentHistoryId?: string;
  answerStatus?: QuestionHistoryStatus;
  answer?: string;
}
