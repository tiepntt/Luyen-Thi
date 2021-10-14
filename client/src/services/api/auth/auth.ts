import { LoginModel, RegisterModel } from "models/user/auth";
import api from "..";
const baseUrl = "/auth";
export const authApi = {
  login: (account: LoginModel) => {
    return api.post(`${baseUrl}/login`, { ...account });
  },
  register: (user: RegisterModel) => {
    return api.post(`${baseUrl}/register`, { ...user });
  },
  resend: () => {
    return api.put(`${baseUrl}/resend-active-code`);
  },
  active: (code: string) => {
    return api.post(`${baseUrl}/active-account`, { activeCode: code });
  },
};
