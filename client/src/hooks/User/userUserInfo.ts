import { UserRedux } from "models/user/userInfo";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";

export const useUserInfo = () => {
  const userReducer = useSelector<RootState, UserRedux>(
    (state) => state.UserReducer
  );
  return { userInfo: userReducer.userInfo };
};
