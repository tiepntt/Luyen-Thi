export enum DocumentTypeLabel {
  DOCUMENT = 1,
  EXAM = 0,
}
interface DocumentType {
  label: string;
  value: any;
  id?: any;
}
export const documentTypes: DocumentType[] = [
  {
    id: "1",
    label: "Tài liệu học tập",
    value: DocumentTypeLabel.DOCUMENT,
  },
  {
    id: "2",
    label: "Đề thi",
    value: DocumentTypeLabel.EXAM,
  },
];
