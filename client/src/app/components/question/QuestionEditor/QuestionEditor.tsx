import { useDocumentEditContext } from "hooks/DocumentEditQuestionContext/DocumentEditContext";
import React, { useEffect } from "react";
import { useParams } from "react-router";
import { questionApi } from "services/api/question/question";
import { toastService } from "services/toast";
import QuestionGroupEditor from "./QuestionGroup/QuestionGroupEditor";
import QuestionSelect from "./QuestionSelectEditor/QuestionSelect";
import "./style.scss";
const QuestionEditor = () => {
  const { question, setQuestion } = useDocumentEditContext();
  const { questionId } = useParams<any>();
  const getQuestion = () => {
    questionApi.get(questionId).then((res) => {
      if (res.status === 200) {
        setQuestion(res.data);
      } else {
        setQuestion(null as any);
        toastService.error();
      }
    });
  };
  useEffect(() => {
    getQuestion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionId]);
  return (
    <div className="question-editor">
      {question &&
        (question.subQuestions.length ? (
          <QuestionGroupEditor question={question} />
        ) : (
          <QuestionSelect question={question} />
        ))}
    </div>
  );
};

export default QuestionEditor;
