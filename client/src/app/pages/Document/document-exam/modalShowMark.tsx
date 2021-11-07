import React from "react";
import { Modal, Button } from "react-bootstrap";

interface Props {
  loading: boolean;
  show: boolean;
  handleClose: any;
  getMark: any;
  documentHistory: any;
}
const ModalShowMark: React.FC<Props> = ({
  show,
  handleClose,
  getMark,
  documentHistory,
  loading,
}) => {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      className="modal-show-mark pb-5"
    >
      <div className="modal-header">
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
          onClick={() => handleClose()}
        ></button>
      </div>
      <Modal.Body className="text-center pb-5">
        <div>Chúc mừng bạn đã hoàn thành bài thi</div>
        {loading ? (
          <>
            <div className="spinner-loading m-3"></div>
            <div> Đợi chút để chúng tôi tính điểm nhé</div>
          </>
        ) : (
          <>
            <div className="d-inline-block p-3">
              <div className="text-highlight p-1">Kết quả</div>
              <div className="mark-test">{getMark()}</div>
            </div>
            <div className="text-highlight p-1">
              Số câu đúng: {documentHistory.numberCorrect}{" "}
            </div>
            <div className="text-highlight p-1">
              Số câu sai: {documentHistory.numberIncorrect}{" "}
            </div>
            <div>
              <Button className="mt-3 button-detail btn btn-success">
                Xem chi tiết
              </Button>
            </div>
          </>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default ModalShowMark;
