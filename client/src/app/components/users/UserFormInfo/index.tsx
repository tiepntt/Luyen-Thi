import React from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import ReactDatePicker from "react-datepicker";

const UserFormInfo = () => {
  return (
    <Form>
      <Row>
        <Form.Group
          as={Col}
          className="mb-3 ml-2"
          controlId="formBasicUsername"
        >
          <Form.Label>Tên đăng nhập</Form.Label>
          <Form.Control placeholder="nguyenthaitiep206" disabled />
        </Form.Group>
        <Form.Group
          as={Col}
          className="mb-3 mr-2"
          controlId="formBasicUsername"
        >
          <Form.Label>Email</Form.Label>
          <Form.Control
            placeholder="email"
            disabled
            value="Nguyenthaitiep206@gmail.com"
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formBasicName">
          <Form.Label>Số điện thoại</Form.Label>
          <Form.Control placeholder="097687547" />
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formBasicSurname">
          <Form.Label>Họ và tên đệm</Form.Label>
          <Form.Control placeholder="Nguyễn Thái" />
        </Form.Group>
        <Form.Group as={Col} controlId="formBasicName">
          <Form.Label>Tên</Form.Label>
          <Form.Control placeholder="Tiệp" />
        </Form.Group>
        <Form.Group as={Col} controlId="formBasicName">
          <Form.Label>Giới tính</Form.Label>
          <Form.Control placeholder="Nam" />
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formBasicSurname">
          <Form.Label>Ngày sinh</Form.Label>
          <Form.Control
            as={ReactDatePicker}
            name="birthDay"
            maxDate={new Date()}
            dateFormat="dd/MM/yyyy"
            placeholderText="31/08/2000"
          />
        </Form.Group>
      </Row>

      <div className="text-center">
        <Button className="button-submit-profile" type="submit">
          Cập nhật
        </Button>
      </div>
    </Form>
  );
};

export default UserFormInfo;
