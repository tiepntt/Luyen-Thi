import { UserRedux } from "models/user/userInfo";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { RootState } from "redux/store";
import { Role } from "settings/user/role";

export const useRoles = (roles: Role[]) => {
  const userReducer = useSelector<RootState, UserRedux>(
    (state) => state.UserReducer
  );
  const history = useHistory();
  const userRoles = userReducer.user?.roles;

  useEffect(() => {
    if (userRoles) {
      const permision = userRoles.some((role) => roles.includes(role));
      if (!permision) {
        return history.push("/404");
      }
    } else {
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roles]);
};
