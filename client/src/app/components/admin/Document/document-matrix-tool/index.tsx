import { useGrades } from "hooks/Grade-Subject/useGrades";
import { useSubjects } from "hooks/Grade-Subject/useSubjects";
import { useChapters } from "hooks/Matrix/useChapters";
import { useLevelQuestion } from "hooks/Matrix/useLevelQuestion";
import { useQuestionTemplate } from "hooks/Matrix/useTemplate";
import { useUnits } from "hooks/Matrix/useUnits";
import React, { FormEvent, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useParams } from "react-router";
import Select from "react-select";
import { documentApi } from "services/api/document/documentApi";
import { toastService } from "services/toast";

const DocumentMatrixTool: React.FC = () => {
  const [loadding, setLoadding] = useState(false);
  const { documentId } = useParams<any>();
  const { grades, gradeSelect, setGradeSelect } = useGrades();
  const { subjects, subjectSelect, setSubjectSelect } = useSubjects(
    gradeSelect?.id as any
  );
  const { chapters, currentChapter, setCurrentChappter } = useChapters(
    gradeSelect?.id as any,
    subjectSelect?.id as any
  );
  const { units, curentUnit, setCurentUnit } = useUnits(currentChapter?.id);
  const { templates, currentTemplate, setCurrentTemplate } =
    useQuestionTemplate(curentUnit?.id);
  const { levels, currentLevel, setCurrentLevel } = useLevelQuestion();
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoadding(true);
    documentApi
      .updateMatrix({
        id: documentId,
        gradeId: gradeSelect?.id as any,
        subjectId: subjectSelect?.id as any,
        chapterId: currentChapter?.id as any,
        unitId: curentUnit?.id as any,
        levelId: currentLevel?.id as any,
        templateQuestionId: currentTemplate?.id,
      })
      .then((res) => {
        setLoadding(false);
        if (res.status === 200) {
          toastService.success();
        } else {
          toastService.error();
        }
      });
  };
  return (
    <div className="document-tool-page">
      <Container className="px-3 pt-3">
        <h4 className="text-center">Cập nhật ma trận</h4>
        <Form onSubmit={onSubmit}>
          <Row>
            <Form.Group as={Col}>
              <Form.Label>Lớp</Form.Label>
              <Select
                options={grades}
                getOptionLabel={(e) => e.name}
                getOptionValue={(e) => e.id}
                isClearable
                value={gradeSelect}
                onChange={setGradeSelect as any}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Môn</Form.Label>
              <Select
                options={subjects}
                getOptionLabel={(e) => e.name}
                getOptionValue={(e) => e.id}
                isClearable
                value={subjectSelect}
                onChange={setSubjectSelect as any}
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col}>
              <Form.Label>Chương</Form.Label>
              <Select
                options={chapters}
                getOptionLabel={(e) => e.name}
                getOptionValue={(e) => e.id}
                isClearable
                value={currentChapter}
                onChange={setCurrentChappter as any}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Bài</Form.Label>
              <Select
                options={units}
                getOptionLabel={(e) => e.name}
                getOptionValue={(e) => e.id}
                isClearable
                value={curentUnit}
                onChange={setCurentUnit as any}
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col}>
              <Form.Label>Dạng bài</Form.Label>
              <Select
                options={templates}
                getOptionLabel={(e) => e.name}
                getOptionValue={(e) => e.id}
                isClearable
                value={currentTemplate}
                onChange={setCurrentTemplate as any}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Độ khó</Form.Label>
              <Select
                options={levels}
                getOptionLabel={(e: any) => e?.name}
                getOptionValue={(e: any) => e?.id}
                isClearable
                value={currentLevel}
                onChange={setCurrentLevel as any}
              />
            </Form.Group>
          </Row>
          <Button type="submit" disabled={loadding}>
            Lưu
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default DocumentMatrixTool;
