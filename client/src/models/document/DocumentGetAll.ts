export interface DocumentGetAllRequest {
  key?: string;
  gradeId?: string;
  subjectId?: string;
  take?: number;
  skip?: number;
  type?: DocumentType;
  status?: number;
}
