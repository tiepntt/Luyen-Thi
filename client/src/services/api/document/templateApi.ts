import { TemplateDocument } from "models/template-document/template-document";
import { TemplateQuestionGenerate } from "models/template-document/template-question-generate";
import { TemplateQuestionSet } from "models/template-document/template-question-set";
import api from "..";
const baseUrl = "/template";
export const templateApi = {
  getTemplate: (templateId: string) => {
    return api.get(`${baseUrl}/${templateId}`);
  },
  createTemplate: (subjectId: string) => {
    return api.post(`${baseUrl}/${subjectId}`);
  },
  updateTemplate: (template: TemplateDocument) => {
    return api.put(`${baseUrl}`, { ...template });
  },
  addQuestionSet: (templateId: string, show: boolean) => {
    return api.post(`${baseUrl}/question-set`, {
      name: "Nhóm câu hỏi",
      show: show,
      content: "",
      templateDocumentId: templateId,
    });
  },
  addQuestion: (templateQuestionSetId: string) => {
    return api.post(`${baseUrl}/question-generate/${templateQuestionSetId}`);
  },
  removeTQuestionSet: (tqId: string) => {
    return api.delete(`${baseUrl}/question-set/${tqId}`);
  },
  updateTQuestionSet: (tQuestionSet: TemplateQuestionSet) => {
    return api.put(`${baseUrl}/question-set/`, { ...tQuestionSet });
  },
  changeGrades: (gradeIds: string[], id: string) => {
    return api.patch(`${baseUrl}/question-set/change-grades`, { gradeIds, id });
  },
  removeQuestionGenerate: (id: string) => {
    return api.delete(`${baseUrl}/question-generate/${id}`);
  },
  updateQuestionGenerate: (questionGenreate: TemplateQuestionGenerate) => {
    return api.put(`${baseUrl}/question-generate`, { ...questionGenreate });
  },
};
