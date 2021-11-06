import { useAppContext } from "hooks/AppContext";

export const useSubjects = (gradeCode?: string) => {
  const { subjects } = useAppContext();

  const valueSubjects = subjects.filter(
    (s) => !gradeCode || s.grades?.some((g) => g.code === gradeCode)
  );
  return { subjects: valueSubjects };
};
