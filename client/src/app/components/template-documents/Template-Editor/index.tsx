import { useTemplateDocument } from "hooks/Document/useTemplateDocument";
import { useSubjects } from "hooks/Grade-Subject/useSubjects";
import React from "react";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import Select from "react-select";
import TemplateQuestionSetEditor from "../Template-QuestionSet-Editor";
import "./style.scss";
interface Props {
  templateId: string;
}
const TemplateEditor: React.FC<Props> = ({ templateId }) => {
  const { subjects } = useSubjects();

  const {
    template,
    templateQuestionSets,
    addTQuestionSet,
    updateTQuestionSet,
    removeTQuestionSet,
  } = useTemplateDocument(templateId);
  const subject = subjects.find((i) => i.id === template?.subjectId);

  return (
    <div className="template-editor">
      <div className="temlate-info-edit">
        <Row>
          <Col>
            <Form.Group>
              <Select
                options={subjects}
                value={subject}
                getOptionLabel={(e) => e.name}
                getOptionValue={(e) => e.id}
              />
            </Form.Group>
          </Col>
          <Col>
            <InputGroup className="mb-2">
              <InputGroup.Text>Số câu</InputGroup.Text>
              <Form.Control value={template?.numberQuestion || 0} />
            </InputGroup>
          </Col>
          <Col>
            <InputGroup className="mb-2">
              <InputGroup.Text>Thời gian(phút)</InputGroup.Text>
              <Form.Control value={template?.times || 0} />
            </InputGroup>
          </Col>
        </Row>
      </div>
      <div className="template-question-sets">
        {templateQuestionSets.map((questionSet, i) => (
          <TemplateQuestionSetEditor
            key={i}
            subjectId={template?.subjectId || ""}
            templateQuestionSet={questionSet}
            updateTQuestionSet={updateTQuestionSet}
            removeTQuestionSet={() => removeTQuestionSet(questionSet)}
          />
        ))}
        <div className="add-tempalate-question-set d-flex justify-content-center mt-3 mb-3">
          <Button onClick={addTQuestionSet}>Thêm nhóm câu hỏi</Button>
        </div>
      </div>
    </div>
  );
};

export default TemplateEditor;
