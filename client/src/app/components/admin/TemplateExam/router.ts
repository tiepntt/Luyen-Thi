import ListSubjectMatrix from "../Matrix/list-subject/ListSubjectMatrix";
import TemplateDetail from "./TemplateDetail";
import TemplateGrade from "./TemplateGrade";
import TemplateList from "./TemplateList";

export const routes = [
  {
    path: "/admin/template/:gradeId",
    exact: true,
    component: TemplateGrade,
  },
  {
    path: "/admin/template/:gradeId/:subjectId",
    exact: true,
    component: TemplateList,
  },
  {
    path: "/admin/template/:gradeId/:subjectId/:templateId",
    exact: true,
    component: TemplateDetail,
  },
];
