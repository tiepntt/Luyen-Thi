import { UserRedux } from "models/user/userInfo";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import { Role } from "settings/user/role";

export const useAccessRoles = (...roles: Role[]) => {
  const userReducer = useSelector<RootState, UserRedux>(
    (state) => state.UserReducer
  );
  const userRoles = userReducer.userInfo?.roles;

  return !roles.length || roles.some((role) => userRoles?.includes(role));
};
