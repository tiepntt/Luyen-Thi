import { subjectData } from "hooks/Grade-Subject/useSubjects";

export const SubjectApi = {
  getSubject: (code: string) => {
    return subjectData.find((i) => i.code === code) || subjectData[0];
  },
};
