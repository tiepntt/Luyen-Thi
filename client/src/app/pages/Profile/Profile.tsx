import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Form, Button, Row, Col } from "react-bootstrap";
import DatePicker from "react-datepicker";

import "./style.scss";

const ProfilePage: React.FC = () => {
  return (
    <div className="profile">
      <div className="header-profile">
        <div className="item-header item-active">
          <FontAwesomeIcon icon={faUser} className="icon" />
          <span className="label-item">Thông tin cá nhân</span>
        </div>
        <div className="item-header">
          <FontAwesomeIcon icon={faUser} className="icon" />
          <span className="label-item">Kết quả học tập</span>
        </div>
        <div className="item-header">
          <FontAwesomeIcon icon={faUser} className="icon" />
          <span className="label-item">Tài liệu đã làm</span>
        </div>
      </div>

      <div className="body-profile">
        <div className="profile-info-left">
          <div className="avt-image"></div>
          <div className="m-3">
            <h5 className="profile-name-user">Nguyễn Thái Tiệp</h5>
            <div>Quản trị viên</div>
          </div>
        </div>
        <div className="profile-info-right">
          <h5 className="profile-info-title">THÔNG TIN CÁ NHÂN</h5>
          <Form className="my-4">
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>Tên đăng nhập</Form.Label>
              <Form.Control placeholder="nguyenthaitiep206" />
            </Form.Group>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formBasicSurname">
                <Form.Label>Họ và tên đệm</Form.Label>
                <Form.Control placeholder="Nguyễn Thái" />
              </Form.Group>

              <Form.Group as={Col} controlId="formBasicName">
                <Form.Label>Tên</Form.Label>
                <Form.Control placeholder="Tiệp" />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formBasicSurname">
                <Form.Label>Ngày sinh</Form.Label>
                <Form.Control
                  as={DatePicker}
                  name="birthDay"
                  maxDate={new Date()}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="31/08/2000"
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formBasicName">
                <Form.Label>Giới tính</Form.Label>
                <Form.Control placeholder="Nam" />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formBasicSurname">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  name="email"
                  placeholder="nguyenthaitiep206@gamil.com"
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formBasicName">
                <Form.Label>Số điện thoại</Form.Label>
                <Form.Control placeholder="097687547" />
              </Form.Group>
            </Row>
            <div className="text-center">
              <Button className="button-submit-profile" type="submit">
                Cập nhật
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
