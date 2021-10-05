import _ from "lodash";
import { Chapter } from "models/matrix/Chapter";
import { useEffect, useState } from "react";
import { chapterApi } from "services/api/matrix/chapter";

export const useChapters = (gradeId: string, subjectId: string) => {
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const getChappter = () => {
    chapterApi.getChapter(gradeId, subjectId).then((res) => {
      if (res.status === 200) {
        setChapters(res.data);
      }
    });
  };
  const addChapter = (chapter: Chapter) => {
    setChapters([...chapters, chapter]);
  };
  const removeChapter = (chapter: Chapter) => {
    const newChapters = _.remove(chapters, chapter);
    setChapters(newChapters);
  };
  useEffect(() => {
    getChappter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gradeId, subjectId]);

  return { chapters, addChapter, removeChapter };
};
