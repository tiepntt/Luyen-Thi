import { Question } from "models/question/Question";
import React from "react";
import { useHistory, useParams } from "react-router";
import "./style.scss";
interface Props {
  question: Question;
  index: number;
}
const QuestionImagePreview: React.FC<Props> = (props) => {
  const { question, index } = props;
  const history = useHistory();
  const { id, questionId = "" } = useParams<any>();
  const selectQuestion = () => {
    history.push(`/document/${id}/questions-edit/${question.id}`);
  };
  return (
    <div
      className={`question-image-preview d-flex ${
        questionId === question.id && "active"
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