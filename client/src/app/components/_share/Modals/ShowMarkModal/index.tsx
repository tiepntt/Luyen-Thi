import {
  faCheckCircle,
  faClock,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DocumentHistory } from "models/document/DocumentHistory";
import React from "react";
import { Modal, Button } from "react-bootstrap";
import { TimeFunction } from "utils/timeFunction";
import "./style.scss";
interface Props {
  loading: boolean;
  show: boolean;
  setShow: (value: boolean) => void;
  documentHistory: DocumentHistory;
}
const ShowMarkModal: React.FC<Props> = ({
  show,
  setShow,
  documentHistory,
  loading,
}) => {
  const handleClose = () => {
    setShow(false);
  };
  const mark =
    (documentHistory.numberCorrect * 10) /
    (documentHistory.numberIncorrect + documentHistory.numberCorrect);

  return (
    <Modal
      animation
      show={show}
      onHide={handleClose}
      centered
      className="modal-show-mark pb-5"
      backdrop="static"
    >
      <Modal.Body className="p-3">
        {loading ? (
          <div className="text-center">
            <div className="spinner-loading m-3"></div>
            <div> Đang kiểm tra đáp án</div>
          </div>
        ) : (
          <div>
            <div className="congeration">
              Chúc mừng bạn đã hoàn thành bài thi
            </div>
            <div className="p-1 text-center">
              <div className="text-highlight  mb-1">Kết quả</div>
              <div className="mark-test d-inline-flex">
                {Math.round(mark * 100) / 100}
              </div>
            </div>
            <div className="history-result mt-2">
              <div className="history-info">
                <div className="d-flex">
                  <div className="label time-duration" style={{ flexGrow: 1 }}>
                    <FontAwesomeIcon icon={faClock} />
                    <span className="mx-2">
                      {TimeFunction.convertSeconds(
                        (documentHistory.timeDuration || 0) * 60
                      )}
                    </span>
                  </div>
                  <div className="label correct mx-3">
                    <FontAwesomeIcon icon={faCheckCircle} className="correct" />
                    <span className="mx-2">
                      {documentHistory.numberCorrect}
                    </span>
                  </div>
                  <div className="label incorrect" style={{ flexGrow: 1 }}>
                    <FontAwesomeIcon
                      icon={faTimesCircle}
                      className="incorrect"
                    />
                    <span className="mx-2">
                      {documentHistory.numberIncorrect}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="btn-option">
              <Button
                className="mt-3 button-detail btn btn-success"
                onClick={handleClose}
              >
                Xem chi tiết
              </Button>
            </div>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default ShowMarkModal;
