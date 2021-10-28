import { User, UserRedux } from "models/user/userInfo";
import { ActionReducer } from "redux/model";
import { UserActcion } from "./action";

const initialState: UserRedux = {
  accessToken: "",
};
export const UserReducer = (
  state = initialState,
  action: ActionReducer<UserActcion, UserRedux>
) => {
  switch (action.type) {
    case UserActcion.LogOut:
      localStorage.removeItem("token");
      return { token: "" };
    case UserActcion.Login:
      localStorage.setItem("token", action.payload?.accessToken as any);
      return { ...action.payload };
    case UserActcion.EmailConfirm:
      let userInfo = { ...state }.userInfo;

      return {
        ...state,
        userInfo: { ...(userInfo as User), emailConfirmed: true },
      };
    case UserActcion.UpdateUser:
      return {
        ...state,
        userInfo: action.payload?.userInfo,
      };
    default:
      return state;
  }
};
