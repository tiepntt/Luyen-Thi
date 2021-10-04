export interface Question {
  id: string;
  content: OptionQuestion[];
  introduction: [];
  solve: [];
  orderNumber: number;
  subQuestions: Question[];
  correctAnswer: string;
}
interface OptionQuestion {
  name: string;
  isTrue: boolean;
  content: [];
}
