import { faEnvelope, faPhoneAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Facebook, GitHub, YouTube } from "@material-ui/icons";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./style.scss";
const AppFooter = () => {
  return (
    <div className="app-footer">
      <Container>
        <Row>
          <Col lg={4} md={6}>
            <div className="logo-label mb-3">iPractice</div>
            <div className="d-flex mt-1">
              <span className="icon-label">
                <FontAwesomeIcon icon={faPhoneAlt} />
              </span>
              <span>(+84) 819 200 620</span>
            </div>
            <div className="d-flex mt-1">
              <span className="icon-label">
                <FontAwesomeIcon icon={faEnvelope} />
              </span>
              <span>nguyenthaitiep206@gmail.com</span>
            </div>
            <div className="d-flex mt-2 social">
              <span className="icon-social">
                <Facebook />
              </span>
              <span className="icon-social mx-2">
                <GitHub />
              </span>
              <span className="icon-social mx-2">
                <YouTube />
              </span>
            </div>
          </Col>
          <Col lg={4} md={6} className="mt-3">
            <div className="label mb-2">Đề thi theo môn</div>
            <Row>
              <Col lg={6} md={6} xs={6}>
                <div className="mt-1">Toán học</div>
                <div className="mt-1">Tiếng Anh</div>
                <div className="mt-1">Vật lý</div>
                <div className="mt-1">Hóa học</div>
              </Col>
              <Col lg={6} md={6} xs={6}>
                <div className="mt-1">Sinh học</div>
                <div className="mt-1">Lịch sử</div>
                <div className="mt-1">Địa lý</div>
                <div className="mt-1">Giáo dục công dân</div>
              </Col>
            </Row>
          </Col>
          <Col lg={2} md={6} xs={6} className="mt-3">
            <Row>
              <div className="label mb-2">Ôn luyện</div>
              <div className="mt-1">Lớp 10</div>
              <div className="mt-1">Lớp 11</div>
              <div className="mt-1">Lớp 12</div>
              <div className="mt-1">Ôn thi THPT Quốc gia</div>
            </Row>
          </Col>
          <Col lg={2} md={6} xs={6} className="mt-3">
            <Row>
              <div className="label mb-2">Hỗ trợ</div>
              <div className="mt-1">Báo cáo</div>
              <div className="mt-1">Hướng dẫn sử dụng</div>
              <div className="mt-1">Nhóm hỗ trợ học tập</div>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AppFooter;
