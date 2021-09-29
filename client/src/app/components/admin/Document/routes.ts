import GradeDocument from "./GradeDocument/GradeDocument";
import SubjectDocument from "./SubjectDocument/SubjectDocument";

export const routes = [
  {
    path: "/admin/document/:grade",
    exact: true,
    component: GradeDocument,
  },
  {
    path: "/admin/document/:grade/:subject",
    exact: true,
    component: SubjectDocument,
  },
];
