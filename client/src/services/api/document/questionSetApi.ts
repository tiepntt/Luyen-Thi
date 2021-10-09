import { QuestionCreate } from "models/question/Question";
import {
  QuestionSet,
  QuestionSetCreate,
} from "models/questionSet/QuestionSetCreate";
import api from "..";

const baseUrl = "/QuestionSet";
export const questionSetApi = {
  getByDocumentId: (documentId: string) =>
    api.get(`${baseUrl}/in-document/${documentId}`),
  getDetail: (id: string) => {
    return api.get(`${baseUrl}/${id}`);
  },
  create: (questionSet: QuestionSetCreate) => {
    return api.post(baseUrl, { ...questionSet });
  },
  update: (questionSet: QuestionSet) => {
    return api.put(baseUrl, { ...questionSet });
  },
  remove: (id: string) => {
    return api.delete(`${baseUrl}/${id}`);
  },
  addQuestion: (questionSetId: string, question: QuestionCreate) => {
    return api.post(`${baseUrl}/${questionSetId}/add-question`, {
      ...question,
    });
  },
  removeQuestion: (questionSetId: string, questionId: string) => {
    return api.delete(
      `${baseUrl}/${questionSetId}/remove-question/${questionId}`
    );
  },
};
