import {
  faChevronRight,
  faEye,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DocumentTitle } from "models/document/DocumentTitle";
import React from "react";
import { Button, Image } from "react-bootstrap";
import { DocumentTypeLabel } from "settings/document/documentType";
import moment from "moment";
import "./style.scss";
interface Props {
  document: DocumentTitle;
}
const DocumentLabel: React.FC<Props> = ({ document }) => {
  return (
    <div className="document-label">
      <div className="props-img">
        <Image
          src={document.imageUrl || url}
          className="document-avatar"
          thumbnail
        />
        <div className="icon-seen">
          <FontAwesomeIcon icon={faEye} />
          <span>{document.numberDo || 1}</span>
        </div>
      </div>
      <div className="info">
        <a
          className="document-item-title"
          href={`/document/${document.id}/preview`}
        >
          {document.name}
        </a>
        <div className="desription">{document.description}</div>
        <div className="document-type-date">
          <div className="document-type" style={{ flexGrow: 1 }}>
            {document.documentType === DocumentTypeLabel.DOCUMENT
              ? "Tài liệu chuyên đề"
              : "Đề thi"}
          </div>
          <div className="date">
            <span>{moment(document.createdAt).format("DD/MM/YYYY")}</span>
          </div>
        </div>
        <div className="d-flex document-options">
          <div className="button-do" style={{ flexGrow: 1 }}>
            <Button
              size="sm"
              href={`/document/${document.id}`}
              className="btn-do"
            >
              Làm ngay
              <span>
                <FontAwesomeIcon icon={faChevronRight} />
              </span>
            </Button>
          </div>
          <div className="icon">
            <FontAwesomeIcon icon={faHeart} size={"lg"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentLabel;
const url =
  "https://onthiielts.com.vn/wp-content/uploads/2021/07/dap-an-de-thi-thpt-quoc-gia-mon-toan-2021.jpg";
