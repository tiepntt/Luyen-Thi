import {
  UserHistoryAnalyticQuery,
  UserResultAnalyticQuery,
} from "models/user/userResult";
import api from "..";

const baseUrl = "/profile";
export const profileApi = {
  getAnalytic: (params?: UserResultAnalyticQuery) => {
    return api.get(`${baseUrl}/analytic`, { params: params });
  },
  getHistories: (params?: UserHistoryAnalyticQuery) => {
    return api.get(`${baseUrl}/history-analytic`, { params: params });
  },
};
