import { useDocumentEditContext } from "hooks/DocumentEditQuestionContext/DocumentEditContext";
import { Question } from "models/question/Question";
import React from "react";
import { useHistory, useParams } from "react-router";
import "./style.scss";
interface Props {
  question: Question;
  index: number;
  questionSetId: string;
}
const QuestionImagePreview: React.FC<Props> = (props) => {
  const { question, index, questionSetId } = props;
  const history = useHistory();
  const { id } = useParams<any>();
  const currentQuestion = useDocumentEditContext().question;
  const selectQuestion = () => {
    history.push(`/editor/document/${id}/${questionSetId}/${question.id}`);
  };
  return (
    <div
      className={`question-image-preview d-flex ${
        currentQuestion?.id === question.id && "active"
      }`}
    >
      <div className="question-check-icon"></div>
      <div
        className="question-preview-content"
        style={{ flexGrow: 1 }}
        onClick={selectQuestion}
      >
        <div className="question-introduction-preview">Câu số {index}</div>
        <div className="option-questions">
          <div
            className={`option ${question.correctAnswer === "A" && "active"}`}
          ></div>
          <div
            className={`option ${question.correctAnswer === "B" && "active"}`}
          ></div>
          <div
            className={`option ${question.correctAnswer === "C" && "active"}`}
          ></div>
          <div
            className={`option ${question.correctAnswer === "D" && "active"}`}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default QuestionImagePreview;
