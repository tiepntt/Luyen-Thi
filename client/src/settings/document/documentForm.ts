export enum DocumentFormLabel {
  ALL = 0,
  ONE = 1,
}
export const documentForms: DocumentForm[] = [
  {
    label: "Làm cả bài",
    value: DocumentFormLabel.ALL,
  },
  {
    label: "Làm từng câu",
    value: DocumentFormLabel.ONE,
  },
];
interface DocumentForm {
  value: number;
  label: string;
}
