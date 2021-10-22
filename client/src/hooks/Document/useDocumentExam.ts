import { DocumentExam } from "models/document/Document";
import { DocumentHistory } from "models/document/DocumentHistory";
import { useState } from "react";
import { DocumentHistoryStatus } from "settings/document/documentHistory";
import { documentStatuses } from "settings/document/documentStatus";

export const useDocumentExam = (id: string) => {
  const [document, setDocument] = useState<DocumentExam>();
  const [documentHistory, setDocumentHistory] = useState<DocumentHistory>(
    {} as any
  );
  const answerQuestionIndex = (questionId: string) => (value: any) => {
    let newHistories = { ...documentHistory };
    let questionHistories = documentHistory?.questionHistories || [];
    let index = questionHistories.findIndex((q) => q.id === questionId);
    if (index !== -1 && questionHistories) {
      questionHistories[index].answer = value;
      newHistories.questionHistories = questionHistories;
      setDocumentHistory(newHistories);
    }
  };
  const startDocument = () => {
    setDocumentHistory({
      ...documentHistory,
      status: DocumentHistoryStatus.Doing,
    });
  };
  const submitDocument = () => {
    setDocumentHistory({
      ...documentHistory,
      status: DocumentHistoryStatus.Close,
    });
  };
  return {
    document,
    answerQuestionIndex,
    setDocument,
    documentHistory,
    setDocumentHistory,
    startDocument,
    submitDocument,
  };
};
