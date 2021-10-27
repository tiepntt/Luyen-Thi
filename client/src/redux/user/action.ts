import { User, UserRedux } from "models/user/userInfo";
export enum UserActcion {
  Login = "Login",
  LogOut = "Logout",
  EmailConfirm = "EmailConfirm",
  UpdateUser = "UpdateUser",
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
  updateUser: (userInfo: User) => {
    return { type: UserActcion.UpdateUser, payload: { userInfo } };
  },
};
