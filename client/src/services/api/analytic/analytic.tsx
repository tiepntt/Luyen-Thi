import api from "..";
const baseUrl = "/Analytic";
export const analyticApi = {
  getResultInSubject: (subjectId: string) => {
    return api.get(`${baseUrl}/${subjectId}`);
  },
  getAnalyticSystem: () => {
    return api.get(`${baseUrl}/admin/analytic-system`);
  },
  getAnalyticUser: (type: any) => {
    return api.get(`${baseUrl}/admin/analytic-user`, { params: type });
  },
};
