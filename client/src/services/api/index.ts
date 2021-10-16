import axios from "axios";
import { CommonFunction } from "redux/common/action";
import { store } from "redux/store";
import { UserFunction } from "redux/user/action";
import { history } from "services/history";
import { toastService } from "services/toast";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  responseType: "json",
});

export const setupAxios = () => {
  const requestHandler = (request: any) => {
    const authToken = localStorage.getItem("token");
    if (authToken) {
      request.headers.Authorization = `Bearer ${authToken}`;
    }

    return request;
  };

  const successHandler = (response: any) => {
    return response;
  };

  const errorHandler = (error: any) => {
    const errorRes = error.response;
    if (errorRes) {
      return showError({ error: errorRes.data || {}, status: errorRes.status });
    } else {
      toastService.error("Một lỗi không mong muốn đã xảy ra");
    }
    return Promise.reject(error);
  };
  interface ResponseError {
    error: any;
    status: any;
  }
  const showError = (res: ResponseError) => {
    const { error, status } = res;
    // let title = i18n.t('AbpAccount::DefaultErrorMessage');
    let message = "Có lỗi xảy ra!";
    if (typeof error === "string") {
      message = error;
    } else if (error.details) {
      message = error.details;
    } else if (error.message) {
      message = error.message;
    } else {
      switch (status) {
        case 401:
          store.dispatch(
            CommonFunction.setRedirectPath(window.location.pathname)
          );
          store.dispatch(UserFunction.logout());
          history.push("/auth/login");
          message = "Phiên đăng nhập đã hết hạn!";
          break;
        case 403:
          message = "Bạn không thể thực hiện chức năng này!";
          break;
        case 500:
          message = "Có lỗi xảy ra!";
          break;
        default:
          break;
      }
    }
    return { data: { message }, status };
  };

  axiosInstance.interceptors.request.use((request) => requestHandler(request));
  axiosInstance.interceptors.response.use(
    (response) => successHandler(response),
    (error) => errorHandler(error)
  );
};

export default axiosInstance;
