import { Question } from "models/question/Question";
import { QuestionSetDetail } from "models/questionSet/QuestionSetDetail";
import { useEffect, useState } from "react";
import { questionSetApi } from "services/api/document/questionSetApi";

export const useQuestions = (documentId: string) => {
  const [questionSets, setQuestionSets] = useState<QuestionSetDetail[]>([]);
  const [question, setQuestion] = useState<Question>();
  // const getQuestionSets = () => {};
  const addQuestionSet = (questionSet: QuestionSetDetail) => {
    setQuestionSets([...questionSets, questionSet]);
  };
  const removeQuestionSet = (questionSetId: string) => {};
  // const removeQuestion = (questionSetId: string, questionId: string) => {};
  // const updateQuestion = (questionSetId: string, question: Question) => {};
  // const updateQuestionSet = (questionSet: QuestionSetDetail) => {};
  useEffect(() => {
    questionSetApi.getByDocumentId(documentId).then((res) => {
      if (res.status === 200) {
        setQuestionSets(res.data);
      }
    });
  }, [documentId]);
  const addQuestion = (questionSetId: string, question: Question) => {
    let newQuestionSets = [...questionSets];
    const index = questionSets.findIndex((i) => i.id === questionSetId);
    newQuestionSets[index].questions.push(question);
    setQuestionSets(newQuestionSets);
  };
  return {
    questionSets,
    removeQuestionSet,
    question,
    setQuestion,
    setQuestionSets,
    addQuestionSet,
    addQuestion,
  };
};
