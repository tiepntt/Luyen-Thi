import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button, Image } from "react-bootstrap";
import moment from "moment";
import "./style.scss";
interface Props {
  history: any;
}
const DocumentHistory: React.FC<Props> = ({ history }) => {
  const document = history.document;

  return (
    <div className="document-history mt-3 mx-3">
      <div className="props-img">
        <Image
          src={document.imageUrl || url}
          className="document-avatar"
          thumbnail
        />
      </div>
      <div className="info">
        <a
          className="document-item-title"
          href={`/document/${document.id}/preview`}
        >
          {document.name}
        </a>
        <div className="desription">{document.description}</div>
        <div className="mt-2">
          <b>Kết quả: </b>
          <span className="text-danger">
            {history.numberCorrect}/ {history.numberIncorrect}
          </span>
        </div>
        <div>
          <b>Ngày làm: </b>
          <span>{moment(history.startTime).format("DD/MM/YYYY")}</span>
        </div>

        <div className="d-flex document-options">
          <div className="button-do">
            <Button
              href={`/document/${document.id}?historyId=${history.id}`}
              className="btn-do"
            >
              Xem lại
              <span>
                <FontAwesomeIcon icon={faChevronRight} />
              </span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentHistory;
const url =
  "https://onthiielts.com.vn/wp-content/uploads/2021/07/dap-an-de-thi-thpt-quoc-gia-mon-toan-2021.jpg";
