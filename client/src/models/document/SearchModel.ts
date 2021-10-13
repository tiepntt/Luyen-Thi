export interface SearchModel {
  take: number;
  skip: number;
  key?: string;
  gradeId?: string;
  subjectId?: string;
  type?: DocumentType;
  page?: number;
}
