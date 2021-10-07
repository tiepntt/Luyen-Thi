import { QuestionCreate } from "models/question/Question";
import { QuestionSetCreate } from "models/questionSet/QuestionSetCreate";
import api from "..";

const baseUrl = "/QuestionSet";
export const questionSetApi = {
  getByDocumentId: (documentId: string) =>
    api.get(`${baseUrl}/in-document/${documentId}`),
  create: (questionSet: QuestionSetCreate) => {
    return api.post(baseUrl, { ...questionSet });
  },
  addQuestion: (questionSetId: string, question: QuestionCreate) => {
    return api.post(`${baseUrl}/${questionSetId}/add-question`, {
      ...question,
    });
  },
};
