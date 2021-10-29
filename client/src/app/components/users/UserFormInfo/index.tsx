import { UserInfo } from "models/user/userInfo";
import React from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import Select from "react-select";
import { genders } from "settings/user/gender";
import moment from "moment";
import "./style.scss";
import DatePicker from "react-date-picker";
interface Props {
  user?: UserInfo;
  setUser: (user: UserInfo) => void;
  onUpdate: () => void;
}
const UserFormInfo: React.FC<Props> = ({ user, setUser, onUpdate }) => {
  return (
    <Form className="user-form">
      <Row>
        <Form.Group
          as={Col}
          className="mb-3 ml-2"
          controlId="formBasicUsername"
        >
          <Form.Label>Tên đăng nhập</Form.Label>
          <Form.Control
            placeholder="nguyenthaitiep206"
            disabled
            value={user?.username}
          />
        </Form.Group>
        <Form.Group
          as={Col}
          className="mb-3 mr-2"
          controlId="formBasicUsername"
        >
          <Form.Label>Email</Form.Label>
          <Form.Control placeholder="email" disabled value={user?.email} />
        </Form.Group>
        <Form.Group as={Col} controlId="formBasicName">
          <Form.Label>Trạng thái</Form.Label>
          <Form.Control
            disabled
            value={user?.emailConfirmed ? "Đã xác thực" : "Chưa xác thực"}
          />
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formBasicSurname">
          <Form.Label>Họ và tên đệm</Form.Label>
          <Form.Control
            placeholder="Nguyễn Thái"
            value={user?.lastName}
            spellCheck={false}
            onChange={(e) =>
              user && setUser({ ...user, lastName: e.target.value as any })
            }
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formBasicName">
          <Form.Label>Tên</Form.Label>
          <Form.Control
            placeholder="Tiệp"
            spellCheck={false}
            value={user?.firstName}
            onChange={(e) =>
              user && setUser({ ...user, firstName: e.target.value as any })
            }
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formBasicName">
          <Form.Label>Giới tính</Form.Label>
          <Select
            options={genders}
            getOptionLabel={(e: any) => e.name}
            value={genders.find((i) => i.value === user?.gender)}
            onChange={(e: any) =>
              user && setUser({ ...user, gender: e.value as any })
            }
          />
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formBasicSurname">
          <Form.Label>Ngày sinh</Form.Label>
          <Form.Control
            as={DatePicker}
            format="dd/MM/yyyy"
            clearIcon={null}
            value={new Date(moment.utc(user?.birthDay).toString()) as any}
            onChange={(e) => user && setUser({ ...user, birthDay: e as any })}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formBasicName">
          <Form.Label>Số điện thoại</Form.Label>
          <Form.Control
            value={user?.phoneNumber}
            onChange={(e) =>
              user && setUser({ ...user, phoneNumber: e.target.value })
            }
          />
        </Form.Group>
      </Row>

      <div className="text-center">
        <Button
          className="button-submit-profile"
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            onUpdate();
          }}
        >
          Cập nhật
        </Button>
      </div>
    </Form>
  );
};

export default UserFormInfo;
