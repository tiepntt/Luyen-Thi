import { TemplateQuestion } from "models/matrix/TemplateQuestion";
import { Unit } from "models/matrix/Unit";
import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { templateQuestionApi } from "services/api/matrix/templateQuestion";
import { toastService } from "services/toast";

interface Props {
  show: boolean;
  setShow: (show: boolean) => void;
  unit?: Unit;
  onAdd?: (template: any) => void;
}
const AddTemplateQuestionModal: React.FC<Props> = (props) => {
  const { show, setShow, onAdd, unit } = props;
  const [loadding, setLoading] = useState(false);
  const [template, setTemplate] = useState<TemplateQuestion>({} as any);
  const handleCloseModal = () => {
    setShow(false);
  };
  const handelOnShow = () => setTemplate({ unitId: unit?.id || "" } as any);
  const addTemplate = () => {
    setLoading(true);
    templateQuestionApi.create(template).then((res: any) => {
      setLoading(false);
      if (res.status === 200) {
        toastService.success();
        onAdd && onAdd(res.data);
        handleCloseModal();
      } else {
        toastService.error(res.message);
      }
    });
  };
  return (
    <Modal centered show={show} onHid={handleCloseModal} onShow={handelOnShow}>
      <Modal.Header className="text-center">
        <Modal.Title className="m-auto">Thêm bài học mới</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={() => {}}>
          <Form.Group>
            <Form.Label>Tên dạng bài</Form.Label>
            <Form.Control
              type="text"
              onChange={(e: any) =>
                setTemplate({ ...template, name: e.target.value })
              }
              placeholder="VD: Bài 1 : Tính biến thiên của hàm số"
            />
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Label>Chuyên đề </Form.Label>
            <Form.Control disabled value={unit?.name} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Hủy
        </Button>
        <Button
          variant="primary"
          type="submit"
          disabled={loadding || !template.name}
          onClick={addTemplate}
        >
          Thêm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddTemplateQuestionModal;
