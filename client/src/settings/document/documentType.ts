export enum DocumentTypeLabel {
  DOCUMENT = 2,
  EXAM = 1,
}
interface DocumentType {
  label: string;
  value: any;
  id?: any;
}
export const documentTypes: DocumentType[] = [
  {
    id: "2",
    label: "Tài liệu học tập",
    value: DocumentTypeLabel.DOCUMENT,
  },
  {
    id: "1",
    label: "Đề thi",
    value: DocumentTypeLabel.EXAM,
  },
];
