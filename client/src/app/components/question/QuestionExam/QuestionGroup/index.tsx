import TemplatePreview from "app/components/_share/TemplatePreview";
import { Question } from "models/question/Question";
import React from "react";
import QuestionMultipleChoice from "../QuestionMultipleChoice";
interface Props {
  question: Question;
  questionSetId: string;
}
const QuestionGroup: React.FC<Props> = ({ question, questionSetId }) => {
  const { introduction = [], subQuestions = [] } = question;
  return (
    <div className="question-group-preview" id={`qid-${question.id}`}>
      <div className="question-introduction">
        {introduction.map((element, i) => (
          <TemplatePreview key={i} {...element} />
        ))}
        <div className="sub-questions">
          {subQuestions.map((subQuestion, i) => (
            <QuestionMultipleChoice
              key={i}
              question={subQuestion}
              questionSetId={questionSetId}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuestionGroup;
