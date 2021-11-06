import { UnitDetail } from "models/matrix/Unit";
import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { unitApi } from "services/api/matrix/unit";
import { toastService } from "services/toast";
interface Props {
  show: boolean;
  unitId: string;
  setShow: (show: boolean) => void;
  onEditUnit?: (Unit: any) => void;
}
const EditUnitModal: React.FC<Props> = (props) => {
  const { show, setShow, onEditUnit, unitId } = props;
  const [loading, setLoading] = useState(false);

  const [unitDetail, setUnit] = useState<UnitDetail>({} as any);
  const handleCloseModal = () => {
    setShow(false);
  };
  const getDetailUnit = () => {
    unitApi.getById(unitId).then((res) => {
      if (res.status === 200) {
        setUnit(res.data);
      } else {
        setUnit({} as any);
      }
    });
  };
  useEffect(() => {
    getDetailUnit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unitId]);
  const handelOnShow = () => {};
  const handleUpdate = () => {
    setLoading(true);
    unitApi
      .update({ ...unitDetail, chapterId: unitDetail.chapter.id })
      .then((res: any) => {
        setLoading(false);
        if (res.status === 200) {
          // toastService.success();
          handleCloseModal();
          onEditUnit && onEditUnit(res.data);
        } else {
          toastService.error(res.data.message);
        }
      });
  };
  return (
    <Modal show={show} onHide={handleCloseModal} onShow={handelOnShow} centered>
      <Modal.Header>
        <Modal.Title>Thêm chương mới</Modal.Title>
      </Modal.Header>
      {unitDetail.id && (
        <Modal.Body>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Tên Chương</Form.Label>
            <Form.Control
              type="text"
              placeholder="Tên tài liệu"
              spellCheck={false}
              value={unitDetail.name}
              onChange={(e) => setUnit({ ...unitDetail, name: e.target.value })}
            />
          </Form.Group>

          <Form.Group controlId="ex" className="grade-value">
            <Form.Label>Chuyên đề</Form.Label>
            <Form.Control disabled value={unitDetail?.chapter.name} />
          </Form.Group>
        </Modal.Body>
      )}
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Hủy
        </Button>
        <Button
          variant="primary"
          disabled={loading || (unitDetail && unitDetail?.name === "")}
          onClick={handleUpdate}
        >
          Lưu
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditUnitModal;
