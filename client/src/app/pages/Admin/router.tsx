import { BarChart as BarChartIcon, User as UserIcon } from "react-feather";
export const adminRoutes = [
  {
    href: "/admin/dashboard",
    icon: BarChartIcon,
    title: "Thống kê",
    component: null,
  },
  {
    href: "/admin/profile",
    icon: UserIcon,
    title: "Thông tin cá nhân",
    component: null,
  },
  {
    href: "/admin/document",
    icon: UserIcon,
    title: "Tài liệu",
    component: null,
  },
  {
    href: "/admin/matrix",
    icon: UserIcon,
    title: "Ma trận đề thi",
    component: null,
  },
  {
    href: "/admin/template",
    icon: UserIcon,
    title: "Mẫu đề thi",
    component: null,
  },
  {
    href: "/admin/aprove",
    icon: UserIcon,
    title: "Phê duyệt",
    component: null,
  },
  {
    href: "/admin/users",
    icon: UserIcon,
    title: "Người dùng",
    component: null,
  },
];
