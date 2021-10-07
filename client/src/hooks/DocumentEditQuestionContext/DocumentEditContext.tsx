import { Question } from "models/question/Question";
import React, { useContext } from "react";
export interface DocumentEditModels {
  question: Question;
  setQuestion: (question: Question) => void;
  addQuestion: (questionSetId: string, question: Question) => void;
  showAddQuestionSetModal: () => void;
}
export const DocumentEditContext = React.createContext<DocumentEditModels>(
  {} as DocumentEditModels
);
export const useDocumentEditContext = () => useContext(DocumentEditContext);
