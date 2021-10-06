import { TemplateQuestion } from "models/matrix/TemplateQuestion";
import { Unit } from "models/matrix/Unit";
import { useEffect, useState } from "react";
import { unitApi } from "services/api/matrix/unit";

export const useUnits = () => {
  const [chapterId, setChappterId] = useState("");
  const [units, setUnits] = useState<Unit[]>([]);
  const [curentUnit, setCurentUnit] = useState<Unit>();
  const getUnits = () => {
    unitApi.getAllByChapterId(chapterId).then((res) => {
      if (res.status === 200) {
        setUnits(res.data);
      }
    });
  };
  const addUnit = (unit: Unit) => {
    const newUnits = [...units, unit];
    setUnits(newUnits);
  };
  const removeUnit = (unit: Unit) => {
    const newUnits = [...units].filter((i) => i.id !== unit.id);
    setUnits(newUnits);
  };
  const addTemplate = (unit: Unit, template: TemplateQuestion) => {
    const newUnits = [...units];
    const index = units.findIndex((i) => i.id === unit.id);
    if (index !== -1) {
      newUnits[index].templateQuestions?.push(template);
    }
    setUnits(newUnits);
  };
  const editUnit = (unit: Unit) => {
    const newUnits = [...units];
    const index = units.findIndex((i) => i.id === unit.id);
    if (index !== -1) {
      newUnits[index] = unit;
    }
    setUnits(newUnits);
  };
  const removeTemplate = (unitId: string, templateId: string) => {
    const newUnits = [...units];
    const index = units.findIndex((i) => i.id === unitId);
    if (index !== -1) {
      newUnits[index].templateQuestions = newUnits[
        index
      ].templateQuestions?.filter((i) => i.id !== templateId);
    }
    setUnits(newUnits);
  };
  useEffect(() => {
    if (chapterId) {
      getUnits();
    } else {
      setUnits([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chapterId]);
  return {
    units,
    setChappterId,
    addUnit,
    setCurentUnit,
    curentUnit,
    addTemplate,
    editUnit,
    removeUnit,
    removeTemplate,
  };
};
