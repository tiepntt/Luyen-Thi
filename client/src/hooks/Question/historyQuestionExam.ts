import { QuestionHistory } from "models/question/QuestionHistory";
import React, { useContext } from "react";
export interface HistoriesQuestionModel {
  questionHistories: QuestionHistory[];
  disable: boolean;
  userAnswerIndex: (id: string) => QuestionHistory;
  setDisable: (value: boolean) => void;
  setQuestionHistoryIndex: (id: string) => (value: any) => void;
}
export const HistoryQuestions = React.createContext<HistoriesQuestionModel>(
  {} as HistoriesQuestionModel
);
export const useHistoryQuestions = () => useContext(HistoryQuestions);
