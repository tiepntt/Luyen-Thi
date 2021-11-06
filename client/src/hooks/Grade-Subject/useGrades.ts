import { useAppContext } from "hooks/AppContext";

export const useGrades = (subjectCode?: string) => {
  const { grades } = useAppContext();
  const valueGrades = grades.filter(
    (g) => !subjectCode || g.subjects?.some((g) => g.code === subjectCode)
  );
  return { grades: valueGrades };
};
// static data
