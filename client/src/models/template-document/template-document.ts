export interface TemplateDocument {
  id: string;
  subjectId: string;
  numberQuestion: number;
  times: number;
}
export interface TemplatePractice {
  id: string;
  subject: string;
  numberQuestion: string;
  times: number;
  documentId?: string;
}
