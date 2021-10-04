import TemplatePreview from "app/components/_share/TemplatePreview";
import { Question } from "models/question/Question";
import React from "react";
import QuestionMultipleChocie from "../QuestionMultipleChoice";

const QuestionGroupPreview: React.FC<Question> = (question) => {
  const { introduction = [], subQuestions = [] } = question;
  return (
    <div className="question-group-preview" id={`qid-${question.id}`}>
      <div className="question-introduction">
        {introduction.map((element, i) => (
          <TemplatePreview key={i} {...element} />
        ))}
        <div className="sub-questions">
          {subQuestions.map((subQuestion, i) => (
            <QuestionMultipleChocie key={i} {...subQuestion} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuestionGroupPreview;
