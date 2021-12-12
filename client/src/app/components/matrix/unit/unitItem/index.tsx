import { faFolder, faStar, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Unit } from "models/matrix/Unit";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import "./style.scss";
interface Props {
  unit: Unit;
  onAddTemplate: () => void;
  onEdit: () => void;
  onRemove: () => void;
  onEditTemplate?: (template: any) => void;
  onRemoveTemplate: (template: any) => void;
}
const UnitItem: React.FC<Props> = (props) => {
  const { unit, onAddTemplate, onRemoveTemplate, onRemove, onEdit } = props;
  const [showTemplate, setShowTemplate] = useState(false);
  return (
    <div className="unit-item mb-1">
      <div className="unit-label d-flex">
        <div
          className="unit-info d-flex"
          style={{ flexGrow: 1 }}
          onClick={() => setShowTemplate(!showTemplate)}
        >
          <div className="unit-icon">
            <FontAwesomeIcon icon={faFolder} />
          </div>
          <div className="unit-name">{unit.name}</div>
        </div>
        <div className="btn-options d-flex">
          <Button
            className="mx-1"
            variant="outline-success"
            size="sm"
            onClick={onEdit}
          >
            Sửa
          </Button>
          <Button size="sm" variant="outline-danger" onClick={onRemove}>
            Xóa
          </Button>
        </div>
      </div>
      <div className="tempalte-question-list">
        {showTemplate && (
          <div className="template-question-show">
            <div className="list-template">
              {unit.templateQuestions?.map((template, i) => (
                <div className="template-item d-flex">
                  <div className="template-info d-flex" style={{ flexGrow: 1 }}>
                    <div className="tempalte-icon">
                      <FontAwesomeIcon icon={faStar} />
                    </div>
                    <div className="template-name">{template.name}</div>
                  </div>
                  <div className="template-options d-flex" title="Sửa">
                    <div
                      className="trash"
                      onClick={() => onRemoveTemplate(template)}
                      title="Xóa"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* <div className="btn-add-template-question">
              <Button size="sm" variant="link" onClick={onAddTemplate}>
                Thêm dạng bài
              </Button>
            </div> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default UnitItem;
