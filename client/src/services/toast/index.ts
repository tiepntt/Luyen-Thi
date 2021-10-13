import { toast } from "react-toastify";
export const toastService = {
  success: (message?: string) => {
    toast.success(message || "Thành công");
  },
  error: (message?: string) => {
    toast.error(message || "Thất bại");
  },
  warning: (message?: string) => {
    toast.warning(message || "Có lỗi xảy ra");
  },
};
