import { useGrades } from "hooks/Grade-Subject/useGrades";
import { useSubjects } from "hooks/Grade-Subject/useSubjects";
import { useChapters } from "hooks/Matrix/useChapters";
import { useLevelQuestion } from "hooks/Matrix/useLevelQuestion";
import { useQuestionTemplate } from "hooks/Matrix/useTemplate";
import { useUnits } from "hooks/Matrix/useUnits";
import { MatrixQuestion } from "models/question/Question";
import { useState, useEffect } from "react";
import { questionApi } from "services/api/question/question";
import { toastService } from "services/toast";
import { QuestionStatus } from "settings/question/questionStatus";

export const useQuestionMatrix = (questionId: string) => {
  const [questionMatrix, setQuestionMatrix] = useState<MatrixQuestion>(
    null as any
  );
  const [loadding, setLoadding] = useState(false);
  const { grades } = useGrades();
  const { subjects } = useSubjects();
  const { chapters } = useChapters(
    questionMatrix?.gradeId,
    questionMatrix?.subjectId
  );
  const { units, setChappterId } = useUnits();
  const { templates } = useQuestionTemplate(questionMatrix?.unitId);
  const { levels } = useLevelQuestion();
  useEffect(() => {
    let unit = units.find((i) => i.id === questionMatrix?.unitId);
    setQuestionMatrix({ ...questionMatrix, unitId: unit ? unit.id : null });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [units]);
  useEffect(() => {
    setChappterId(questionMatrix?.chapterId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionMatrix?.chapterId]);

  useEffect(() => {
    let chapter = chapters.find((i) => i.id === questionMatrix?.chapterId);
    setQuestionMatrix({
      ...questionMatrix,
      chapterId: chapter ? chapter.id : null,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chapters]);
  useEffect(() => {
    let template = templates.find(
      (i) => i.id === questionMatrix?.templateQuestionId
    );
    setQuestionMatrix({
      ...questionMatrix,
      templateQuestionId: template ? template.id : null,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [templates]);
  const getQuestionMatrix = () => {
    setLoadding(true);
    questionApi.getMatrix(questionId).then((res) => {
      setLoadding(false);
      if (res.status === 200) {
        setQuestionMatrix(res.data);
      } else {
        toastService.error(res.data.message);
      }
    });
  };
  useEffect(() => {
    getQuestionMatrix();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionId]);
  const updateMatrix = () => {
    questionApi.updateMatrix(questionMatrix as any).then((res) => {
      if (res.status === 200) {
        toastService.success();
      } else {
        toastService.error(res.data.message);
      }
    });
  };
  const addToBank = () => {
    questionApi.addToBank(questionMatrix.id).then((res) => {
      if (res.status === 200) {
        setQuestionMatrix({ ...questionMatrix, status: QuestionStatus.Used });
        toastService.success("Đã thêm vào ngân hàng câu hỏi");
      } else {
        toastService.error(res.data.message);
      }
    });
  };
  const removeFromBank = () => {
    questionApi.removeFromBank(questionMatrix.id).then((res) => {
      if (res.status === 200) {
        setQuestionMatrix({
          ...questionMatrix,
          status: QuestionStatus.Waiting,
        });
        toastService.success("Đã xóa khỏi ngân hàng câu hỏi");
      } else {
        toastService.error(res.data.message);
      }
    });
  };
  return {
    loadding,
    grades,
    subjects,
    questionMatrix,
    chapters,
    units,
    levels,
    templates,
    setQuestionMatrix,
    addToBank,
    removeFromBank,
    updateMatrix,
  };
};
