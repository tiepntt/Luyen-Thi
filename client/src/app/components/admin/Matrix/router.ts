import ChapterList from "./chapter/ChapterList";
import ListSubjectMatrix from "./list-subject/ListSubjectMatrix";
import ChapterUnits from "./unit/ChapterUnits";

export const routes = [
  {
    path: "/admin/matrix/:grade",
    exact: true,
    component: ListSubjectMatrix,
  },
  {
    path: "/admin/matrix/:gradeId/:subjectId",
    exact: true,
    component: ChapterList,
  },
  {
    path: "/admin/matrix/:gradeId/:subjectId/:chapterId",
    exact: true,
    component: ChapterUnits,
  },
];
