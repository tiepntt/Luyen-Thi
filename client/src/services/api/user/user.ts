import { UserCreateModel } from "models/user/userInfo";
import { UserSearchQuery } from "models/user/userQuery";
import { Role } from "settings/user/role";
import api from "..";
const baseUrl = "/user";
export const userApi = {
  getUser: (query: UserSearchQuery) => {
    return api.get(baseUrl, { params: { ...query } });
  },
  updateRole: (userId: string, roles: Role[]) => {
    return api.put(`${baseUrl}/role`, { userId, roles });
  },
  createUser: (user: UserCreateModel) => {
    return api.post(baseUrl, {
      ...user,
    });
  },
};
