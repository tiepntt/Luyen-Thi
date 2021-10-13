import { UserRedux } from "models/user/userInfo";
import { ActionReducer } from "redux/model";
import { UserActcion } from "./action";

const initialState: UserRedux = {
  token: "",
};
export const UserReducer = (
  state = initialState,
  action: ActionReducer<UserActcion, UserRedux>
) => {
  switch (action.type) {
    case UserActcion.LogOut:
      return { token: "" };
    case UserActcion.Login:
      return { ...action.payload };
    default:
      return state;
  }
};
