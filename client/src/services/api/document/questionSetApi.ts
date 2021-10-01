import api from "..";

const baseUrl = "/QuestionSet";
export const questionSetApi = {
  getByDocumentId: (documentId: string) =>
    api.get(`${baseUrl}/in-document/${documentId}`),
};
