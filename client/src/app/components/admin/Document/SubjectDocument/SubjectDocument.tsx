import GradeDocumentBreadcubms from "app/components/_share/Breadcrumbs/GradeDocumentBreadcrubms/GradeDocumentBreadcubms";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DocumentList from "./DocumentList/DocumentList";
import { GradeApi } from "services/api/grade-subject/gradeApi";
import { SubjectApi } from "services/api/grade-subject/subecjtApi";
import AddDocumentModal from "app/components/_share/Modals/AddDocumentModal/AddDocumentModal";
import { DocumentTitle } from "models/document/DocumentTitle";
import { DocumentGetAllRequest } from "models/document/DocumentGetAll";
import { documentApi } from "services/api/document/documentApi";
interface Param {
  gradeId: string;
  subjectId: string;
}
const SubjectDocument = () => {
  const { gradeId, subjectId } = useParams<Param>();
  const grade = GradeApi.getGrade(gradeId);
  const subject = SubjectApi.getSubject(subjectId);
  const [showModal, setShowModal] = useState(false);
  const [showAddButton] = useState(true);
  const params = [
    {
      title: "Tài liệu",
      href: "/admin/document",
    },
    {
      title: grade.name,
      href: `/admin/document/${grade.code}`,
    },
    {
      title: subject.name,
      href: ``,
    },
  ];
  const [documents, setDocuments] = useState<DocumentTitle[]>([]);
  const [request] = useState<DocumentGetAllRequest>({
    take: 5,
    skip: 0,
    key: "",
    gradeId: grade.id,
    subjectId: subject.id,
  });
  const getDocuments = () => {
    documentApi.getAll(request).then((res: any) => {
      if (res.status === 200) {
        setDocuments(res.data);
      }
    });
  };
  const addDocument = (doc: any) => {
    setDocuments([...documents, { ...doc }]);
  };
  useEffect(() => {
    getDocuments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [request]);
  return (
    <div className="subject-document">
      <GradeDocumentBreadcubms
        params={params}
        showModalAdd={() => setShowModal(true)}
        showAddButton={showAddButton}
      />
      <div className="main-content-document">
        <DocumentList documents={documents} />
      </div>
      <AddDocumentModal
        grade={grade}
        subject={subject}
        show={showModal}
        setShow={setShowModal}
        onAddDocument={addDocument as any}
      />
    </div>
  );
};

export default SubjectDocument;
