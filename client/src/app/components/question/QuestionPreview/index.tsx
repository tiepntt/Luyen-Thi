import { Question } from "models/question/Question";
import React from "react";
import QuestionGroupPreview from "./QuestionGroup";
import QuestionMultipleChocie from "./QuestionMultipleChoice";
import "./style.scss";
interface Props {
  data: Question;
  index?: number;
}
const QuestionPreview: React.FC<Props> = ({ data, index }) => {
  return (
    <div className="question-preivew">
      {data.subQuestions.length ? (
        <QuestionGroupPreview {...data} />
      ) : (
        <QuestionMultipleChocie {...data} />
      )}
    </div>
  );
};

export default QuestionPreview;
