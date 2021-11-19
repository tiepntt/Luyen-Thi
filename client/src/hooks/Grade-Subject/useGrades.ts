import { useAppContext } from "hooks/AppContext";
import { Grade } from "models/matrix/Grade";
import { useEffect, useState } from "react";

export const useGrades = (subjectCode?: string) => {
  const { grades } = useAppContext();
  const [gradeSelect, setGradeSelect] = useState<Grade>();
  useEffect(() => {
    if (
      !gradeSelect?.subjects?.find(
        (s) => s.code === subjectCode || s.id === subjectCode
      )
    ) {
      setGradeSelect(null as any);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subjectCode]);
  const valueGrades = grades.filter(
    (g) =>
      !subjectCode ||
      g.subjects?.some((g) => g.code === subjectCode || g.id === subjectCode)
  );
  return { grades: valueGrades, gradeSelect, setGradeSelect };
};
// static data
