export interface Question {
  id: string;
  content: [];
  introduction: [];
  solve: [];
  orderNumber: number;
  subQuestions: Question[];
  correctAnswer: string;
}
