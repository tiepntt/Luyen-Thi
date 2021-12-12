import optionOne from "assets/images/practice/intro1.svg";
import optionTwo from "assets/images/practice/intro2.svg";
import { Col, Container, Row, Image } from "react-bootstrap";
import "./style.scss";
import { NavLink, useParams } from "react-router-dom";
import { useSubjects } from "hooks/Grade-Subject/useSubjects";
import PracticeBanner from "app/components/_share/Banners/PracticeBanner";

const PracticeOptionPage: React.FC = () => {
  const { subjectCode } = useParams<any>();
  const { subjects } = useSubjects();
  const subject = subjects.find((i) => i.code === subjectCode);
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
            <h2 style={{ color: "white" }}>{subject?.name}</h2>
          </Row>
          <Col lg={5} md={5} sm={6} className="text-center mt-5">
            <NavLink
              className="practice-checkpoint-img option-practice"
              to={`/practice/${subjectCode}/checkpoint`}
            >
              <Image src={optionOne} fluid={true} />
            </NavLink>
          </Col>
          <Col lg={5} md={5} sm={6} className="text-center mt-5">
            <NavLink
              className="practice-exam-img option-practice"
              to={`/practice/${subjectCode}/exam-test`}
            >
              <Image src={optionTwo} fluid={true} />
            </NavLink>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default PracticeOptionPage;
