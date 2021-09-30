export interface Question {
  id: string;
  content: any;
  introduction: any;
  solve: any;
  orderNumber: number;
  subQuestions: Question[];
  correctAnswer: string;
}
