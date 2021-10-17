import { Grade } from "hooks/Grade-Subject/useGrades";
import { Subject } from "hooks/Grade-Subject/useSubjects";
import React, { useState } from "react";
import Select from "react-select";
import "./style.scss";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { documentTypes } from "settings/document/documentType";
import { documentApi } from "services/api/document/documentApi";
import { toastService } from "services/toast";
interface Props {
  show: boolean;
  setShow: (show: boolean) => void;
  grade: Grade;
  subject: Subject;
  onAddDocument?: (document: any) => void;
}
const AddDocumentModal: React.FC<Props> = (props) => {
  const { show, grade, setShow, subject, onAddDocument } = props;
  const handleCloseModal = () => {
    setShow(false);
  };

  const [documentType, setDocumentType] = useState("");
  const [documentName, setDocumentName] = useState("");
  const [documentDescription, setDocumentDescription] = useState("");
  const handleShowModal = () => {
    setDocumentType("");
    setDocumentName("");
    setDocumentDescription("");
  };
  const handleClickAddButton = () => {
    documentApi
      .create({
        name: documentName,
        documentType: Number((documentType as any).value),
        description: documentDescription,
        gradeId: grade.id,
        subjectId: subject.id,
      })
      .then((res) => {
        if (res.status === 200) {
          toastService.success();
          onAddDocument && onAddDocument(res.data);
          handleCloseModal();
        } else {
          toastService.error();
        }
      });
  };
  return (
    <Modal
      show={show}
      onHide={handleCloseModal}
      onShow={handleShowModal}
      centered
    >
      <Modal.Header>
        <Modal.Title>Thêm tài liệu</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Tên tài liệu</Form.Label>
          <Form.Control
            value={documentName}
            onChange={(e) => setDocumentName(e.target.value)}
            type="text"
            placeholder="Tên tài liệu"
            spellCheck={false}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Loại tài liệu</Form.Label>
          <Select
            value={documentType}
            onChange={setDocumentType as any}
            options={documentTypes as any}
          />
        </Form.Group>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="ex" className="grade-value">
            <Form.Label>Lớp</Form.Label>
            <Form.Control type="text" value={grade.name} disabled />
          </Form.Group>

          <Form.Group as={Col} controlId="ex1">
            <Form.Label>Môn</Form.Label>
            <Form.Control type="text" value={subject.name} disabled />
          </Form.Group>
        </Row>
        <Form.Group className="mb-3" controlId="ex2">
          <Form.Label>Mô tả tài liệu</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            spellCheck={false}
            value={documentDescription}
            onChange={(e) => setDocumentDescription(e.target.value)}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Hủy
        </Button>
        <Button variant="primary" onClick={handleClickAddButton}>
          Thêm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddDocumentModal;
