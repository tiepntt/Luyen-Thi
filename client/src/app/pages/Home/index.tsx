import React from "react";
import "./style.scss";
import polygon from "../../../assets/images/homepage/polygon.png";
import hero from "../../../assets/images/homepage/hero.png";
import human from "../../../assets/images/homepage/human_reading.png";
import { Col, Container, Row, Button } from "react-bootstrap";
const HomePage: React.FC = () => {
  return (
    <div id="home-page">
      <div className="content-home-page">
        <div className="block-carousels d-flex align-items-center">
          <Container>
            <Row>
              <Col>
              <div className="header-intro mx-1 text-start">
                <h1>Giải Pháp Thi Trắc Nghiệm </h1>
                <h1>Trên Nền Tảng Số</h1>
              </div>
              </Col>
              <Col className="d-flex mt-5">
              <ul className="list-polygon d-flex mx-5">
                <li>
                  <img src={polygon} width="8px" alt="polygon" />
                </li>
                <li>
                  <img src={polygon} width="8px" alt="polygon" />
                </li>
                <li>
                  <img src={polygon} width="8px" alt="polygon" />
                </li>
              </ul>
              <h1 className="ml-10" style={{ color: "#63FFE2" }}>
                IPRACTICE
              </h1>
              </Col>
            </Row>
          </Container>
        </div>
        <Row> 
          <Col>
          <img src={hero} width="300px" alt="hero"/>
          <div className="position-relative" style={{bottom: "80px"}}>
            <Button className="working-button" href="/practice">Làm bài ngay</Button>
          </div>
          </Col>
        </Row> 
        <Row className="document-section">
          <Col className="document-list left align-items-end">
            <div>TOÁN</div> 
            <div className="position-relative" style={{right: "32px"}}>VĂN</div> 
            <div>VẬT LÝ</div> 
          </Col>
          <Col className="document-center fw-bold my-4">
            <h1 className="fw-bold">Tài Liệu</h1>
            <img src={human} width="300x" alt="human" />
            <h3 className="mt-5 fw-bold">Tài liệu đa dạng phong phú</h3>
          </Col>
          <Col className="document-list right">
            <div>HÓA HỌC</div> 
            <div className="position-relative" style={{left: "32px"}}>SINH HỌC</div> 
            <div>TIẾNG ANH</div> 
          </Col>
        </Row>
        <div className="test-section text-center d-flex flex-column justify-content-between align-items-center">
          <h1 className="mt-5">Đề Thi</h1>
          <div className="list-class">
            <div className="d-flex">
              <div className="class-10">Lớp 10<hr></hr></div>
              <div className="class-11">Lớp 11<hr></hr></div>  
            </div> 
            <div className="d-flex"> 
              <div className="class-12">Lớp 12<hr></hr></div>
              <div className="national-test">Ôn thi THPT quốc gia<hr></hr></div>
            </div> 
          </div>
          <h5 className="mb-5">Bộ Đề Thi - Phân chia theo lớp phù hợp với tất cả đối tượng học sinh</h5>
        </div> 
        <div className="learning-path d-flex justify-content-center align-items-center">
          <a href="/" className="text-decoration-none">
            <h4 className="text-white fw-bold m-0">Xem ngay lộ trình học tập hiệu quả tại đây</h4>
          </a>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
