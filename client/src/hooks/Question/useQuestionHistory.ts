import { PracticeConfig } from "models/practice/practiceConfig";
import { Question } from "models/question/Question";
import { QuestionHistory } from "models/question/QuestionHistory";
import { useEffect, useState } from "react";
import { practiceApi } from "services/api/document/practiceApi";
import { QuestionHistoryStatus } from "settings/question/questionHistoryStatus";
import { QuestionType } from "settings/question/questionType";
import { questionHistoryApi } from "services/api/question/questionHistory";
import { toastService } from "services/toast";

export const useQuestionPractice = (config: PracticeConfig) => {
  const [disable, setDisable] = useState(false);
  const [showSolve, setShowSolve] = useState(false);
  const [histories, setHistories] = useState<QuestionHistory[]>([]);
  const [question, setQuestion] = useState<Question>(null as any);
  const [nextQuestion, setNextQuestion] = useState<Question>(null as any);
  useEffect(() => {}, [question]);
  const getQuestion = async () => {
    var questionRes = await practiceApi.generateQuestion(config);
    if (questionRes.status === 200) {
      return questionRes.data;
    } else {
      return null;
    }
  };

  useEffect(() => {
    if (question) {
      initHistory(question);
      setDisable(false);
      setShowSolve(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [question?.id]);

  const initHistory = (q: Question) => {
    setHistories(
      q.type === QuestionType.MultipleChoice
        ? [
            {
              questionId: q.id,
              answerStatus: QuestionHistoryStatus.Temp,
            } as QuestionHistory,
          ]
        : question.subQuestions.map(
            (sq) =>
              ({
                questionId: sq.id,
                answerStatus: QuestionHistoryStatus.Temp,
              } as QuestionHistory)
          )
    );
  };
  const submitQuestion = () => {
    if (disable) {
      return;
    }
    practiceApi.checkAnswer(histories).then((res) => {
      if (res.status !== 200) {
        return toastService.error(res.data.message);
      }
      setHistories(res.data);
      setDisable(true);
    });
  };
  const answerQuestionIndex = (questionId: string) => {
    let questionHistory = histories.find((q) => q.questionId === questionId);
    return questionHistory;
  };

  const setAnswerIndex = (questionId: string) => (answer: any) => {
    if (disable) {
      return;
    }
    const historyIndex = histories.findIndex(
      (element) => element.questionId === questionId
    );
    if (historyIndex !== -1) {
      questionHistoryApi
        .save({ ...histories[historyIndex], answer: answer })
        .then((res) => {
          if (res.status === 200) {
            const clonedHistories = new Array(...histories);
            clonedHistories[historyIndex] = { ...res.data };
            setHistories(clonedHistories);
          }
        });
    }
  };
  const generateQuestion = () => {
    getQuestion().then((q) => {
      setQuestion(q);
    });
    getQuestion().then((q) => {
      setNextQuestion(q);
    });
  };

  const getNextQuestion = () => {
    if (nextQuestion) {
      setQuestion(nextQuestion);
    }
    getQuestion().then((q) => {
      setNextQuestion(q);
    });
  };
  const getSolve = () => {
    if (!disable) {
      return;
    }
    setShowSolve(true);
    practiceApi.getSolve(question.id).then((res) => {
      if (res.status === 200) {
        setQuestion(res.data);
      }
    });
  };
  const clearQuestion = () => {
    setQuestion(null as any);
    setNextQuestion(null as any);
  };
  return {
    question,
    histories,
    disable,
    getSolve,
    showSolve,
    submitQuestion,
    clearQuestion,
    answerQuestionIndex,
    setAnswerIndex,
    generateQuestion,
    getNextQuestion,
  };
};
