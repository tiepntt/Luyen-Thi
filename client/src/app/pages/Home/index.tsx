import React from "react";
import "./style.scss";
import polygon from "../../../assets/images/homepage/polygon.png";
import hero from "../../../assets/images/homepage/hero.png";
import human from "../../../assets/images/homepage/human_reading.png";
import { Col, Container, Row, Button, Image } from "react-bootstrap";
import luyenthi from "assets/svgs/luyenthi.svg";

const HomePage: React.FC = () => {
  return (
    <div id="home-page">
      <div className="content-home-page">
        {/* <div className="block-carousels d-flex align-items-center">
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
        </div> */}
        {/* <Row> 
          <Col>
          <img src={hero} width="300px" alt="hero"/>
          <div className="position-relative" style={{bottom: "80px"}}>
            <Button className="working-button" href="/practice">Làm bài ngay</Button>
          </div>
          </Col>
        </Row>  */}
        <Container style={{padding: 100}}>
          <Row>
            <Col lg={6}>
              <Image style={{maxWidth: 400}} src="https://ik.imagekit.io/tqk8izesmc8/Luyenthi/images/home/boy_ltpro_2_0h0TexZav2p.png?updatedAt=1639423572274" fluid={true} />
            </Col>
            <Col lg={6} className="d-flex align-items-center">
              <div>
              <h1 className="r-title">
                <span>Phù hợp với mọi học sinh</span>
                <br/>
                <span>Thi hăng say, kết quả cao ngay</span>
              </h1>
              <br/>
              <Button className="start-button" href="/practice">Bắt đầu ngay</Button>
              </div>
            </Col>
          </Row>
        </Container>
        <div  style={{padding: 100, backgroundColor: "rgb(247, 245, 244)"}}>
          <h2>Tại sao nên lựa chọn IPractice ?</h2>
          <br/>
         <Container>
         <Row>
            <Col lg={4} md={12} sm={12} className="mb-5">
              <Row>
                <Col lg={12} md={6}>
                  <Image src={"https://ik.imagekit.io/tqk8izesmc8/Luyenthi/images/home/image_67B7THlN6.svg?updatedAt=1639424885952"} fluid={true} />
                </Col>
                <Col lg={12} md={6} className="mb-5">
                  <h3 className="reason-title">Phân tích cá nhân hóa</h3>
                  <br/>
                  <span>
                  Học sinh có thể ôn luyện mọi lúc, mọi nơi. Các phân tích báo cáo về chế độ luyện tập cá nhân sẽ giúp học sinh được phần đang yếu.
                  </span>
                </Col>
              </Row>
            </Col>
            <Col lg={4} md={12} sm={12} className="mb-5">
              <Row>
                <Col lg={12} md={6}>
                  <Image style={{minWidth: 148 }} src={"https://ik.imagekit.io/tqk8izesmc8/Luyenthi/images/home/image2_j3-98XIGBTR.svg?updatedAt=1639424886220"} fluid={true} />
                </Col>
                <Col lg={12} md={6}>
                  <h3>Nội dung bám sát</h3>
                  <br/>
                  <span>
                    Các câu hỏi và đề thi bám sát chương trình học, cung cấp một nền tảng luyện tập tốt nhất cho học sinh, giúp học sinh củng cố kiến thức.
                  </span>
                </Col>
              </Row>
            </Col>
            <Col lg={4} md={12} sm={12}>
              <Row>
                <Col lg={12} md={6}>
                  <Image src={"https://ik.imagekit.io/tqk8izesmc8/Luyenthi/images/home/image_67B7THlN6.svg?updatedAt=1639424885952"} fluid={true} />
                </Col>
                <Col lg={12} md={6}>
                  <h3>Công cụ tạo đề thi chất lượng</h3>
                  <br/>
                  <span>
                    Phân tích ma trận đề thi phù hợp với từng khối lớp, giúp giáo viên tạo được đề thi dễ dàng và chất lượng.
                  </span>
                </Col>
              </Row>
            </Col>
          </Row>
         </Container>
        </div>
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
