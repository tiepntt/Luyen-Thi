// import { useAppContext } from "hooks/AppContext";
import PracticeSubject from "./Subject";
import { Row, Col, Container } from "react-bootstrap";
import "./style.scss";
import React from "react";
import { useSubjects } from "hooks/Grade-Subject/useSubjects";
import PracticeBanner from "app/components/_share/Banners/PracticeBanner";

const PracticePage = () => {
  const { subjects } = useSubjects("grade-12");

  return (
    <React.Fragment>
      <PracticeBanner
        title="Cổng luyện thi THPT Quốc gia"
        subtitle="Ngân hàng câu hỏi trắc nghiệm chọn lọc - đa dạng"
      />
      <Container className="practice_ctn px-3">
        <Row>
          {subjects.map((subject) => (
            <Col key={subject.id} lg={4} xl={4} md={6} sm={12}>
              <PracticeSubject {...subject} />
            </Col>
          ))}
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default PracticePage;
