import { Question } from "models/question/Question";
import { QuestionSetDetail } from "models/questionSet/QuestionSetDetail";
import { useEffect, useState } from "react";
import { questionSetApi } from "services/api/document/questionSetApi";

export const useQuestions = (documentId: string) => {
  const [loading, setLoading] = useState(false);
  const [questionSets, setQuestionSets] = useState<QuestionSetDetail[]>([]);
  const [question, setQuestion] = useState<Question>();
  // const getQuestionSets = () => {};
  const addQuestionSet = (questionSet: QuestionSetDetail) => {
    setQuestionSets([...questionSets, questionSet]);
  };
  const removeQuestionSet = (questionSetId: string) => {
    getQuestionSets();
  };
  const updateQuestionSet = (questionSet: QuestionSetDetail) => {
    let index = questionSets.findIndex((i) => i.id === questionSet.id);
    let newQuestionSets = [...questionSets];
    if (index !== -1) {
      newQuestionSets[index] = questionSet;
    }
    setQuestionSets(newQuestionSets);
  };
  // const removeQuestion = (questionSetId: string, questionId: string) => {};
  // const updateQuestion = (questionSetId: string, question: Question) => {};
  const getQuestionSets = () => {
    setLoading(true);
    questionSetApi.getByDocumentId(documentId).then((res) => {
      setLoading(false);
      if (res.status === 200) {
        setQuestionSets(res.data);
      }
    });
  };
  useEffect(() => {
    getQuestionSets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [documentId]);
  const addQuestion = (questionSetId: string, question: Question) => {
    let newQuestionSets = [...questionSets];
    const index = questionSets.findIndex((i) => i.id === questionSetId);
    newQuestionSets[index].questions.push(question);
    setQuestionSets(newQuestionSets);
  };

  return {
    loading,
    questionSets,
    removeQuestionSet,
    question,
    setQuestion,
    setQuestionSets,
    addQuestionSet,
    addQuestion,
    updateQuestionSet,
  };
};
