import api from "..";
const baseUrl = "/template";
export const templateApi = {
  getTemplate: (gradeId: string, subjectId: string) => {
    return api.get(`${baseUrl}/${gradeId}/${subjectId}`);
  },
  addQuestionSet: (tempalateId: string) => {
    return api.post(`${baseUrl}/${tempalateId}/question-set`);
  },
};
