import { ChapterCreate } from "models/matrix/Chapter";
import api from "..";
const baseUrl = "/chapter";

export const chapterApi = {
  getChapter: (gradeId = "", subjectId = "") => {
    return api.get(baseUrl, {
      params: { gradeId, subjectId },
    });
  },
  getById: (id: string) => {
    return api.get(`${baseUrl}/${id}`);
  },
  addChapter: (chapter: ChapterCreate) => {
    return api.post(baseUrl, { ...chapter });
  },
  updateChapter: (chapter: ChapterCreate) => {
    return api.put(baseUrl, { ...chapter });
  },
  delete: (chapterId: string) => {
    return api.delete(`${baseUrl}/${chapterId}`);
  },
};
