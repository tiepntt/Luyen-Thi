import { PracticeConfig } from "models/practice/practiceConfig";
import { QuestionHistory } from "models/question/QuestionHistory";
import api from "..";

const baseUrl = "/practice";
export const practiceApi = {
  generateQuestion: (config: PracticeConfig) => {
    return api.post(`${baseUrl}/generate-question`, { ...config });
  },
  generateDocument: (templateId: string) => {
    return api.post(`${baseUrl}/generate-document/${templateId}`);
  },
  getTemplate: (id: string) => {
    return api.get(`${baseUrl}/${id}`);
  },
  checkAnswer: (questionHistories: QuestionHistory[]) => {
    return api.post(`${baseUrl}/checkAnswer`, [...questionHistories]);
  },
  getSolve: (questionId: string) => {
    return api.get(`${baseUrl}/solves/${questionId}`);
  },
};
