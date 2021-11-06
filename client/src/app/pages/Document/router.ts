import DocumentPreivew from "./document-preview";
import DocumentSearch from "./document-search";

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
