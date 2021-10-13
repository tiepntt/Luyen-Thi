import { User } from "models/user/userInfo";

export enum UserActcion {
  Login = "Login",
  LogOut = "Logout",
}
export const UserRedux = {
  login: (user: User) => {
    return { type: UserActcion.Login, payload: user };
  },
  logout: (user: User) => {
    return { type: UserActcion.Login, payload: user };
  },
};
