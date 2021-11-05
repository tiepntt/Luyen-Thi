import DocumentPreivew from "./document-preview/DocumentPreivew";
import DocumentSearch from "./document-search/DocumentSearch";

export const routes = [
  {
    path: "/document",
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
    component: DocumentPreivew,
  },
];
