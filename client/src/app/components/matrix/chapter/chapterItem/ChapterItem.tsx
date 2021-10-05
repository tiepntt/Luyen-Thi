import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Chapter } from "models/matrix/Chapter";
import React from "react";
import { Button } from "react-bootstrap";
import "./style.scss";
interface Props {
  chapter: Chapter;
  onClick?: () => void;
  onEditClick?: () => void;
  onRemoveClick?: () => void;
}
const ChapterItem: React.FC<Props> = ({
  chapter,
  onClick,
  onEditClick,
  onRemoveClick,
}) => {
  return (
    <div className="chappter-item d-flex" onClick={onClick}>
      <div className="chapter-info d-flex" style={{ flexGrow: 1 }}>
        <div className="chapter-icon">
          <FontAwesomeIcon icon={faBookmark} />
        </div>
        <div className="chapter-name mx-2" style={{ flexGrow: 1 }}>
          {chapter.name}
        </div>
      </div>
      <div className="chapter-option d-flex">
        <Button
          variant="outline-success"
          className="mx-2"
          size="sm"
          onClick={onEditClick}
        >
          Sửa
        </Button>
        <Button
          variant="outline-danger"
          className="mx-2"
          size="sm"
          onClick={onRemoveClick}
        >
          Xóa
        </Button>
      </div>
    </div>
  );
};

export default ChapterItem;
