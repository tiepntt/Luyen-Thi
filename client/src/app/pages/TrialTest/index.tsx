import PracticeBanner from "app/components/_share/Banners/PracticeBanner";
import ExamCard from "./ExamCard";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Chart from "./Chart";

const TrialTestPage = () => {
  return (
    <React.Fragment>
      <PracticeBanner
        title="Thi thử Online : Toán học"
        subtitle="Ngân hàng câu hỏi trắc nghiệm chọn lọc - đa dạng"
      />
      <Row className="d-flex justify-content-center">
        <ExamCard />
      </Row>
      <Container className="d-flex justify-content-center" fluid={true}>
        <Col lg={5}>
            <Chart />
        </Col>
      </Container>
    </React.Fragment>
  );
};
export default TrialTestPage;
