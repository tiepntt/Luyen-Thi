import api from "..";
const baseUrl = "/Analytic";
export const analyticApi = {
  getResultInSubject: (subjectId: string) => {
    return api.get(`${baseUrl}/${subjectId}`);
  },
};
