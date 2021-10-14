import { UserRedux } from "models/user/userInfo";
export enum UserActcion {
  Login = "Login",
  LogOut = "Logout",
  EmailConfirm = "EmailConfirm",
}
export const UserFunction = {
  login: (user: UserRedux) => {
    return { type: UserActcion.Login, payload: user };
  },
  logout: () => {
    return { type: UserActcion.Login };
  },
  activeAccount: () => {
    return { type: UserActcion.EmailConfirm };
  },
};
