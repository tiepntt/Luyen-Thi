// import { useAppContext } from "hooks/AppContext";
import PracticeSubject from "./Subject";
import PracticeBanner from "./Banner";
import * as res from "./mock/res.json";
import { Subject } from "models/matrix/Subject";
import { Row, Col, Container } from "react-bootstrap";
import "./style.scss";
import React from "react";

const PracticePage = () => {
  // Replace with useAppContext hook
  // Define type with ? symbol must use unknown type
  const subjects = res.subjects as unknown as Subject[];

  return (
    <React.Fragment>
      <PracticeBanner
        title="Cổng luyện thi THPT Quốc gia"
        subtitle="Ngân hàng câu hỏi trắc nghiệm chọn lọc - đa dạng"
      />
      <Container className="practice_ctn">
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
