import QuestionSetExam from "app/components/question-set/QuestionSetExam";
import { QuestionSetDetail } from "models/questionSet/QuestionSetDetail";
import React from "react";
import "./style.scss";
interface Props {
  questionSets: QuestionSetDetail[];
}

const DocumentExamContent: React.FC<Props> = ({ questionSets }) => {
  return (
    <div className="questions-exam-document">
      {questionSets.map((questionSet, i) => (
        <QuestionSetExam questionSet={questionSet} key={i} />
      ))}
    </div>
  );
};

export default DocumentExamContent;
