import {
  defaultQuestionMultipleChocie,
  Question,
} from "models/question/Question";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import OptionQuestionEditor from "../QuestionSelectEditor/OptionQuestionEditor";
import "./style.scss";
import QuestionSelectEditor, {
  initDefaultValue,
} from "../QuestionSelectEditor/QuestionSelect";
import { questionApi } from "services/api/question/question";
import { toastService } from "services/toast";
import { questionSetApi } from "services/api/document/questionSetApi";
import { useParams } from "react-router";
import { useDocumentEditContext } from "hooks/DocumentEditQuestionContext/DocumentEditContext";
import Loading from "app/components/_share/StaticLayout/Loading";
interface Props {
  question: Question;
  questionParentId?: string;
}
const QuestionGroupEditor: React.FC<Props> = ({ question }) => {
  const [focusIndex, setFocusIndex] = useState("");
  const [questionContent, setQuestionContent] = useState(intQuestion(question));
  const { questionSetId } = useParams<any>();
  const [onAdding, setOnAdding] = useState(false);
  const { removeQuestion } = useDocumentEditContext();
  useEffect(() => {
    setQuestionContent(intQuestion(question));
  }, [question]);
  const remove = () => {
    let confirm = window.confirm("Bạn muốn xóa bộ câu hỏi này");
    if (confirm) {
      questionSetApi
        .removeQuestion(questionSetId, questionContent.id)
        .then((res) => {
          if (res.status === 200) {
            toastService.success("Đã xóa");
            removeQuestion(questionSetId, questionContent.id);
          } else {
            toastService.error(res.data.message);
          }
        });
    }
  };
  const addSubQuestion = () => {
    setOnAdding(true);
    var question = { ...defaultQuestionMultipleChocie };
    question.parentId = questionContent.id;
    questionApi.add(question).then((res) => {
      setOnAdding(false);
      if (res.status === 200) {
        let newQuestion = { ...questionContent };
        newQuestion.subQuestions.push(res.data);
        setQuestionContent(newQuestion);
      } else {
        toastService.error(res.data.messaga);
      }
    });
  };
  const update = () => {
    questionApi
      .updateContent({
        id: questionContent.id,
        content: questionContent.content,
        solve: questionContent.solve,
        correctAnswer: questionContent.correctAnswer,
        introduction: questionContent.introduction,
      })
      .then((res) => {
        if (res.status === 200) {
          toastService.success("Đã lưu");
        } else {
          toastService.error(res.data.message);
        }
      });
  };
  return (
    <div className="question-edit-group">
      <div className="top-bar-question question-group">
        <Button variant="outline-primary" className="mx-2" onClick={update}>
          Lưu
        </Button>
        <Button variant="outline-danger" onClick={remove}>
          Xóa
        </Button>
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
        <QuestionSelectEditor
          key={i}
          question={subQuestion}
          questionParentId={questionContent.id}
        />
      ))}
      {onAdding && <Loading />}
      <div className="add-option text-center">
        <Button variant="outline-primary" onClick={addSubQuestion}>
          Thêm câu hỏi con
        </Button>
      </div>
    </div>
  );
};

export default QuestionGroupEditor;
const intQuestion = (question: Question) => {
  const questionContent = question;
  if (!questionContent.introduction) {
    questionContent.introduction = initDefaultValue([]) as any;
  }
  if (!questionContent.subQuestions) {
    questionContent.subQuestions = [];
  }
  return questionContent;
};
