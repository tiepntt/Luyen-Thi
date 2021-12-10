import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppContext } from "hooks/AppContext";
import { ChapterDetail } from "models/matrix/Chapter";
import { TemplateQuestionGenerate } from "models/template-document/template-question-generate";
import React, { useEffect } from "react";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import Select from "react-select";
import "./style.scss";
interface Props {
  questionGenerate: TemplateQuestionGenerate;
  index: number;
  chapters: ChapterDetail[];
  update: (questionGenerate: TemplateQuestionGenerate) => void;
  remove: () => void;
}
const TemplateQuestionGenerateEditor: React.FC<Props> = ({
  questionGenerate,
  index,
  chapters,
  update,
  remove,
}) => {
  useEffect(() => {
    // console.log(chapters);
  }, [chapters]);
  const { levels } = useAppContext();
  const units =
    chapters.find((i) => i.id === questionGenerate.chapterId)?.units || [];

  const updateQuestionGenerate = (key: string, value: any) => {
    var newQuestionGenerate = { ...questionGenerate };
    (newQuestionGenerate as any)[key] = value;
    if (key === "chapterId") {
      newQuestionGenerate.unitId = null as any;
    }
    update(newQuestionGenerate);
  };
  return (
    <div className="question-generate-editor d-flex mx-1">
      <div className="remove-qg">
        <div className="index-question">{index}</div>
      </div>
      <Row className="m-0" style={{ flexGrow: 1 }}>
        <Col md={1} className="mx-0 px-1">
          <InputGroup className="mb-2">
            <InputGroup.Text className="px-2">SL</InputGroup.Text>
            <Form.Control
              type="number"
              min={1}
              max={10}
              value={questionGenerate.numberQuestion}
              onChange={(e) =>
                updateQuestionGenerate("numberQuestion", e.target.value)
              }
              className="px-0 text-center"
            />
          </InputGroup>
        </Col>
        <Col md={4} className="mx-0 px-1">
          <InputGroup className="mb-2">
            <InputGroup.Text>Chương</InputGroup.Text>
            <Select
              className="option-question-generate"
              options={chapters}
              value={
                chapters.find(
                  (c) => c.id === questionGenerate.chapterId
                ) as ChapterDetail
              }
              getOptionLabel={(e) => e.name}
              getOptionValue={(e) => e.id}
              onChange={(e) => updateQuestionGenerate("chapterId", e?.id)}
            />
          </InputGroup>
        </Col>
        <Col md={4} className="mx-0 px-1">
          <InputGroup className="mb-2">
            <InputGroup.Text>Kĩ năng</InputGroup.Text>
            <Select
              className="option-question-generate"
              options={units}
              value={
                questionGenerate.unitId
                  ? units.find((u) => u.id === questionGenerate.unitId)
                  : null
              }
              getOptionLabel={(e) => e.name}
              getOptionValue={(e) => e.id}
              onChange={(e) => updateQuestionGenerate("unitId", e?.id)}
            />
          </InputGroup>
        </Col>
        <Col md={3} className="mx-0 px-1">
          <InputGroup className="mb-2">
            <InputGroup.Text>Độ khó</InputGroup.Text>
            <Select
              className="option-question-generate"
              options={levels}
              value={levels.find(
                (u) => u.id === questionGenerate.levelQuestionId
              )}
              getOptionLabel={(e) => e.name}
              getOptionValue={(e) => e.id}
              onChange={(e) => updateQuestionGenerate("levelQuestionId", e?.id)}
            />
          </InputGroup>
        </Col>
      </Row>
      <div className="remove-qg">
        <Button className="btn-remove" onClick={remove}>
          <FontAwesomeIcon icon={faTrashAlt} />
        </Button>
      </div>
    </div>
  );
};

export default TemplateQuestionGenerateEditor;
