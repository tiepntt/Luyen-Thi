import Loading from "app/components/_share/StaticLayout/Loading";
import { useDocumentEditContext } from "hooks/DocumentEditQuestionContext/DocumentEditContext";
import React, { useEffect } from "react";
import { useParams } from "react-router";
import { questionApi } from "services/api/question/question";
import { toastService } from "services/toast";
import { QuestionType } from "settings/question/questionType";
import QuestionGroupEditor from "./QuestionGroup";
import QuestionSelect from "./QuestionSelectEditor/QuestionSelect";
import "./style.scss";
const QuestionEditor = () => {
  const { question, setQuestion } = useDocumentEditContext();
  const { questionId } = useParams<any>();
  const getQuestion = () => {
    setQuestion(null as any);
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
      {question ? (
        question.type === QuestionType.QuestionGroup ? (
          <QuestionGroupEditor question={question} />
        ) : (
          <QuestionSelect question={question} />
        )
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default QuestionEditor;
