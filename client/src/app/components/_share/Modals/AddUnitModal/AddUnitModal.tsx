import { Chapter } from "models/matrix/Chapter";
import { UnitCreate } from "models/matrix/Unit";

import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { unitApi } from "services/api/matrix/unit";
import { toastService } from "services/toast";

interface Props {
  show: boolean;
  setShow: (show: boolean) => void;
  chapter?: Chapter;
  onAddUnit?: (unit: any) => void;
}
const AddUnitModal: React.FC<Props> = (props) => {
  const { show, setShow, onAddUnit, chapter } = props;
  const [loadding, setLoaddig] = useState(false);
  const [unit, setUnit] = useState<UnitCreate>({} as any);
  const handleCloseModal = () => {
    setShow(false);
  };
  const handelOnShow = () => {
    setUnit({
      name: "",
      chapterId: chapter?.id || "",
    });
  };
  const addUnit = () => {
    if (!unit.name) {
      return;
    }
    setLoaddig(true);
    unitApi.addUnit(unit).then((res: any) => {
      setLoaddig(false);
      if (res.status === 200) {
        toastService.success();
        onAddUnit && onAddUnit(res.data);
        handleCloseModal();
      } else {
        toastService.success(res.messsage);
      }
    });
  };

  return (
    <Modal centered show={show} onHid={handleCloseModal} onShow={handelOnShow}>
      <Modal.Header className="text-center">
        <Modal.Title className="m-auto">Thêm bài học mới</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={addUnit}>
          <Form.Group>
            <Form.Label>Tên bài học</Form.Label>
            <Form.Control
              type="text"
              onChange={(e: any) => setUnit({ ...unit, name: e.target.value })}
              placeholder="VD: Bài 1 : Tính biến thiên của hàm số"
            />
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Label>Chuyên đề </Form.Label>
            <Form.Control disabled value={chapter?.name} />
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
          disabled={loadding || !unit.name}
          onClick={addUnit}
        >
          Thêm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddUnitModal;
