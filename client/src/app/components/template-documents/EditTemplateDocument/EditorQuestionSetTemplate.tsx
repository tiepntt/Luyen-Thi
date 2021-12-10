import { TemplateQuestionSet } from "models/template-document/template-question-set";
import React from "react";
import { Card, Form, Row } from "react-bootstrap";
interface Props {
  questionSet: TemplateQuestionSet;
}
const EditorQuestionSetTemplate: React.FC<Props> = ({ questionSet }) => {
  //   const [state, setstate] = useState(initialState);
  return (
    <Card className="question-set-template mb-2">
      <Card.Header className="d-flex">
        <div className="input-text" style={{ flexGrow: 1 }}>
          <Form.Control value={questionSet.name} />
        </div>
        <div className="optiona"></div>
      </Card.Header>
    </Card>
  );
};

export default EditorQuestionSetTemplate;
