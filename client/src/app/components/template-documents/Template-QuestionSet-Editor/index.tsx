import {
  faEye,
  faEyeSlash,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppContext } from "hooks/AppContext";
import { useGrades } from "hooks/Grade-Subject/useGrades";
import { Grade } from "models/matrix/Grade";
import { TemplateQuestionGenerate } from "models/template-document/template-question-generate";
import { TemplateQuestionSet } from "models/template-document/template-question-set";
import React from "react";
import { Button, Card, Form } from "react-bootstrap";
import Select from "react-select";
import { templateApi } from "services/api/document/templateApi";
import { toastService } from "services/toast";
import TemplateQuestionGenerateEditor from "../TemplateQuestionGenerateEditor";
import "./style.scss";
interface Props {
  subjectId: string;
  templateQuestionSet: TemplateQuestionSet;
  updateTQuestionSet: (tQuestionSet: TemplateQuestionSet) => void;
  removeTQuestionSet: () => void;
}
const TemplateQuestionSetEditor: React.FC<Props> = ({
  templateQuestionSet,
  subjectId,
  updateTQuestionSet,
  removeTQuestionSet,
}) => {
  const { grades } = useGrades(subjectId);
  const addQuestionGenerate = () => {
    templateApi.addQuestion(templateQuestionSet.id).then((res) => {
      if (res.status !== 200) {
        return toastService.error(res.data.message);
      }
      updateTQuestionSet({
        ...templateQuestionSet,
        questionGenerates: [...templateQuestionSet.questionGenerates, res.data],
      });
    });
  };
  const { chapters } = useAppContext();
  const updateQuestionGenerate = (
    questionGenerate: TemplateQuestionGenerate
  ) => {
    let index = templateQuestionSet.questionGenerates.findIndex(
      (i) => i.id === questionGenerate.id
    );
    if (index === -1) {
      return;
    }

    templateApi.updateQuestionGenerate(questionGenerate).then((res) => {
      if (res.status !== 200) {
        return toastService.error(res.data.message);
      }
      var newTemplateQuestionSet = { ...templateQuestionSet };
      newTemplateQuestionSet.questionGenerates[index] = questionGenerate;
      updateTQuestionSet(newTemplateQuestionSet);
    });
  };
  const removeQuestionGenerate = (
    questionGenerate: TemplateQuestionGenerate
  ) => {
    templateApi.removeQuestionGenerate(questionGenerate.id).then((res) => {
      if (res.status !== 200) {
        return toastService.error(res.data.message);
      }
      updateTQuestionSet({
        ...templateQuestionSet,
        questionGenerates: templateQuestionSet.questionGenerates.filter(
          (t) => t.id !== questionGenerate.id
        ),
      });
    });
  };
  const changeGrades = (grades: Grade[]) => {
    templateApi
      .changeGrades(
        grades.map((i) => i.id),
        templateQuestionSet.id
      )
      .then((res) => {
        if (res.status !== 200) {
          return toastService.error(res.data.message);
        }
        updateTQuestionSet({ ...templateQuestionSet, grades: grades });
      });
  };
  const changeContent = (content: string) => {
    templateApi
      .updateTQuestionSet({ ...templateQuestionSet, content: content })
      .then((res) => {
        if (res.status !== 200) {
          return toastService.error(res.data.message);
        }
        updateTQuestionSet({ ...templateQuestionSet, content: content });
      });
  };

  return (
    <div className="template-question-set-editor mt-2">
      <Card className="p-2">
        <div className="template-qs-header-editor d-flex">
          <div className="name-input d-flex" style={{ flexGrow: 1 }}>
            <Form.Control
              defaultValue={templateQuestionSet.content}
              placeholder="Tiêu đề phần"
              className="mx-2"
              onChange={(e) => changeContent(e.target.value)}
            />
            <Select
              options={grades}
              className="grade-select "
              isMulti
              isClearable={false}
              getOptionValue={(e) => e.id}
              getOptionLabel={(e) => e.name}
              value={templateQuestionSet.grades}
              onChange={changeGrades as any}
            />
          </div>
          <div className="option-header">
            <button className="btn view">
              <FontAwesomeIcon
                icon={templateQuestionSet.show ? faEye : faEyeSlash}
              />
            </button>
            <button className="btn delete" onClick={removeTQuestionSet}>
              <FontAwesomeIcon icon={faTrashAlt} />
            </button>
          </div>
        </div>
        <hr className="mb-1 mx-2" />
        <div className="template-question-generates">
          {templateQuestionSet.questionGenerates.map((questionGenerate, i) => (
            <TemplateQuestionGenerateEditor
              key={i}
              index={i + 1}
              questionGenerate={questionGenerate}
              update={updateQuestionGenerate}
              remove={() => removeQuestionGenerate(questionGenerate)}
              chapters={chapters.filter(
                (c) =>
                  templateQuestionSet.grades.find((g) => g.id === c.gradeId) &&
                  c.subjectId === subjectId
              )}
            />
          ))}
          <div className="add-q-generate">
            <Button
              className="add-q-generate-btn mt-2 mx-2"
              variant="outline-info"
              size="sm"
              onClick={addQuestionGenerate}
            >
              Thêm câu hỏi
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default TemplateQuestionSetEditor;
