import TemplateDetail from "./TemplateDetail";
import TemplateGrade from "./TemplateGrade";

export const routes = [
  {
    path: "/admin/template",
    exact: true,
    component: TemplateGrade,
  },
  {
    path: "/admin/template/:subjectCode/",
    exact: true,
    component: TemplateDetail,
  },
];
