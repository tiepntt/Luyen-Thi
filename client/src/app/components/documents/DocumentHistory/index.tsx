import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button, Image } from "react-bootstrap";
import moment from "moment";
import "./style.scss";
import { DocumentHistoryDetail } from "models/document/DocumentHistory";
interface Props {
  history: DocumentHistoryDetail;
}
const DocumentHistory: React.FC<Props> = ({ history }) => {
  console.log(history);

  const document = history.document;

  return (
    <div className="document-history mt-3 mx-3">
      <div className="info">
        <a
          className="document-item-title"
          href={`/document/${document.id}/preview`}
        >
          {document.name}
        </a>
        <div className="desription">{document.description}</div>
        <div className="history-info d-flex mt-2">
          <div className="result" style={{ flexGrow: 1 }}>
            <span>Kết quả: </span>
            <span className="point">
              {Math.round(
                (history.numberCorrect * 100) /
                  (history.numberIncorrect + history.numberCorrect || 1)
              ) / 100}
            </span>
          </div>
          <div className="date-change">
            <span>Ngày làm: </span>
            <span>{moment(history.startTime).format("DD/MM/YYYY")}</span>
          </div>
        </div>

        <div className="d-flex document-options">
          <div className="button-do">
            <Button href={`/document/${document.id}`} className="btn-do m-2">
              Làm lại
              <span>
                <FontAwesomeIcon icon={faChevronRight} />
              </span>
            </Button>
            <Button href={`/document/${document.id}`} className="btn-do">
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
