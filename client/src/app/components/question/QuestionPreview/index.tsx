import { Question } from "models/question/Question";
import React from "react";
import { QuestionType } from "settings/question/questionType";
import QuestionGroupPreview from "./QuestionGroup";
import QuestionMultipleChocie from "./QuestionMultipleChoice";
import "./style.scss";
interface Props {
  data: Question;
  index?: number;
  questionSetId: string;
}
const QuestionPreview: React.FC<Props> = ({ data, index, questionSetId }) => {
  return (
    <div className="question-preivew">
      {data.type === QuestionType.QuestionGroup ? (
        <QuestionGroupPreview question={data} questionSetId={questionSetId} />
      ) : (
        <QuestionMultipleChocie question={data} questionSetId={questionSetId} />
      )}
    </div>
  );
};

export default QuestionPreview;
