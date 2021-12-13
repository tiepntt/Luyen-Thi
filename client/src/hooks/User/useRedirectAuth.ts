import { useAppContext } from "hooks/AppContext";
import { UserRedux } from "models/user/userInfo";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { AppCommon } from "redux/common/reducer";
import { RootState } from "redux/store";

export const useRedirectAuth = () => {
  const userRedux = useSelector<RootState, UserRedux>(
    (root: RootState) => root.UserReducer
  );
  const commonState = useSelector<RootState, AppCommon>(
    (root: RootState) => root.CommonReducer
  );
  const { scrollTop } = useAppContext();
  useEffect(() => {
    if (userRedux.userInfo && userRedux.userInfo.emailConfirmed) {
      // popup vetify email code
      window.location.href = commonState.redirectPath.includes('auth') ? "/document" : commonState.redirectPath;
      scrollTop();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userRedux]);
};
