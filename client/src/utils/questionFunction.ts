import _ from "lodash";
import { QuestionHistory } from "models/question/QuestionHistory";
import { QuestionHistoryStatus } from "settings/question/questionHistoryStatus";

export const getClassStatusQuestion = (questionHistory: QuestionHistory) => {
  switch (questionHistory.answerStatus) {
    case QuestionHistoryStatus.Temp:
      return "temp";
    case QuestionHistoryStatus.Correct:
      return "correct";
    case QuestionHistoryStatus.InCorrect:
      return "incorrect";
  }
};
export const checkContentNull = (content: any[]) => {
  return (
    !content ||
    (content.length === 1 &&
      _.isEqual(content[0], {
        children: [{ text: "" }],
        type: "paragraph",
      }))
  );
};
