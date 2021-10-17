export interface SearchModel {
  take?: number;
  skip?: number;
  key?: string;
  gradeCode?: string;
  subjectCode?: string;
  type?: DocumentType;
  page?: number;
}
