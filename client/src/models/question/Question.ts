import { initDefaultValue } from "app/components/question/QuestionEditor/QuestionSelectEditor/QuestionSelect";
import { QuestionStatus } from "settings/question/questionStatus";
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
  parentId?: string;
}
export interface QuestionContent {
  id: string;
  content: any;
  introduction: any;
  solve: any;
  correctAnswer: string;
}
export interface QuestionMatrix {
  id: string;
  gradeId: any;
  subjectId: any;
  chapterId: any;
  unitId: any;
  templateQuestionId: any;
}
export interface MatrixQuestion {
  id: string;
  gradeId: any;
  subjectId: any;
  chapterId: any;
  unitId: any;
  levelId: string;
  templateQuestionId: any;
  status: QuestionStatus;
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
