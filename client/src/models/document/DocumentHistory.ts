import { QuestionHistory } from "models/question/QuestionHistory";
import { DocumentHistoryStatus } from "settings/document/documentHistory";

export interface DocumentHistory {
  id?: string;
  documentId?: string;
  startTime?: Date;
  endTime?: Date;
  questionHistories: QuestionHistory[];
  numberCorrect?: boolean;
  status: DocumentHistoryStatus;
}
