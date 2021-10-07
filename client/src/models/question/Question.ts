import { initDefaultValue } from "app/components/question/QuestionEditor/QuestionSelectEditor/QuestionSelect";
import { QuestionType } from "settings/question/questionType";

export interface Question {
  id: string;
  content: OptionQuestion[];
  introduction: [];
  solve: [];
  orderNumber: number;
  subQuestions: Question[];
  correctAnswer: string;
  type: QuestionType;
}
export interface QuestionCreate {
  content: OptionQuestion[];
  introduction: [];
  solve: [];
  orderNumber?: number;
  subQuestions: Question[];
  correctAnswer: string;
  type: QuestionType;
}
interface OptionQuestion {
  name: string;
  content: [];
}
const initOptionDefault = (index: any): OptionQuestion => {
  return {
    name: "ABCDEF"[index],
    content: initDefaultValue([]),
  } as OptionQuestion;
};
export const defaultQuestionMultipleChocie: QuestionCreate = {
  content: Array(4)
    .fill(null)
    .map((_, i) => initOptionDefault(i)),
  solve: initDefaultValue([]) as any,
  introduction: initDefaultValue([]) as any,
  subQuestions: [],
  correctAnswer: "A",
  type: QuestionType.MultipleChoice,
};

export const defaultQuestionGroup: QuestionCreate = {
  content: null as any,
  solve: null as any,
  introduction: initDefaultValue([]) as any,
  subQuestions: [],
  correctAnswer: "A",
  type: QuestionType.QuestionGroup,
};
