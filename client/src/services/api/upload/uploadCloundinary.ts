import api from "..";

const baseUrl = "/FileUpload";
export const uploadApi = {
  upload: (file: any) => {
    let formData = new FormData();
    formData.append("file", file);
    return api.post(`${baseUrl}/image`, formData);
  },
};
