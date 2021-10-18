import api from ".";

const baseUrl = "/home";
export const homeApi = {
  load: () => {
    return api.get(baseUrl);
  },
};
