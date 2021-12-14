import { DocumentExam } from "models/document/Document";
import { DocumentHistory } from "models/document/DocumentHistory";
import { Question } from "models/question/Question";
import { QuestionHistory } from "models/question/QuestionHistory";
import moment from "moment";
import { useEffect, useState } from "react";
import { examApi } from "services/api/document/examApi";
import { questionHistoryApi } from "services/api/question/questionHistory";
import { history } from "services/history";
import { toastService } from "services/toast";
import { DocumentHistoryStatus } from "settings/document/documentHistory";
import { DocumentTypeLabel } from "settings/document/documentType";
import { QuestionHistoryStatus } from "settings/question/questionHistoryStatus";
import { QuestionType } from "settings/question/questionType";

export const useDocumentExam = (id: string, historyId?: string) => {
  const [document, setDocument] = useState<DocumentExam>();
  const [submiting, setSubmiting] = useState(false);
  const [documentHistory, setDocumentHistory] = useState<DocumentHistory>(
    {} as any
  );
  const [times, setTimes] = useState(3600);
  const [loopTime, setLoopTime] = useState<any>();
  const answerQuestionIndex = (questionId: string) => (value: any) => {
    if (documentHistory.status !== DocumentHistoryStatus.Doing) {
      return;
    }
    let newHistories = { ...documentHistory };
    let questionHistories = documentHistory?.questionHistories || [];
    let index = questionHistories.findIndex((q) => q.questionId === questionId);
    // console.log(questionHistories[index]);

    if (index !== -1 && questionHistories) {
      questionHistories[index].answer = value;

      questionHistoryApi.save(questionHistories[index]).then((res) => {
        if (res.status === 200) {
          newHistories.questionHistories[index] = res.data;
          setDocumentHistory(newHistories);
        }
      });
    }
  };
  const userAnswerIndex = (questionId: string) => {
    let questionHistories = documentHistory?.questionHistories || [];
    let questionHistory = questionHistories.find(
      (q) => q.questionId === questionId
    );
    return questionHistory;
  };
  const submitDocument = () => {
    setDocumentHistory({
      ...documentHistory,
      status: DocumentHistoryStatus.Close,
    });
  };
  const countDown = () => {
    switch (documentHistory.status) {
      case DocumentHistoryStatus.Close:
        setTimes(0);
        break;
      case DocumentHistoryStatus.Doing:
        setLoopTime(
          setInterval(() => {
            let newTimes =
              (document?.times || 0) * 60 -
              moment
                .utc()
                .diff(moment.utc(documentHistory.startTime), "seconds");
            if (newTimes < 0) {
              submit();
              clearInterval(loopTime);
            }
            setTimes(newTimes);
          }, 1000)
        );
        break;
      case DocumentHistoryStatus.Open:
        setTimes(document?.times || 0);
        break;
    }
  };
  const countUp = () => {
    switch (documentHistory.status) {
      case DocumentHistoryStatus.Close:
        break;
      case DocumentHistoryStatus.Doing:
        setLoopTime(
          setInterval(() => {
            let newTimes = moment
              .utc()
              .diff(moment.utc(documentHistory.startTime), "seconds");
            setTimes(newTimes);
          }, 1000)
        );
        break;
      case DocumentHistoryStatus.Open:
        setTimes(document?.times || 0);
        break;
    }
  };
  useEffect(() => {
    examApi.getExam(id, historyId).then((res) => {
      if (res.status === 200) {
        let newDocument = res.data.document as DocumentExam;
        let questions = newDocument?.questionSets
          .map((qs) => qs.questions)
          .flat()
          .map((q) =>
            q.type === QuestionType.MultipleChoice ? q : q.subQuestions
          )
          .flat();
        setDocument(newDocument);
        let newDocumentHistory = res.data.documentHistory as DocumentHistory;

        newDocumentHistory.questionHistories = initHistory(
          questions,
          newDocumentHistory.questionHistories,
          newDocumentHistory.id,
          newDocumentHistory.status === DocumentHistoryStatus.Close
        );
        setDocumentHistory(newDocumentHistory);
      } else {
        toastService.error(res.data.message);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const initHistory = (
    questions: Question[],
    histories: QuestionHistory[],
    historyId = "",
    isDone = false
  ) =>
    questions.map((question): QuestionHistory => {
      var questionHistory = histories.find((i) => i.questionId === question.id);
      return questionHistory
        ? questionHistory
        : ({
            questionId: question.id,
            documentId: id,
            documentHistoryId: historyId,
            answerStatus: isDone
              ? QuestionHistoryStatus.InCorrect
              : QuestionHistoryStatus.Temp,
          } as QuestionHistory);
    });
  useEffect(() => {
    try {
      if (
        documentHistory &&
        documentHistory.status === DocumentHistoryStatus.Close
      ) {
        clearInterval(loopTime);
        setTimes(
          moment
            .utc(documentHistory.endTime)
            .diff(moment.utc(documentHistory.startTime), "seconds")
        );
      } else if (
        documentHistory &&
        documentHistory.status === DocumentHistoryStatus.Doing
      ) {
        if (document?.documentType === DocumentTypeLabel.DOCUMENT) {
          countUp();
        } else {
          countDown();
        }
      }
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [documentHistory.status]);
  const submit = () => {
    setSubmiting(true);
    setDocumentHistory({
      ...documentHistory,
      status: DocumentHistoryStatus.Close,
      endTime: new Date(Date.now()),
    });
    examApi.submit(documentHistory.id || "").then((res) => {
      if (res.status === 200) {
        // init History
        let questions = (document as DocumentExam)?.questionSets
          .map((qs) => qs.questions)
          .flat()
          .map((q) =>
            q.type === QuestionType.MultipleChoice ? q : q.subQuestions
          )
          .flat();
        let newDocumentHistory = res.data as DocumentHistory;
        newDocumentHistory.questionHistories = initHistory(
          questions || [],
          newDocumentHistory.questionHistories,
          newDocumentHistory.id,
          true
        );
        setDocumentHistory(newDocumentHistory);
        setTimes((newDocumentHistory.timeDuration || 0) * 60);
        setSubmiting(false);
      } else {
        toastService.error(res.data.message);
      }
    });
  };
  const reset = () => {
    setDocumentHistory({
      ...documentHistory,
      status: DocumentHistoryStatus.Close,
      endTime: new Date(Date.now()),
    });
    examApi.reset(document?.id || "", historyId).then((res) => {
      if (res.status === 200) {
        // init History
        let questions = (document as DocumentExam)?.questionSets
          .map((qs) => qs.questions)
          .flat()
          .map((q) =>
            q.type === QuestionType.MultipleChoice ? q : q.subQuestions
          )
          .flat();
        let newDocumentHistory = res.data as DocumentHistory;
        newDocumentHistory.questionHistories = initHistory(
          questions || [],
          newDocumentHistory.questionHistories,
          newDocumentHistory.id
        );
        setDocumentHistory(newDocumentHistory);
        history.push(`/document/${id}`);
      } else {
        toastService.error(res.data.message);
      }
    });
  };
  const getAnswerQuestion = (questionId: string) => {
    return examApi.getAnswer(questionId, id);
  };
  return {
    document,
    answerQuestionIndex,
    setDocument,
    documentHistory,
    setDocumentHistory,
    submitDocument,
    userAnswerIndex,
    times,
    submit,
    reset,
    submiting,
    setSubmiting,
    getAnswerQuestion,
  };
};
