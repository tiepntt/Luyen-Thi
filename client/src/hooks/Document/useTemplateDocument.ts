import { TemplateDocument } from "models/template-document/template-document";
import { TemplateQuestionSet } from "models/template-document/template-question-set";
import { useEffect, useState } from "react";
import { templateApi } from "services/api/document/templateApi";
import { toastService } from "services/toast";

export const useTemplateDocument = (templateId: string) => {
  const [templateQuestionSets, setTemplateQuestionSets] = useState<
    TemplateQuestionSet[]
  >([]);
  const [template, setTemplate] = useState<TemplateDocument>();
  useEffect(() => {
    templateApi.getTemplate(templateId).then((res) => {
      if (res.status === 200) {
        setTemplateQuestionSets(res.data.templateQuestionSets);
        setTemplate(res.data);
      }
    });
  }, [templateId]);
  const addTQuestionSet = () => {
    templateApi
      .addQuestionSet(templateId, !templateQuestionSets.length)
      .then((res) => {
        if (res.status !== 200) {
          return toastService.error(res.data.message);
        }
        setTemplateQuestionSets([...templateQuestionSets, res.data]);
      });
  };
  const updateTQuestionSet = (TquestionSet: TemplateQuestionSet) => {
    const index = templateQuestionSets.findIndex(
      (i) => i.id === TquestionSet.id
    );
    if (index === -1) {
      return;
    }
    let newTemplateQuestionSets = [...templateQuestionSets];
    newTemplateQuestionSets[index] = TquestionSet;
    setTemplateQuestionSets(newTemplateQuestionSets);
  };
  const removeTQuestionSet = (TquestionSet: TemplateQuestionSet) => {
    templateApi.removeTQuestionSet(TquestionSet.id).then((res) => {
      if (res.status !== 200) {
        return toastService.error(res.data.message);
      }
      setTemplateQuestionSets(
        templateQuestionSets.filter((i) => i.id !== TquestionSet.id)
      );
    });
  };
  useEffect(() => {
    if (templateQuestionSets && template) {
      let numerQuestion = 0;
      try {
        numerQuestion = templateQuestionSets
          .map((t) => t.questionGenerates.map((q) => q.numberQuestion))
          .flat()
          .reduce((a, b) => a + b);
      } catch (e) {}
      if (template.numberQuestion !== numerQuestion) {
        templateApi
          .updateTemplate({
            ...template,
            numberQuestion: numerQuestion,
          })
          .then((res) => setTemplate(res.data));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [templateQuestionSets]);
  return {
    templateQuestionSets,
    setTemplateQuestionSets,
    addTQuestionSet,
    template,
    setTemplate,
    updateTQuestionSet,
    removeTQuestionSet,
  };
};
