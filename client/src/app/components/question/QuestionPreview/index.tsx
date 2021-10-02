import { Question } from "models/question/Question";
import React from "react";
import QuestionMultipleChocie from "./QuestionMultipleChoice";
import "./style.scss";
interface Props {
  data: Question;
  index?: number;
}
const QuestionPreview: React.FC<Props> = ({ data, index }) => {
  return (
    <div className="question-preivew">
      <QuestionMultipleChocie {...data} />
    </div>
  );
};

export default QuestionPreview;
