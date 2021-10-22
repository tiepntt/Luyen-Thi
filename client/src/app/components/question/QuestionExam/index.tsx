import { Question } from "models/question/Question";
import React from "react";
import { QuestionType } from "settings/question/questionType";
import QuestionGroup from "./QuestionGroup";
import QuestionMultipleChoice from "./QuestionMultipleChoice";
import "./styles.scss";
interface Props {
  question: Question;
  questionSetId: string;
}
const QuestionExam: React.FC<Props> = ({ question, questionSetId }) => {
  return (
    <div className="question-preivew question-exam">
      {question.type === QuestionType.QuestionGroup ? (
        <QuestionGroup question={question} questionSetId={questionSetId} />
      ) : (
        <QuestionMultipleChoice
          question={question}
          questionSetId={questionSetId}
        />
      )}
    </div>
  );
};

export default QuestionExam;
