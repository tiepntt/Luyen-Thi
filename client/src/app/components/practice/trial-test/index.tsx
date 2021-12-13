import PracticeBanner from "app/components/_share/Banners/PracticeBanner";
import React, { useEffect, useState } from "react";
import { Button, Card, Container, Row } from "react-bootstrap";
import PracticeUserChart from "app/components/_share/Chart/PracticeUserChart";
import "./style.scss";
import { useParams } from "react-router-dom";
import { useSubjects } from "hooks/Grade-Subject/useSubjects";
import { TemplatePractice } from "models/template-document/template-document";
import { practiceApi } from "services/api/document/practiceApi";
import { toastService } from "services/toast";
import SnipperLayout from "app/components/_share/Layouts/SpinnerLayout";
import { history } from "services/history";
const TrialTest: React.FC = () => {
  const [generatting, setGeneratting] = useState(false);
  const { subjectCode } = useParams<any>();
  const { subjects } = useSubjects();
  const subject = subjects.find((i) => i.code === subjectCode);
  const [template, setTemplate] = useState<TemplatePractice>();
  useEffect(() => {
    if (subject) {
      practiceApi.getTemplate(subject.templateId || "").then((res) => {
        if (res.status === 200) {
          setTemplate(res.data);
        } else {
          toastService.error(res.data.message);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subject]);
  const startExam = () => {
    if (template?.documentId) {
      history.push(`/document/${template.documentId}`);
    } else {
      // generate
      setGeneratting(true);
      practiceApi.generateDocument(subject?.templateId || "").then((res) => {
        if (res.status !== 200) {
          setGeneratting(false);
          setTemplate({ ...template, documentId: res.data.id } as any);
          history.push(`/document/${res.data.id}`);
        }
      });
    }
  };
  return (
    <React.Fragment>
      <SnipperLayout loading={subject && template}>
        <PracticeBanner
          title={`Thi thử Online : ${subject?.name}`}
          subtitle="Ngân hàng câu hỏi trắc nghiệm chọn lọc - đa dạng"
        />
        <Container className="content-exam-test mt-2">
          <Row className="d-flex justify-content-center">
            <Card style={{ maxWidth: 500 }}>
              {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
              <Card.Body>
                <div className="d-flex font-bold mt-2">
                  <div className="flex-grow-1">Đề thi môn:</div>
                  <div>{subject?.name}</div>
                </div>

                <div className="d-flex  ">
                  <div className="flex-grow-1 font-bold">Số câu</div>
                  <div>{template?.numberQuestion} câu</div>
                </div>

                <div className="d-flex   ">
                  <div className="flex-grow-1 font-bold">Thời gian:</div>
                  <div>{template?.times} phút</div>
                </div>
                <div className="d-flex">
                  <div className="flex-grow-1 font-bold">
                    Hình thức làm bài :
                  </div>
                  <div>Trắc nghiệm </div>
                </div>
                <div className="d-flex">
                  <div className="flex-grow-1 font-bold">Trộn câu hỏi :</div>
                  <div>Từ dễ tới khó </div>
                </div>
                <div className="option-exam">
                  <Button
                    className="btn-start"
                    onClick={startExam}
                    disabled={generatting}
                  >
                    {generatting ? "Đang tạo dữ liệu" : "Bắt đầu làm bài"}
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Row>

          <PracticeUserChart />
        </Container>
      </SnipperLayout>
    </React.Fragment>
  );
};
export default TrialTest;
