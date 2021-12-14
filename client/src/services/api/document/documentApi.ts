import { DocumentCreate } from "models/document/Document";
import { DocumentGetAllRequest } from "models/document/DocumentGetAll";
import { DocumentUpdateInfo } from "models/document/DocumentUpdateInfo";
import { SearchModel } from "models/document/SearchModel";
import { QuestionMatrix } from "models/question/Question";
import { PracticeHistory } from "models/practice/practiceHistory";
import api from "..";
import { AxiosResponse } from "axios";
import { PracticeTime } from "settings/practice/practiceTime";

const baseUrl = "/document";
export const documentApi = {
  create: (document: DocumentCreate) => {
    return api.post(baseUrl, document);
  },
  search: (search: SearchModel) => {
    return api.get(baseUrl, { params: { ...search } });
  },
  getAll: (request: DocumentGetAllRequest) => {
    return api.get(`${baseUrl}/getAll`, { params: request });
  },
  getPreview: (id: string) => {
    return api.get(`${baseUrl}/preview/${id}`);
  },
  getById: (id: string) => {
    return api.get(`${baseUrl}/${id}`);
  },
  importQuestion: (data: any) => {
    return api.post(`${baseUrl}/import-questions`, { ...data });
  },
  update: (request: DocumentUpdateInfo) => {
    return api.put(baseUrl, { ...request });
  },
  approve: (id: string) => {
    return api.patch(`${baseUrl}/approve/${id}`);
  },
  getRank: (id: string) => {
    return api.get(`${baseUrl}/rank/${id}`);
  },
  updateMatrix: (matrix: QuestionMatrix) => {
    return api.put(`${baseUrl}/update-matrix`, { ...matrix });
  },
  getHistory: () => {
    return api.get(`${baseUrl}/document-history`);
  },
  getAnalysis: (
    templateId: string,
    time = PracticeTime.WEEK
  ): Promise<AxiosResponse<PracticeHistory>> => {
    return api.get(`${baseUrl}/history-test/${templateId}?type=${time}`);
  },
  getRankingTemplate: (templateId: string) => {
    return api.get(`${baseUrl}/ranking-test/${templateId}`);
  },
};
