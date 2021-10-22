import QuestionExam from "app/components/question/QuestionExam";
import { QuestionSetDetail } from "models/questionSet/QuestionSetDetail";
import React from "react";

interface Props {
  questionSet : QuestionSetDetail
}
const QuestionSetExam: React.FC<Props> = ({ questionSet }) => {
  return <div className="question-set-preview">
      {questionSet.show && <div className="question-set-title">{questionSet.name}</div>}
      <div className="questions-preview">
        {questionSet.questions.map((question, i) => (
          <QuestionExam key={i} question={question} questionSetId={questionSet.id} />
        ))}
      </div>
    </div>
};

export default QuestionSetExam;
