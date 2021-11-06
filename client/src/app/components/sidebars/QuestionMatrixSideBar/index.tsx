import React from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import "./style.scss";
import { useParams } from "react-router";
import Select from "react-select";
import { QuestionStatus } from "settings/question/questionStatus";
import { Guid } from "utils/guidFunction";
import { useQuestionMatrix } from "hooks/Question/useQuestionMatrix";
import Loading from "app/components/_share/StaticLayout/Loading";

const QuestionMatrixSideBar = () => {
  const { questionId } = useParams<any>();
  const {
    loadding,
    grades,
    questionMatrix,
    setQuestionMatrix,
    subjects,
    units,
    chapters,
    templates,
    levels,
    removeFromBank,
    addToBank,
    updateMatrix,
  } = useQuestionMatrix(questionId);
  return !loadding ? (
    <div id="question-matrix-side-bar">
      <div className="main-content-matrix">
        <Row>
          <Col md={12} className="mt-3">
            <Form.Group>
              <Form.Label>Lớp</Form.Label>
              <Select
                options={grades}
                value={
                  !Guid.Empty(questionMatrix?.gradeId)
                    ? grades.find((i) => i.id === questionMatrix?.gradeId)
                    : null
                }
                getOptionLabel={(e) => e.name}
                getOptionValue={(e) => e.id}
                onChange={(e: any) =>
                  setQuestionMatrix({
                    ...(questionMatrix as any),
                    gradeId: e.id,
                  })
                }
              />
            </Form.Group>
          </Col>
          <Col md={12} className="mt-3">
            <Form.Group>
              <Form.Label>Môn học</Form.Label>
              <Select
                options={subjects}
                value={
                  !Guid.Empty(questionMatrix?.subjectId)
                    ? subjects.find((i) => i.id === questionMatrix?.subjectId)
                    : null
                }
                getOptionLabel={(e) => e.name}
                getOptionValue={(e) => e.id}
                onChange={(e: any) =>
                  setQuestionMatrix({
                    ...(questionMatrix as any),
                    subjectId: e.id,
                  })
                }
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <Form.Group>
              <Form.Label>Chuyên đề</Form.Label>
              <Select
                options={chapters}
                value={
                  chapters.find((i) => i.id === questionMatrix?.chapterId) ||
                  null
                }
                getOptionLabel={(e) => e.name}
                getOptionValue={(e) => e.id}
                onChange={(e: any) =>
                  setQuestionMatrix({
                    ...(questionMatrix as any),
                    chapterId: e.id,
                  })
                }
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <Form.Group>
              <Form.Label>Kỹ năng</Form.Label>
              <Select
                options={units}
                value={
                  questionMatrix?.unitId
                    ? units.find((i) => i.id === questionMatrix?.unitId)
                    : null
                }
                getOptionLabel={(e) => e.name}
                getOptionValue={(e) => e.id}
                onChange={(e: any) =>
                  setQuestionMatrix({
                    ...(questionMatrix as any),
                    unitId: e.id,
                  })
                }
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <Form.Group>
              <Form.Label>Dạng bài</Form.Label>
              <Select
                options={templates}
                value={
                  questionMatrix?.templateQuestionId
                    ? templates.find(
                        (i) => i.id === questionMatrix?.templateQuestionId
                      )
                    : null
                }
                getOptionLabel={(e) => e.name}
                getOptionValue={(e) => e.id}
                onChange={(e: any) =>
                  setQuestionMatrix({
                    ...(questionMatrix as any),
                    templateQuestionId: e.id,
                  })
                }
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <Form.Group>
              <Form.Label>Độ khó</Form.Label>
              <Select
                options={levels}
                value={
                  !Guid.Empty(questionMatrix?.levelId)
                    ? levels.find((i) => i.id === questionMatrix?.levelId)
                    : null
                }
                getOptionLabel={(e) => e.name}
                getOptionValue={(e) => e.id}
                onChange={(e: any) =>
                  setQuestionMatrix({
                    ...(questionMatrix as any),
                    levelId: e.id,
                  })
                }
              />
            </Form.Group>
          </Col>
        </Row>
      </div>
      <div className="option-btn mt-4 text-center">
        {questionMatrix?.status === QuestionStatus.Used ? (
          <Button
            onClick={removeFromBank}
            className="mx-2"
            variant="outline-danger"
          >
            Gỡ khỏi NHCH
          </Button>
        ) : (
          <Button
            onClick={addToBank}
            className="mx-2"
            variant="outline-success"
          >
            Thêm vào NHCH
          </Button>
        )}

        <Button
          className="mx-2"
          variant="outline-primary"
          onClick={updateMatrix}
        >
          Lưu
        </Button>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default QuestionMatrixSideBar;
