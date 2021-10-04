export enum DocumentStatusLabel {
  PUBLIC = 1,
  PRIVATE = 0,
}
interface DocumentStatus {
  label: string;
  value: any;
}
export const documentStatuses: DocumentStatus[] = [
  {
    label: "Mọi người",
    value: DocumentStatusLabel.PUBLIC,
  },
  {
    label: "Chỉ mình tôi",
    value: DocumentStatusLabel.PRIVATE,
  },
];
