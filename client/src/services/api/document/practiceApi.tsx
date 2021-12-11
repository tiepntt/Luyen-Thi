import { PracticeConfig } from "models/practice/practiceConfig";
import api from "..";

const baseUrl = "/practice";
export const practiceApi = {
  generateQuestion: (config: PracticeConfig) => {
    return api.post(`${baseUrl}/generate-question`, { ...config });
  },
};
