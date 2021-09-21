import React, { useState } from "react";
import OptionQuestionEditor from "./OptionQuestionEditor";
import "./style.scss";
const ButtonCheck = () => <div className="option-Check"></div>;
const QuestionSelectEditor = () => {
  const [focusIndex, setFocusIndex] = useState("");
  return (
    <div className="question-select-editor">
      <OptionQuestionEditor
        className="introduction-editor"
        placeHolder="Nhập nội dung câu hỏi"
        key={1}
        value=""
        focus={focusIndex === "introduction"}
        onClick={() => setFocusIndex("introduction")}
      />

      <div className="question-options mt-3">
        <div className="question-option mt-3">
          <OptionQuestionEditor
            preElement={<ButtonCheck />}
            placeHolder="Đáp án A"
            className="option-question-editor"
            key={2}
            value=""
            focus={focusIndex === "optionA"}
            onClick={() => setFocusIndex("optionA")}
          />
        </div>
        <div className="question-option  mt-3">
          <OptionQuestionEditor
            preElement={<ButtonCheck />}
            className="option-question-editor"
            placeHolder="Đáp án B"
            key={3}
            value=""
            focus={focusIndex === "optionB"}
            onClick={() => setFocusIndex("optionB")}
          />
        </div>
        <div className="question-option  mt-3">
          <OptionQuestionEditor
            className="option-question-editor"
            preElement={<ButtonCheck />}
            placeHolder="Đáp án C"
            key={4}
            value=""
            focus={focusIndex === "optionC"}
            onClick={() => setFocusIndex("optionC")}
          />
        </div>
        <div className="question-option  mt-3">
          <OptionQuestionEditor
            className="option-question-editor"
            preElement={<ButtonCheck />}
            placeHolder="Đáp án D"
            key={4}
            value=""
            focus={focusIndex === "optionD"}
            onClick={() => setFocusIndex("optionD")}
          />
        </div>
      </div>
      <div className="explain-question mt-3">
        <OptionQuestionEditor
          placeHolder="Nhập giải thích cho câu hỏi"
          key={1}
          value=""
          className="explain-question"
          focus={focusIndex === "explain"}
          onClick={() => setFocusIndex("explain")}
        />
      </div>
    </div>
  );
};

export default QuestionSelectEditor;
