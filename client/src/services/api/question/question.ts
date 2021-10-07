import api from "..";

const baseUrl = "/question";
export const questionApi = {
  get: (id: string) => {
    return api.get(`${baseUrl}/${id}`);
  },
};
