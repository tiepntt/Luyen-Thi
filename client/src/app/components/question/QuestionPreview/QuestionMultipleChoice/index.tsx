import TemplatePreview from "app/components/_share/TemplatePreview";
import { Question } from "models/question/Question";
import React from "react";

const QuestionMultipleChocie: React.FC<Question> = (question) => {
  return (
    <div className="question-multiple-choice">
      <div className="question-introduction">
        {question.introduction.map((element, i) => (
          <TemplatePreview key={i} {...element} />
        ))}
      </div>
    </div>
  );
};

export default QuestionMultipleChocie;
