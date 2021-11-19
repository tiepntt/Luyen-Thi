import { Question } from "models/question/Question";
import React, { useEffect, useState } from "react";
import OptionQuestionEditor from "./OptionQuestionEditor";
import "./style.scss";
import { Button } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import { questionSetApi } from "services/api/document/questionSetApi";
import { questionApi } from "services/api/question/question";
import { toastService } from "services/toast";
import { useDocumentEditContext } from "hooks/DocumentEditQuestionContext/DocumentEditContext";
import { checkContentNull } from "utils/questionFunction";

interface Props {
  question: Question;
  questionParentId?: string;
}
const QuestionSelectEditor: React.FC<Props> = ({
  question,
  questionParentId,
}) => {
  const [focusIndex, setFocusIndex] = useState("");
  const [questionContent, setQuestionContent] = useState(intQuestion(question));
  const { questionSetId, id } = useParams<any>();
  const { updateQuestion, removeQuestion, removeSubQuestion } =
    useDocumentEditContext();
  const history = useHistory();
  useEffect(() => {
    setQuestionContent(intQuestion(question));
  }, [question]);
  useEffect(() => {
    console.log(questionContent);
  }, [questionContent]);
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
  const update = () => {
    // update question Content
    questionApi
      .updateContent({
        content: questionContent.content,
        introduction: questionContent.introduction,
        solve: questionContent.solve,
        id: questionContent.id,
        correctAnswer: questionContent.correctAnswer,
      })
      .then((res) => {
        if (res.status === 200) {
          updateQuestion(questionSetId, res.data);
          toastService.success("Cập nhật dữ liệu thành công");
        } else {
          toastService.error(res.data.message);
        }
      });
  };
  const remove = () => {
    if (questionParentId) {
      questionApi.remove(questionContent.id).then((res) => {
        if (res.status === 200) {
          toastService.success("Đã xóa");
          removeSubQuestion(questionContent.id);
        }
      });
    } else {
      questionSetApi.removeQuestion(questionSetId, question.id).then((res) => {
        if (res.status === 200) {
          toastService.success("Đã xóa");
          removeQuestion(questionSetId, question.id);
          history.push(`/editor/document/${id}/${questionSetId}`);
        } else {
          toastService.error(res.data.message);
        }
      });
    }
  };
  return (
    <div className="question-select-editor">
      <div className="top-bar-question ">
        <Button variant="outline-primary" className="mx-2" onClick={update}>
          Lưu
        </Button>
        <Button variant="outline-danger" onClick={remove}>
          Xóa
        </Button>
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
          focus={focusIndex === "solve"}
          onClick={() => setFocusIndex("solve")}
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
      { name: "A", content: initDefaultValue([]) as any },
    ];
  }
  if (!questionContent.solve || checkContentNull(question.solve)) {
    questionContent.solve = initDefaultValue([]) as any;
  }
  return questionContent;
};
export default QuestionSelectEditor;
