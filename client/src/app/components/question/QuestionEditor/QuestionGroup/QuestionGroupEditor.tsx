import { Question } from "models/question/Question";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import OptionQuestionEditor from "../QuestionSelectEditor/OptionQuestionEditor";
import "./style.scss";
import QuestionSelectEditor, {
  initDefaultValue,
} from "../QuestionSelectEditor/QuestionSelect";
interface Props {
  question: Question;
  questionParentId?: string;
}
const QuestionGroupEditor: React.FC<Props> = ({ question }) => {
  const [focusIndex, setFocusIndex] = useState("");
  const [questionContent, setQuestionContent] = useState(intQuestion(question));
  useEffect(() => {
    setQuestionContent(intQuestion(question));
  }, [question]);
  // const setContentOption = (value: [], index: number) => {
  //   const content = initDefaultValue(value);
  //   let options = [...questionContent.content];
  //   const option = {
  //     ...options[index],
  //     content: content,
  //   };

  //   options[index] = option as any;
  //   setQuestionContent({ ...questionContent, content: options });
  // };
  // const onSelectOption = (index: number) => {
  //   let options = [...questionContent.content];
  //   let newQuestion = { ...questionContent };
  //   newQuestion.correctAnswer = options[index].name;
  //   setQuestionContent(newQuestion);
  // };
  return (
    <div className="question-edit-group">
      <div className="top-bar-question question-group">
        <Button variant="outline-primary" className="mx-2">
          Lưu
        </Button>
        <Button variant="outline-danger">Xóa</Button>
      </div>
      <div className="group-content">
        <OptionQuestionEditor
          className="introduction-editor"
          placeHolder="Nhập nội dung dùng chung"
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
      </div>
      {questionContent.subQuestions.map((subQuestion, i) => (
        <QuestionSelectEditor key={i} question={subQuestion} />
      ))}
      <div className="add-option">Thêm câu hỏi</div>
    </div>
  );
};

export default QuestionGroupEditor;
const intQuestion = (question: Question) => {
  const questionContent = question;
  if (!questionContent.introduction) {
    questionContent.introduction = initDefaultValue([]) as any;
  }
  return questionContent;
};
