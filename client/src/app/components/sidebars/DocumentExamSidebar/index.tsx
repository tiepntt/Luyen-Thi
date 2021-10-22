import React from "react";
import "./style.scss";
import ClockIcon from "assets/images/document/Clock.png";
import { Button, Image } from "react-bootstrap";
const DocumentExamSidebar = () => {
  return (
    <div id="document-exam-sidebar">
      <div className="time-block d-flex">
        <div className="label">
          <Image src={ClockIcon as any} width={48} height={48} />
        </div>
        <div className="time-run text-center w-100" style={{ flexGrow: 1 }}>
          01:00:00
        </div>
      </div>
      <div className="index-list">
        <div className="question-index-list">
          {Array(50)
            .fill(null)
            .map((_, i) => (
              <div className="question-index-item">{1 + i}</div>
            ))}
        </div>
      </div>
      <div className="btn-option">
        <Button className="btn-submit">Nộp bài</Button>
      </div>
    </div>
  );
};

export default DocumentExamSidebar;
