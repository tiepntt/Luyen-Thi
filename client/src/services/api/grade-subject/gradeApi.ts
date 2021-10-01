import { gradeData } from "hooks/Grade-Subject/useGrades";

export const GradeApi = {
  getGrade: (code: string) => {
    return gradeData.find((i) => i.code === code) || gradeData[0];
  },
};
