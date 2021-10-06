import _ from "lodash";
import { Chapter } from "models/matrix/Chapter";
import { useEffect, useState } from "react";
import { chapterApi } from "services/api/matrix/chapter";
import { toastService } from "services/toast";

export const useChapters = (gradeId: string, subjectId: string) => {
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [currentChapter, setCurrentChappter] = useState<Chapter>();
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
  const updateChapter = (chapter: Chapter) => {
    let newChapters = [...chapters];
    const index = newChapters.findIndex((i) => i.id === chapter.id);
    if (index !== -1) {
      newChapters[index] = chapter;
      setChapters(newChapters);
    }
  };
  const deleteChapter = (chapter: Chapter) => {
    chapterApi.delete(chapter.id).then((res: any) => {
      if (res.status === 200) {
        toastService.success();
        const newChapters = chapters.filter((c) => c.id !== chapter.id);
        setChapters(newChapters);
      } else {
        toastService.error(res.message);
      }
    });
  };
  return {
    chapters,
    addChapter,
    updateChapter,
    removeChapter,
    currentChapter,
    setCurrentChappter,
    deleteChapter,
  };
};
