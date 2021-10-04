export enum DocumentTypeLabel {
  DOCUMENT = 1,
  EXAM = 0,
}
interface DocumentType {
  label: string;
  value: any;
}
export const documentTypes: DocumentType[] = [
  {
    label: "Tài liệu học tập",
    value: DocumentTypeLabel.DOCUMENT,
  },
  {
    label: "Đề thi",
    value: DocumentTypeLabel.EXAM,
  },
];
