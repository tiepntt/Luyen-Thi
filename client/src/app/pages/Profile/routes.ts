import ProfileInfo from "./ProfileInfo";
import ProfileHistory from "./ProfileHistory";
import ProfileResult from "./ProfileResult";
import { BarChart as BarChartIcon, User as UserIcon } from "react-feather";

export const profileRoutes = [
  {
    exact: true,
    title: "Thông tin cá nhân",
    path: "/profile/info",
    component: ProfileInfo,
    icon: UserIcon,
  },
  {
    exact: false,
    path: "/profile/result",
    title: "Kết quả học tập",
    component: ProfileResult,
    icon: BarChartIcon,
  },
  {
    exact: true,
    path: "/profile/history",
    title: "Tài liệu đã làm",
    component: ProfileHistory,
    icon: BarChartIcon,
  },
];
