import optionOne from "assets/images/practice/intro1.svg";
import optionTwo from "assets/images/practice/intro2.svg";
import { Col, Container, Row, Image } from "react-bootstrap";
import PracticeBanner from "app/pages/Practice/Banner";
import "./style.scss";

const PracticeOptionPage = () => {
  return (
    <>
      <PracticeBanner
        title="Cổng luyện thi THPT Quốc gia"
        subtitle="Ngân hàng câu hỏi trắc nghiệm chọn lọc - đa dạng"
      />
      <Container style={{ paddingLeft: 33, paddingRight: 33 }}>
        <Row
          className="d-flex justify-content-center practice_options"
          style={{}}
        >
          <Row
            className="d-flex justify-content-center text-center"
            style={{
              backgroundColor: "#088BB5",
              padding: 20,
              borderTopLeftRadius: 15,
              borderTopRightRadius: 15,
            }}
          >
            <h2 style={{ color: "white" }}>Toán học</h2>
          </Row>
          <Col lg={5} md={5} sm={6} className="text-center mt-5">
            <Image src={optionOne} fluid={true} />
          </Col>
          <Col lg={5} md={5} sm={6} className="text-center mt-5">
            <Image src={optionTwo} fluid={true} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default PracticeOptionPage;
