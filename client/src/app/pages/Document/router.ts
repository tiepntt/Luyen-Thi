import DocumentExam from "./document-exam/DocumentExam";
import DocumentPreivew from "./document-preview/DocumentPreivew";
import DocumentSearch from "./document-search/DocumentSearch";

export const routes = [
  {
    path: "/document",
    component: DocumentSearch,
    exact: true,
  },
  {
    path: "/document/exam",
    component: DocumentSearch,
    exact: true,
  },
  {
    path: "/document/",
    component: DocumentSearch,
    exact: true,
  },
  {
    path: "/document/:id/preview",
    exact: true,
    component: DocumentPreivew,
  },
  {
    path: "/document/:id",
    exact: true,
    component: DocumentExam,
  },
];
