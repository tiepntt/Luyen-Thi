import { UserCreateModel, UserInfo } from "models/user/userInfo";
import React, { useState } from "react";
import { Button, Col, Form, FormGroup, Modal, Row } from "react-bootstrap";
import Select from "react-select";
import { userApi } from "services/api/user/user";
import { toastService } from "services/toast";
import { roleDefaults } from "settings/user/role";
import "./style.scss";
interface Props {
  show: boolean;
  setShow: (value: boolean) => void;
  onAddUser: (user: UserInfo) => void;
}
const AddUserModalAccount: React.FC<Props> = ({ show, setShow, onAddUser }) => {
  const [user, setUser] = useState<UserCreateModel>({} as any);
  const handleShow = () => {
    setUser({} as any);
  };
  const handleHide = () => {
    setShow(false);
  };
  const onSubmit = (event: any) => {
    event.preventDefault();
    addUser();
  };
  const addUser = () => {
    userApi.createUser(user).then((res) => {
      if (res.status === 200) {
        toastService.success("Thành công");
        handleHide();
        onAddUser(res.data);
      } else {
        toastService.error(res.data.message);
      }
    });
  };

  return (
    <Modal
      show={show}
      onShow={handleShow}
      onHide={handleHide}
      centered
      // size="lg"
      className="modal-add-user"
    >
      <Modal.Header className="justify-content-center">
        <Modal.Title>Thêm người dùng</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Row>
            <FormGroup as={Col}>
              <Form.Label aria-required>Họ và tên đệm</Form.Label>
              <Form.Control
                placeholder="Nguyễn văn"
                onChange={(e) => setUser({ ...user, lastName: e.target.value })}
              />
            </FormGroup>
            <FormGroup as={Col}>
              <Form.Label aria-required>Tên</Form.Label>
              <Form.Control
                placeholder="Tiệp"
                onChange={(e) =>
                  setUser({ ...user, firstName: e.target.value })
                }
              />
            </FormGroup>
          </Row>
          <Row className="mt-2">
            <FormGroup as={Col}>
              <Form.Label aria-required>Email</Form.Label>
              <Form.Control
                placeholder="vidu@luyenthi.vn"
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </FormGroup>
          </Row>
          <Row className="mt-2">
            <FormGroup as={Col}>
              <Form.Label aria-required>Tên đăng nhập</Form.Label>
              <Form.Control
                placeholder="username"
                onChange={(e) => setUser({ ...user, username: e.target.value })}
              />
            </FormGroup>
            <FormGroup as={Col}>
              <Form.Label aria-required>Mật khẩu</Form.Label>
              <Form.Control
                placeholder="123456"
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
            </FormGroup>
          </Row>
          <Row className="mt-2">
            <FormGroup as={Col}>
              <Form.Label aria-required>Vai trò</Form.Label>
              <Select
                className="option-select-role"
                isMulti
                options={roleDefaults}
                isClearable={false}
                placeholder="Chọn vai trò"
                getOptionLabel={(e) => e.name as string}
                onChange={(e) =>
                  setUser({ ...user, roles: e.map((i) => i.value) })
                }
              />
            </FormGroup>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={(e) => handleHide()}>
            Huỷ
          </Button>
          <Button variant="primary" type="submit">
            Thêm
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AddUserModalAccount;
