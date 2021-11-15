import { ExamCardProps } from "models/trialExam/examCard";
import { Card, Button } from "react-bootstrap";

const ExamCard = () => {
  return (
    <Card style={{ width: "25rem" }}>
      {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
      <Card.Body>
        <div className="d-flex">
          <div className="flex-grow-1" style={{fontWeight: "bold"}}>Đề thi môn:</div>
          <div>Toán học</div>
        </div>
        <div className="d-flex">
          <div className="flex-grow-1">Số câu</div>
          <div>50</div>
        </div>
        <div className="d-flex">
          <div className="flex-grow-1">Thời gian:</div>
          <div>60 phút</div>
        </div>
        <div className="d-flex">
          <div className="flex-grow-1">Thành tích cao nhất</div>
          <div>10 điểm/ 55 phút</div>
        </div>
        <div className="d-flex">
          <div className="flex-grow-1">Điểm trung bình</div>
          <div>7.5</div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ExamCard;
