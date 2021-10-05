import api from "..";

const baseUrl = "/unit";
export const unitApi = {
  getAllByChapterId: (chapterId: string) => {
    return api.get(baseUrl, {
      params: {
        chapterId,
      },
    });
  },
};
