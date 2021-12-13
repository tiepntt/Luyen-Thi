import { PracticeConfig } from "models/practice/practiceConfig";
import { Question } from "models/question/Question";
import { QuestionHistory } from "models/question/QuestionHistory";
import { useEffect, useState } from "react";
import { practiceApi } from "services/api/document/practiceApi";
import { QuestionHistoryStatus } from "settings/question/questionHistoryStatus";
import { QuestionType } from "settings/question/questionType";
import { questionHistoryApi } from "services/api/question/questionHistory";

export const useQuestionPractice = (config: PracticeConfig) => {
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
      initHistory(question)
    }
  }, [question])

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
            (sb) =>
              ({
                questionId: q.id,
                answerStatus: QuestionHistoryStatus.Temp,
              } as QuestionHistory)
          )
    );
  };
  const submitQuestion = () => {};
  const answerQuestionIndex = (questionId: string) => {
    let questionHistory = histories.find((q) => q.questionId === questionId);
    return questionHistory;
  };
  
  const setAnswerIndex = (questionId: string) => (answer: any) => {
    const historyIndex = histories.findIndex(
      (element) => element.questionId === questionId
    );
    if (historyIndex !== -1) {
      questionHistoryApi.save({...histories[historyIndex], answer: answer }).then((res) => {
        if (res.status === 200) {
          const clonedHistories = new Array(...histories);
          clonedHistories[historyIndex] = { ...res.data };
          console.log("clonedHistories", clonedHistories)
          setHistories(clonedHistories);
          console.log(histories);
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
  }
  return {
    question,
    histories,
    submitQuestion,
    answerQuestionIndex,
    setAnswerIndex,
    generateQuestion,
    getNextQuestion,
  };
};
