import React from "react";
import { Button, Modal } from "react-bootstrap";

interface Props {
  show: boolean;
  setShow: (show: boolean) => void;
  onSubmit: () => void;
  title?: any;
  titleSubmit?: string;
}
const SubmitModal: React.FC<Props> = ({
  show,
  setShow,
  children,
  onSubmit,
  title,
  titleSubmit,
}) => {
  const handleCloseModal = () => {
    setShow(false);
  };
  const handelOnSubmit = () => {
    onSubmit();
    handleCloseModal();
  };
  return (
    <Modal show={show} onHide={handleCloseModal}>
      <Modal.Header>
        <Modal.Title>{title || "Bạn có chắc chắn làm điều này"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children || ""}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Hủy
        </Button>
        <Button variant="primary" onClick={handelOnSubmit}>
          {titleSubmit || "Tiếp tục"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SubmitModal;
