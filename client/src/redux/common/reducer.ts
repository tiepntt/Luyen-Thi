import { ActionReducer } from "redux/model";
import { CommonAction } from "./action";

export interface AppCommon {
  redirectPath: string;
}
const initialState: AppCommon = {
  redirectPath: "/",
};
export const CommonReducer = (
  state = initialState,
  action: ActionReducer<CommonAction, AppCommon>
) => {
  switch (action.type) {
    case CommonAction.SetRedirectPath:
      return { ...state, redirectPath: action.payload?.redirectPath };
    case CommonAction.RemoveRedirectPath:
      return { ...state, redirectPath: "/" };
    default:
      return state;
  }
};
