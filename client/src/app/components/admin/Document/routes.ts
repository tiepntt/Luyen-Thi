import GradeDocument from "./GradeDocument/GradeDocument";
import DocumentDetailAdmin from "./SubjectDocument/DocumentDetail/DocumentDetail";
import SubjectDocument from "./SubjectDocument/SubjectDocument";

export const routes = [
  {
    path: "/admin/document/:grade",
    exact: true,
    component: GradeDocument,
  },
  {
    path: "/admin/document/:gradeId/:subjectId",
    exact: true,
    component: SubjectDocument,
  },
  {
    path: "/admin/document/:gradeId/:subjectId/:documentId",
    exact: true,
    component: DocumentDetailAdmin,
  },
];
