import { TemplateQuestionCreate } from "models/matrix/TemplateQuestion";
import api from "..";
const baseUrl = "/templateQuestion";
export const templateQuestionApi = {
  create: (template: TemplateQuestionCreate) => {
    return api.post(baseUrl, { ...template });
  },
  remove: (id: string) => {
    return api.delete(`${baseUrl}/${id}`);
  },
  getAllByUnitId: (unitId: string) => {
    return api.get(`${baseUrl}/get-in-unit/${unitId}`);
  },
};
