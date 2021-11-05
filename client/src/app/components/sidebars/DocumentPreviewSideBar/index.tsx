import { QuestionHistory } from "models/question/QuestionHistory";
import React from "react";
import "./style.scss";
interface Props {
  questions: QuestionHistory[];
  times: number;
}
const DocumentPriviewSideBar: React.FC<Props> = ({ questions, times }) => {
  const scrollIntoView = (id: string) => {
    try {
      const element = document.getElementById(`qid-${id}`);
      element &&
        element.scrollIntoView({
          block: "center",
          inline: "center",
          behavior: "smooth",
        });
    } catch {}
  };
  return (
    <div className="preview-sidebar">
      <div className="list-question-index">
        {questions &&
          questions.map(({ questionId }, i) => (
            <div
              className="question-index-item"
              onClick={() => scrollIntoView(questionId)}
            >
              {i + 1}
            </div>
          ))}
      </div>
    </div>
  );
};

export default DocumentPriviewSideBar;
