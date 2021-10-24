import api from "..";

const baseUrl = "/exam";
export const examApi = {
  getExam: (documentId: string) => {
    return api.get(`${baseUrl}/${documentId}`);
  },
  submit: (documentHistoryId: string, examMangerId?: string) => {
    return api.post(`${baseUrl}/submit`, { documentHistoryId, examMangerId });
  },
  reset: (documentId: string, examMangerId?: string) => {
    return api.post(`${baseUrl}/reset`, { documentId, examMangerId });
  },
};
