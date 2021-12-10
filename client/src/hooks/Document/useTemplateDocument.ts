import { TemplateQuestionSet } from "models/template-document/template-question-set";
import { useState } from "react";
import { templateApi } from "services/api/document/templateApi";
import { Status } from "settings/_share/httpCode";

export const useTemplateDocument = (
  questionSetTemplates: TemplateQuestionSet[],
  templateId: string
) => {
  const [templeQuestionSets, setTemplateQuestionSets] =
    useState<TemplateQuestionSet[]>(questionSetTemplates);
  const addQuestionSet = () => {
    templateApi.addQuestionSet(templateId).then((res) => {
      if (res.status === Status.Ok) {
        setTemplateQuestionSets([...templeQuestionSets, res.data]);
      }
    });
  };
  return { templeQuestionSets, setTemplateQuestionSets, addQuestionSet };
};
