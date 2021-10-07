import { QuestionSetCreate } from "models/questionSet/QuestionSetCreate";
import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Select from "react-select";
import { questionSetApi } from "services/api/document/questionSetApi";
import { toastService } from "services/toast";
import { questionSetShows } from "settings/question-set/questionSetShows";
interface Props {
  show: boolean;
  setShow: (show: boolean) => void;
  onAdd?: (questionSet: any) => void;
}
const AddQuestionSetModal: React.FC<Props> = (props) => {
  const { id } = useParams<any>();
  const [questionSet, setQuestionSet] = useState<QuestionSetCreate>({
    name: "",
    show: true,
    documentId: id,
  });
  const { show, setShow, onAdd } = props;
  const handleCloseModal = () => {
    setShow(false);
  };
  const handleShowModal = () => {
    setQuestionSet({
      name: "",
      show: true,
      documentId: id,
    });
  };
  const addQuestionSet = () => {
    questionSetApi.create(questionSet).then((res) => {
      if (res.status === 200) {
        toastService.success();
        onAdd && onAdd(res.data);
        handleCloseModal();
      } else {
        toastService.success(res.data.message);
      }
    });
  };
  return (
    <Modal show={show} onHide={handleCloseModal} onShow={handleShowModal}>
      <Modal.Header>
        <Modal.Title>Thêm phần mới</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Label>Tiêu đề phần</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            value={questionSet.name}
            onChange={(e) =>
              setQuestionSet({ ...questionSet, name: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Trạng thái</Form.Label>
          <Select
            options={questionSetShows as any}
            value={questionSetShows.find((i) => i.value === questionSet.show)}
            onChange={(e: any) =>
              setQuestionSet({ ...questionSet, show: e.value })
            }
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Hủy
        </Button>
        <Button variant="primary" onClick={addQuestionSet}>
          Thêm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddQuestionSetModal;
