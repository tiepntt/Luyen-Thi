import TemplatePreview from "app/components/_share/TemplatePreview";
import { Question } from "models/question/Question";
import React from "react";
import QuestionMultipleChocie from "../QuestionMultipleChoice";
interface Props {
  question: Question;
  questionSetId: string;
}
const QuestionGroupPreview: React.FC<Props> = ({ question, questionSetId }) => {
  const { introduction = [], subQuestions = [] } = question;
  return (
    <div className="question-group-preview" id={`qid-${question.id}`}>
      <div className="question-introduction">
        {introduction.map((element, i) => (
          <TemplatePreview key={i} {...element} ident={30} />
        ))}
        <div className="sub-questions">
          {subQuestions.map((subQuestion, i) => (
            <QuestionMultipleChocie
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

export default QuestionGroupPreview;
