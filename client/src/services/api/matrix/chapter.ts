import { ChapterCreate } from "models/matrix/Chapter";
import api from "..";
const baseUrl = "/chapter";

export const chapterApi = {
  getChapter: (gradeId = "", subjectId = "") => {
    return api.get(baseUrl, {
      params: { gradeId, subjectId },
    });
  },
  addChapter: (chapter: ChapterCreate) => {
    return api.post(baseUrl, { ...chapter });
  },
};
