import React from "react";
import { Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { DocumentHistoryStatus } from "settings/document/documentHistory";
import "./style.scss";
interface Props {
  status?: DocumentHistoryStatus;
  documentId?: string;
  continueExam: () => void;
  startExam: () => void;
}
const DocumentPreviewTopBar: React.FC<Props> = ({
  status,
  startExam,
  continueExam,
  documentId,
}) => {
  const NavItem = ({ path = "", title = "" }) => (
    <NavLink
      className="preview-tag-buton"
      activeClassName="active"
      to={`/document/${documentId}/preview${path}`}
    >
      {title}
    </NavLink>
  );
  return (
    <div className="top-document-preview-options  d-flex ">
      <div className="nav-items d-flex" style={{ flexGrow: 1 }}>
        <NavItem path="/question" title="Nội dung" />
        <NavItem path="/rank" title="Xếp hạng" />
      </div>
      <div className="start-btn d-inline-flex">
        {status === DocumentHistoryStatus.Close && (
          <Button className="btn-submit btn-recheck" onClick={continueExam}>
            Xem lại bài làm
          </Button>
        )}
        {status === DocumentHistoryStatus.Doing ? (
          <Button className="btn-submit mx-1" onClick={continueExam}>
            Làm tiếp
          </Button>
        ) : (
          <Button className="btn-submit mx-1" onClick={startExam}>
            {status === DocumentHistoryStatus.Close
              ? "Làm lại"
              : "Bắt đầu làm bài"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default DocumentPreviewTopBar;
