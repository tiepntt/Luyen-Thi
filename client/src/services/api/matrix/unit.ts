import { UnitCreate } from "models/matrix/Unit";
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
  addUnit: (unit: UnitCreate) => {
    return api.post(baseUrl, { ...unit });
  },
  getById: (unitId: string) => {
    return api.get(`${baseUrl}/${unitId}`);
  },
  update: (unit: UnitCreate) => {
    return api.put(baseUrl, { ...unit });
  },
  delete: (unitId: string) => {
    return api.delete(`${baseUrl}/${unitId}`);
  },
};
