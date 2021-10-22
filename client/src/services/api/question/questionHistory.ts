import { QuestionHistory } from "models/question/QuestionHistory";
import api from "..";
const baseUrl = "/questionHistory";
export const questionHistoryApi = {
  save: (history: QuestionHistory) => {
    return api.post(baseUrl, { ...history });
  },
};
