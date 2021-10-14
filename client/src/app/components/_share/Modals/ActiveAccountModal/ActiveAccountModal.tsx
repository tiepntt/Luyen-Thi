import { User } from "models/user/userInfo";
import React, { useState } from "react";
import { Button, Form, Modal, ModalBody, ModalTitle } from "react-bootstrap";
import ModalHeader from "react-bootstrap/esm/ModalHeader";
import { authApi } from "services/api/auth/auth";
import { toastService } from "services/toast";
interface Props {
  show: boolean;
  setShow: (show: boolean) => void;
  user?: User;
  onActive?: () => void;
}
const ActiveAccountModal: React.FC<Props> = ({
  user,
  onActive,
  show,
  setShow,
}) => {
  const [loadding, setLoadding] = useState(false);
  const [resetCount, setResetCount] = useState(0);
  const [activeCode, setActiveCode] = useState("");
  const onShow = () => {
    setActiveCode("");
  };
  const handleHideModal = () => setShow(false);
  const onSubmit = (event: any) => {
    event.preventDefault();
    setLoadding(true);
    authApi.active(activeCode).then((res) => {
      setLoadding(false);
      if (res.status === 200) {
        handleHideModal();
        onActive && onActive();
        toastService.success();
      } else {
        toastService.error(res.data.message);
      }
    });
  };
  const onReset = () => {
    setLoadding(true);
    setResetCount(resetCount + 1);
    authApi.resend().then((res) => {
      setLoadding(false);
      if (res.status !== 200) {
        toastService.error(res.data.message);
      }
    });
  };
  return (
    <Modal show={show} className={" pt-5 mt-5 mb-3 pb-5"} onShow={onShow}>
      <ModalHeader className="justify-content-center">
        <ModalTitle className="text-center">Xác thực tài khoản</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <div>
          Một mã xác nhận đã được gửi về email <b>{user?.email}</b>
        </div>
        <div>Vui lòng nhập mã xác nhận để tiếp tục sử dụng dịch vụ</div>
        <Form className="mt-3" onSubmit={onSubmit}>
          <Form.Group>
            <Form.Control
              placeholder="Mã xác thực"
              value={activeCode}
              onChange={(e) => setActiveCode(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="text-center mt-2">
            <Button
              type="button"
              className="mt-3 mb-3 mx-3"
              variant="warning"
              disabled={loadding}
              onClick={onReset}
            >
              Gửi lại mã
            </Button>
            <Button
              type="submit"
              className="mt-3 mb-3 mx-3"
              disabled={loadding || resetCount > 3}
            >
              Xác thực
            </Button>
          </Form.Group>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default ActiveAccountModal;
