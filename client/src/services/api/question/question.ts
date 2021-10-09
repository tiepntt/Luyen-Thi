import {
  QuestionCreate,
  QuestionMatrix,
  QuestionContent,
} from "models/question/Question";
import api from "..";

const baseUrl = "/question";
export const questionApi = {
  get: (id: string) => {
    return api.get(`${baseUrl}/${id}`);
  },
  add: (question: QuestionCreate) => {
    return api.post(baseUrl, { ...question });
  },
  getMatrix: (id: string) => {
    return api.get(`${baseUrl}/${id}/matrix`);
  },
  updateContent: (question: QuestionContent) => {
    return api.put(`${baseUrl}/update-content`, { ...question });
  },
  updateMatrix: (question: QuestionMatrix) => {
    return api.put(`${baseUrl}/update-matrix`, { ...question });
  },
  remove: (questionId: string) => {
    return api.delete(`${baseUrl}/${questionId}`);
  },
  addToBank: (questionId: string) => {
    return api.put(`${baseUrl}/add-to-bank/${questionId}`);
  },
  removeFromBank: (questionId: string) => {
    return api.delete(`${baseUrl}/remove-from-bank/${questionId}`);
  },
};
