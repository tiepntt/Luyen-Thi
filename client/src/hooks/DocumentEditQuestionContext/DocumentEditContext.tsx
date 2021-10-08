import { Question } from "models/question/Question";
import { QuestionSetDetail } from "models/questionSet/QuestionSetDetail";
import React, { useContext } from "react";
export interface DocumentEditModels {
  loading: boolean;
  question: Question;
  setQuestion: (question: Question) => void;
  addQuestion: (questionSetId: string, question: Question) => void;
  showAddQuestionSetModal: () => void;
  removeQuestionSet: (questionSetId: string) => void;
  updateQuestionSet: (questionSet: QuestionSetDetail) => void;
}
export const DocumentEditContext = React.createContext<DocumentEditModels>(
  {} as DocumentEditModels
);
export const useDocumentEditContext = () => useContext(DocumentEditContext);
