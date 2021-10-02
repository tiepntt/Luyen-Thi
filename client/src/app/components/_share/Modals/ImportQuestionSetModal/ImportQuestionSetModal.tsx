import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { documentApi } from "services/api/document/documentApi";
import { toastService } from "services/toast";
import { getIdFromUrl, IsGoogleDocUrl } from "utils/urlFunction";
interface Props {
  show: boolean;
  documentId: string;
  setShow: (show: boolean) => void;
  onSuccess?: (questionSets: any) => void;
}
const ImportQuestionSetModal: React.FC<Props> = (props) => {
  const [gDocUrl, setGdocUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const { show, setShow, onSuccess, documentId } = props;
  const handleCloseModal = () => {
    setShow(false);
  };
  const onShowModal = () => {
    setGdocUrl("");
    setLoading(false);
  };
  const handleImport = () => {
    const googleDocId = getIdFromUrl(gDocUrl);
    console.log(googleDocId);

    setLoading(true);
    documentApi.importQuestion(documentId, googleDocId).then((res) => {
      setLoading(false);
      if (res.status === 200) {
        toastService.success();
        onSuccess && onSuccess(res.data);
        handleCloseModal();
      } else {
        toastService.error();
      }
    });
  };

  return (
    <Modal show={show} centered onHide={handleCloseModal} onShow={onShowModal}>
      <Modal.Header>
        <Modal.Title>Cập nhật dữ liệu từ google doc</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label aria-required>Link Google tài liệu</Form.Label>
          <Form.Control
            value={gDocUrl}
            onChange={(e) => setGdocUrl(e.target.value)}
            type="text"
            placeholder="Tên tài liệu"
            spellCheck={false}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Hủy
        </Button>
        <Button
          variant="primary"
          onClick={handleImport}
          disabled={gDocUrl === "" || !IsGoogleDocUrl(gDocUrl) || loading}
        >
          {loading ? "Đang cập nhât" : "Cập nhật"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ImportQuestionSetModal;
