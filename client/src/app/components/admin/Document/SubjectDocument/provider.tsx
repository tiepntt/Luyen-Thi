import { Grade } from "hooks/Grade-Subject/useGrades";
import { Subject } from "hooks/Grade-Subject/useSubjects";
import React, { useContext } from "react";
export interface SubjectDocumentModels {
  grade: Grade;
  subject: Subject;
  showModal: boolean;
  setShowModal: (value: boolean) => void;
  showAddButton: boolean;
  setOnAddDocument: any;
  setShowAddButton: (value: boolean) => void;
}
export const SubjectDocumentContext =
  React.createContext<SubjectDocumentModels>({} as SubjectDocumentModels);
export const useSubjectDocumentContext = () =>
  useContext(SubjectDocumentContext);
