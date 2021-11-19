import { useAppContext } from "hooks/AppContext";
import { Subject } from "models/matrix/Subject";
import { useEffect, useState } from "react";

export const useSubjects = (gradeCode?: string) => {
  const { subjects } = useAppContext();
  const [subjectSelect, setSubjectSelect] = useState<Subject>();
  useEffect(() => {
    if (
      !subjectSelect?.grades?.find(
        (s) => s.code === gradeCode || s.id === gradeCode
      )
    ) {
      setSubjectSelect(null as any);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gradeCode]);
  const valueSubjects = subjects.filter(
    (s) =>
      !gradeCode ||
      s.grades?.some((g) => g.code === gradeCode || g.id === gradeCode)
  );
  return { subjects: valueSubjects, subjectSelect, setSubjectSelect };
};
