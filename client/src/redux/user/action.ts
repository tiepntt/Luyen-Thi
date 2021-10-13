import { User } from "models/user/userInfo";

export enum UserActcion {
  Login = "Login",
  LogOut = "Logout",
}
export const UserFunction = {
  login: (user: User) => {
    return { type: UserActcion.Login, payload: user };
  },
  logout: () => {
    return { type: UserActcion.Login };
  },
};
