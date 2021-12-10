import { faFolderPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UnitItem from "app/components/matrix/unit/unitItem";
import AddTemplateQuestionModal from "app/components/_share/Modals/AddTemplateQuestionModal";
import AddUnitModal from "app/components/_share/Modals/AddUnitModal";
import EditUnitModal from "app/components/_share/Modals/EditUnitModal";
import { useUnits } from "hooks/Matrix/useUnits";
import { Chapter } from "models/matrix/Chapter";
import { TemplateQuestion } from "models/matrix/TemplateQuestion";
import { Unit } from "models/matrix/Unit";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { templateQuestionApi } from "services/api/matrix/templateQuestion";
import { unitApi } from "services/api/matrix/unit";
import { toastService } from "services/toast";
interface Props {
  chapter?: Chapter;
}
const ChapterUnits: React.FC<Props> = ({ chapter }) => {
  const {
    units,
    addUnit,
    curentUnit,
    setCurentUnit,
    addTemplate,
    editUnit,
    removeUnit,
    removeTemplate,
  } = useUnits(chapter?.id);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAddTemplateModal, setShowAddTemplateModal] = useState(false);
  const [showEditUnitModal, setShowEditUnitModal] = useState(false);
  const onAddTemplate = (unit: any) => {
    setCurentUnit(unit);
    setShowAddTemplateModal(true);
  };
  const onEditUnit = (unit: any) => {
    setCurentUnit(unit);
    setShowEditUnitModal(true);
  };
  const onRemoveUnit = (unit: Unit) => {
    let confirm = window.confirm("Bạn muốn xóa bản ghi này");
    if (confirm) {
      unitApi.delete(unit.id).then((res: any) => {
        if (res.status === 200) {
          toastService.success("Đã xóa");
          removeUnit(unit);
        } else {
          toastService.error(res.data.message);
        }
      });
    }
  };
  const onRemoveTemplate = (template: TemplateQuestion) => {
    let confirm = window.confirm("Bạn muốn xóa bản ghi này");
    if (confirm) {
      templateQuestionApi.remove(template.id).then((res) => {
        if (res.status === 200) {
          toastService.success("Đã xóa");
          removeTemplate(template.unitId, template.id);
        } else {
          toastService.error(res.data.message);
        }
      });
    }
  };
  return (
    <div className="chapter-info">
      {chapter && (
        <>
          <div className="info-chapter-name">{chapter?.name}</div>
          <hr />
          <div className="info-chapter-units">
            {units.map((unit, i) => (
              <UnitItem
                key={i}
                unit={unit}
                onAddTemplate={() => onAddTemplate(unit)}
                onEdit={() => onEditUnit(unit)}
                onRemove={() => onRemoveUnit(unit)}
                onRemoveTemplate={onRemoveTemplate}
              />
            ))}
          </div>
          <div className="add-unit-btn mt-3">
            <Button
              size="sm"
              variant="outline-primary"
              onClick={() => setShowAddModal(true)}
            >
              <FontAwesomeIcon icon={faFolderPlus} /> Thêm bài học
            </Button>
          </div>
          <AddUnitModal
            show={showAddModal}
            setShow={setShowAddModal}
            onAddUnit={addUnit}
            chapter={chapter}
          />
          <AddTemplateQuestionModal
            show={showAddTemplateModal}
            unit={curentUnit}
            setShow={setShowAddTemplateModal}
            onAdd={(template) =>
              curentUnit && addTemplate(curentUnit, template)
            }
          />
          <EditUnitModal
            show={showEditUnitModal}
            setShow={setShowEditUnitModal}
            unitId={curentUnit?.id || ""}
            onEditUnit={editUnit}
          />
        </>
      )}
    </div>
  );
};

export default ChapterUnits;
