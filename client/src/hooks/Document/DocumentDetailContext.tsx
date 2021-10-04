import { DocumentDetail } from "models/document/DocumentDetail";
import { QuestionSetDetail } from "models/questionSet/QuestionSetDetail";
import React, { useContext } from "react";
export interface DocumentDetailModels {
  document: DocumentDetail;
  questionSets: QuestionSetDetail[];
  setDocument: (value: any) => void;
  setQuestionSets: (value: any) => void;
}
export const DocumentDetailContext = React.createContext<DocumentDetailModels>(
  {} as DocumentDetailModels
);
export const useDocumentDetailContext = () => useContext(DocumentDetailContext);
