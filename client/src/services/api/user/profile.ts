import { UserUpdateInfo } from "models/user/userInfo";
import {
  UserHistoryAnalyticQuery,
  UserResultAnalyticQuery,
} from "models/user/userResult";
import api from "..";

const baseUrl = "/profile";
export const profileApi = {
  getInfo: () => {
    return api.get(baseUrl);
  },
  getAnalytic: (params?: UserResultAnalyticQuery) => {
    return api.get(`${baseUrl}/analytic`, { params: params });
  },
  getHistories: (params?: UserHistoryAnalyticQuery) => {
    return api.get(`${baseUrl}/history-analytic`, { params: params });
  },
  updateProfile: (info: UserUpdateInfo) => {
    return api.put(baseUrl, { ...info });
  },
  changeAvatar: (file: any) => {
    let formData = new FormData();
    formData.append("file", file);
    return api.put(`${baseUrl}/change-avatar`, formData);
  },
};
