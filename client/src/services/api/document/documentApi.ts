import { DocoumentTitle } from "models/document/Document";
import { DocumentGetAllRequest } from "models/document/DocumentGetAll";
import api from "..";
const baseUrl = "/Document";
export const documentApi = {
  create: (document: DocoumentTitle) => {
    return api.post(baseUrl, document);
  },
  getAll: (request: DocumentGetAllRequest) => {
    return api.post(`${baseUrl}/getAll`, { ...request });
  },
  getById: (id: string) => {
    return api.get(`${baseUrl}/${id}`);
  },
  importQuestion: (documentId: string, googleDocId: string) => {
    return api.post(`${baseUrl}/import-questions`, { googleDocId, documentId });
  },
};
