import { faEdit, faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import QuestionImagePreview from "app/components/question/QuestionImagePrivew/QuestionImagePreview";
import { QuestionSetDetail } from "models/questionSet/QuestionSetDetail";
import React, { useState } from "react";
import "./style.scss";
interface Props {
  questionSet: QuestionSetDetail;
  index: number;
}
const QuestionSetItem: React.FC<Props> = (props) => {
  const { questionSet, index } = props;
  const [showQueston, setShowQueston] = useState(!index);
  return (
    <div className="question-item-editor">
      <div className="question-set-info d-flex">
        <div
          className="question-set-name"
          style={{ flexGrow: 1 }}
          onClick={() => setShowQueston(!showQueston)}
        >
          {questionSet.name || "Bộ câu hỏi"}
        </div>
        <div className="btn-options ">
          <div className="show-btn mx-1 mb-1">
            <FontAwesomeIcon icon={faEye} />
          </div>
          <div className="edit-btn mx-1 mb-1">
            <FontAwesomeIcon icon={faEdit} />
          </div>
          <div className="remove-btn mx-1 mt-2">
            <FontAwesomeIcon icon={faTrash} />
          </div>
        </div>
      </div>
      <div className="question-list">
        {showQueston &&
          questionSet.questions.map((question, i) => {
            return (
              <QuestionImagePreview key={i} question={question} index={i + 1} />
            );
          })}
      </div>
    </div>
  );
};

export default QuestionSetItem;
