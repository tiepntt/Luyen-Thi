import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import QuestionImagePreview from "app/components/question/QuestionImagePrivew/QuestionImagePreview";
import { useDocumentEditContext } from "hooks/DocumentEditQuestionContext/DocumentEditContext";
import {
  defaultQuestionGroup,
  defaultQuestionMultipleChocie,
  QuestionCreate,
} from "models/question/Question";
import { QuestionSetDetail } from "models/questionSet/QuestionSetDetail";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router";
import { questionSetApi } from "services/api/document/questionSetApi";
import { toastService } from "services/toast";
import "./style.scss";
interface Props {
  questionSet: QuestionSetDetail;
  index: number;
}
const QuestionSetItem: React.FC<Props> = (props) => {
  const { questionSet, index } = props;
  const { id, questionSetId = "" } = useParams<any>();
  const [showQueston, setShowQueston] = useState(
    !index || questionSet.id === questionSetId
  );
  const { addQuestion } = useDocumentEditContext();
  const history = useHistory();
  const location = useLocation();
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const createQuestionSelect = () => {
    const question = { ...defaultQuestionMultipleChocie };
    createQuestion(question);
  };
  const createQuestionGroup = () => {
    const question = { ...defaultQuestionGroup };
    createQuestion(question);
  };
  const createQuestion = (question: QuestionCreate) => {
    questionSetApi.addQuestion(questionSet.id, question).then((res) => {
      if (res.status === 200) {
        toastService.success();
        history.push(`/editor/document/${id}/${questionSet.id}/${res.data.id}`);
        addQuestion(questionSet.id, res.data);
      } else {
        toastService.error(res.data.massage);
      }
    });
  };
  return (
    <div className="question-item-editor">
      <div className="question-set-info d-flex">
        <div
          className="question-set-name"
          style={{ flexGrow: 1 }}
          onClick={() => {
            setShowQueston(!showQueston);
            history.push(
              `/editor/document/${questionSet.documentId}/${questionSet.id}`
            );
          }}
        >
          {questionSet.name}
        </div>
        <div className="btn-options ">
          <div className="show-btn mx-1 mb-1">
            <FontAwesomeIcon icon={questionSet.show ? faEye : faEyeSlash} />
          </div>
        </div>
      </div>
      <div className="question-list">
        {showQueston && (
          <>
            {questionSet.questions.map((question, i) => {
              return (
                <QuestionImagePreview
                  key={i}
                  question={question}
                  index={i + 1}
                  questionSetId={questionSet.id}
                />
              );
            })}
            <div className="row add-btns">
              <div
                className="col-md-6 question-add-btn"
                onClick={createQuestionSelect}
              >
                <div className="icon">+</div>
                <div className="label-add">Thêm câu hỏi</div>
              </div>
              <div
                className="col-6 question-add-btn"
                onClick={createQuestionGroup}
              >
                <div className="icon">+</div>
                <div className="label-add">Thêm bộ câu hỏi</div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default QuestionSetItem;
