import { Question } from "models/question/Question";
import React, { useEffect, useState } from "react";
import OptionQuestionEditor from "./OptionQuestionEditor";
import "./style.scss";
import { Button } from "react-bootstrap";

interface Props {
  question: Question;
  questionParentId?: string;
}
const QuestionSelectEditor: React.FC<Props> = ({ question }) => {
  const [focusIndex, setFocusIndex] = useState("");
  const [questionContent, setQuestionContent] = useState(intQuestion(question));
  useEffect(() => {
    setQuestionContent(intQuestion(question));
  }, [question]);
  const setContentOption = (value: [], index: number) => {
    const content = initDefaultValue(value);
    let options = [...questionContent.content];
    const option = {
      ...options[index],
      content: content,
    };

    options[index] = option as any;
    setQuestionContent({ ...questionContent, content: options });
  };
  const onSelectOption = (index: number) => {
    let options = [...questionContent.content];
    let newQuestion = { ...questionContent };
    newQuestion.correctAnswer = options[index].name;
    setQuestionContent(newQuestion);
  };

  return (
    <div className="question-select-editor">
      <div className="top-bar-question ">
        <Button variant="outline-primary" className="mx-2">
          Lưu
        </Button>
        <Button variant="outline-danger">Xóa</Button>
      </div>
      <OptionQuestionEditor
        className="introduction-editor "
        placeHolder="Nhập nội dung câu hỏi"
        key={1}
        onChange={(value) =>
          setQuestionContent({
            ...questionContent,
            introduction: initDefaultValue(value as any) as any,
          })
        }
        value={questionContent.introduction}
        focus={focusIndex === "introduction"}
        onClick={() => setFocusIndex("introduction")}
      />

      <div className="question-options row mt-3">
        {questionContent.content.map((option, index) => (
          <div className="question-option col-md-6 col-12 mt-3">
            <OptionQuestionEditor
              preElement={
                <ButtonCheck
                  index={index}
                  active={option.name === questionContent.correctAnswer}
                  onClick={onSelectOption}
                />
              }
              placeHolder="Đáp án A"
              className="option-question-editor"
              key={index}
              value={option.content}
              onChange={(value: any) => setContentOption(value, index)}
              focus={focusIndex === `option ${index}`}
              onClick={() => setFocusIndex(`option ${index}`)}
            />
          </div>
        ))}
      </div>
      <div className="explain-question mt-3">
        <OptionQuestionEditor
          className="introduction-editor"
          placeHolder="Nhập nội dung phần giải thích"
          key={1}
          onChange={(value) =>
            setQuestionContent({
              ...questionContent,
              solve: initDefaultValue(value as any) as any,
            })
          }
          value={questionContent.solve}
          focus={focusIndex === "introduction"}
          onClick={() => setFocusIndex("introduction")}
        />
      </div>
    </div>
  );
};
interface ButtonCheckProps {
  active: boolean;
  index: number;
  onClick: (index: number) => void;
}
const ButtonCheck = (props: ButtonCheckProps) => {
  return (
    <div
      className={`option-Check ${props.active && "active"}`}
      onClick={() => props.onClick(props.index)}
    ></div>
  );
};
const defaultValue = [
  {
    type: "paragraph",
    children: [{ text: "" }],
  },
];
export const initDefaultValue = (value: []) => {
  return value && value.length ? value : defaultValue;
};
const intQuestion = (question: Question) => {
  const questionContent = question;
  if (!questionContent.introduction) {
    questionContent.introduction = initDefaultValue([]) as any;
  }
  if (!questionContent.content) {
    questionContent.content = [
      { name: "A", content: initDefaultValue([]) as any, isTrue: true },
    ];
  }
  if (!questionContent.solve || questionContent.solve.length) {
    questionContent.solve = initDefaultValue([]) as any;
  }
  return questionContent;
};
export default QuestionSelectEditor;
