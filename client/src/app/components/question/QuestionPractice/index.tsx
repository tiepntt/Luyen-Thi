import { Question } from "models/question/Question";
import React from "react";
import { QuestionType } from "settings/question/questionType";
import QuestionGroup from "./QuestionGroup";
import QuestionMultipleChoice from "./QuestionMultipleChoice";
import "./style.scss";
interface Props {
  question: Question;
}
const QuestionPractice: React.FC<Props> = ({ question }) => {
  return (
    <div className="question-practice question-exam">
      {question.type === QuestionType.QuestionGroup ? (
        <QuestionGroup question={question} />
      ) : (
        <QuestionMultipleChoice question={question} />
      )}
    </div>
  );
};

export default QuestionPractice;
