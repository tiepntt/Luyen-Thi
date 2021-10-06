import DocumentEditQuestion from "./document-edit-question/DocumentEditQuestion";

export const routes = [
  {
    path: "/document",
    exact: true,
    component: DocumentEditQuestion,
  },
  {
    path: "document/:id/preview",
    component: DocumentEditQuestion,
    exact: true,
  },
  {
    path: "/document/:id/detail",
    component: DocumentEditQuestion,
    exact: true,
  },
  {
    path: "/document/:id/questions-edit",
    component: DocumentEditQuestion,
  },
];
