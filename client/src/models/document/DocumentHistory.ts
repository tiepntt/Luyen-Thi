import { QuestionHistory } from "models/question/QuestionHistory";
import { UserTitle } from "models/user/userInfo";
import { DocumentHistoryStatus } from "settings/document/documentHistory";
import { DocumentTitle } from "./DocumentTitle";

export interface DocumentHistory {
  id?: string;
  documentId?: string;
  startTime?: Date;
  endTime?: Date;
  questionHistories: QuestionHistory[];
  numberCorrect: number;
  numberIncorrect: number;
  timeDuration?: number;
  status: DocumentHistoryStatus;
}
export interface DocumentHistoryRank {
  user: UserTitle;
  timeDuration: number;
  rank: number;
  numberCorrect: number;
}
export interface DocumentHistoryDetail {
  id?: string;
  documentId?: string;
  startTime?: Date;
  endTime?: Date;
  questionHistories: QuestionHistory[];
  numberCorrect: number;
  numberIncorrect: number;
  timeDuration?: number;
  status: DocumentHistoryStatus;
  document: DocumentTitle;
}
