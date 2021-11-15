import PracticeBanner from "app/components/_share/Banners/PracticeBanner";
import ExamCard from "./ExamCard";
import React from "react";
import { Row } from "react-bootstrap";
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
      <Chart />
    </React.Fragment>
  );
};
export default TrialTestPage;
