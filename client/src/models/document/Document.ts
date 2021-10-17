export interface DocumentCreate {
  name: string;
  gradeId?: string;
  subjectId?: string;
  description: string;
  documentType: number;
}
