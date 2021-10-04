import axios from "axios";
import { toastService } from "services/toast";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  responseType: "json",
});

export const setupAxios = () => {
  const requestHandler = (request: any) => {
    // const {
    //   auth: { authToken, tenant, language },
    // } = store.getState();

    // if (authToken) {
    //   request.headers.Authorization = `Bearer ${authToken}`;
    // }

    // if (language) {
    //   request.headers["Accept-Language"] = language;
    // }

    // if (tenant) {
    //   request.headers.__tenant = tenant.tenantId;
    // }

    return request;
  };

  const successHandler = (response: any) => {
    return response;
  };

  const errorHandler = (error: any) => {
    const errorRes = error.response;
    if (errorRes) {
      showError({ error: errorRes.data || {}, status: errorRes.status });
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
          message = "Bạn cần đăng nhập để thực hiện chức năng này!";
          break;
        case 403:
          message = "Bạn không thể thực hiện chức năng này!";
          break;
        case 404:
          message = "Không tồn tại!";
          break;
        case 500:
          message = "Có lỗi xảy ra!";
          break;
        default:
          break;
      }
    }

    toastService.error(`${message}`);
  };

  axiosInstance.interceptors.request.use((request) => requestHandler(request));
  axiosInstance.interceptors.response.use(
    (response) => successHandler(response),
    (error) => errorHandler(error)
  );
};

export default axiosInstance;
