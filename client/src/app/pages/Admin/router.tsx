import Dashboard from "app/components/admin/Dashboard";
import Document from "app/components/admin/Document";
import Matrix from "app/components/admin/Matrix";
import TemplateExam from "app/components/admin/TemplateExam";
import User from "app/components/admin/User";
import { BarChart as BarChartIcon, User as UserIcon } from "react-feather";
export const adminRoutes = [
  {
    href: "/admin/dashboard",
    icon: BarChartIcon,
    title: "Thống kê",
    component: Dashboard,
  },
  {
    href: "/admin/document",
    icon: UserIcon,
    title: "Tài liệu",
    component: Document,
  },
  {
    href: "/admin/matrix",
    icon: UserIcon,
    title: "Ma trận đề thi",
    component: Matrix,
  },
  {
    href: "/admin/template",
    icon: UserIcon,
    title: "Mẫu đề thi",
    component: TemplateExam,
  },
  {
    href: "/admin/users",
    icon: UserIcon,
    title: "Người dùng",
    component: User,
  },
];
