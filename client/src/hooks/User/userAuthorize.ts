import { UserRedux } from "models/user/userInfo";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { CommonFunction } from "redux/common/action";
import { RootState } from "redux/store";
import { history } from "services/history";
import { toastService } from "services/toast";

export const useAuthorize = () => {
  const userReducer = useSelector<RootState, UserRedux>(
    (state) => state.UserReducer
  );
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userReducer.accessToken) {
      toastService.warning("Bạn cần đăng nhập để sử dụng chức năng này");
      dispatch(CommonFunction.setRedirectPath(location.pathname));
      history.push("/auth/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userReducer.accessToken]);
};
