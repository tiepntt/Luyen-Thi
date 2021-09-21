import React from "react";
import QuestionSelect from "./QuestionSelectEditor/QuestionSelect";
import "./style.scss";
const QuestionEditor = () => {
  return (
    <div className="question-editor">
      <QuestionSelect />
    </div>
  );
};

export default QuestionEditor;
