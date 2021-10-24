import { QuestionHistory } from "models/question/QuestionHistory";
import { QuestionHistoryStatus } from "settings/question/questionHistoryStatus";

export const getClassStatusQuestion = (questionHistory: QuestionHistory) => {
  switch (questionHistory.answerStatus) {
    case QuestionHistoryStatus.Temp:
      return "temp";
    case QuestionHistoryStatus.Correct:
      return "correct";
    case QuestionHistoryStatus.Incorrect:
      return "incorrect";
  }
};
