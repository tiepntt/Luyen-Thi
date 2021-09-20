import TextEditor from "app/components/_share/TextEditor";
import React from "react";
import "./style.scss";

const ExamEdit = () => {
  return (
    <div className="exam-edit">
      <div className="left-side-bar"></div>
      <div className="main-content-side-bar">
        <div className="editor">
          <div className="item-editor">
            <TextEditor />
          </div>
        </div>
        <div className="math-quild"></div>
      </div>
    </div>
  );
};

export default ExamEdit;
