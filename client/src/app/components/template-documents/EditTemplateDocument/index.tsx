import { useTemplateDocument } from "hooks/Document/useTemplateDocument";
import { TemplateQuestionSet } from "models/template-document/template-question-set";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import EditorQuestionSetTemplate from "./EditorQuestionSetTemplate";
import "./style.scss";
interface Props {
  questionSets: TemplateQuestionSet[];
  templateId: string;
}
const EditTemplateDocument: React.FC<Props> = ({
  questionSets,
  templateId,
}) => {
  const { templeQuestionSets, setTemplateQuestionSets, addQuestionSet } =
    useTemplateDocument(questionSets, templateId);
  return (
    <div className="edit-template-document">
      <div className="question-set-tempale-editor"></div>
      <div className="add-template-question-set">
        {templeQuestionSets.map((questionSet, i) => (
          <EditorQuestionSetTemplate questionSet={questionSet} key={i} />
        ))}
        <Button variant="outline-primary" onClick={addQuestionSet}>
          Thêm nhóm câu hỏi
        </Button>
      </div>
    </div>
  );
};

export default EditTemplateDocument;
