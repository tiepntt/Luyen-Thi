import GradeDocumentBreadcubms from "app/components/_share/Breadcrumbs/GradeDocumentBreadcrubms/GradeDocumentBreadcubms";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import DocumentList from "./DocumentList/DocumentList";
import AddDocumentModal from "app/components/_share/Modals/AddDocumentModal/AddDocumentModal";
import { DocumentTitle } from "models/document/DocumentTitle";
import { DocumentGetAllRequest } from "models/document/DocumentGetAll";
import { documentApi } from "services/api/document/documentApi";
import { useAppContext } from "hooks/AppContext/AppContext";
interface Param {
  gradeId: string;
  subjectId: string;
}
const SubjectDocument = () => {
  const { gradeId, subjectId } = useParams<Param>();
  const { grades, subjects } = useAppContext();
  const subject = subjects.find((s) => s.code === subjectId);
  const grade = grades.find((s) => s.code === gradeId);
  const [showModal, setShowModal] = useState(false);
  const [showAddButton] = useState(true);
  const params = [
    {
      title: "Tài liệu",
      href: "/admin/document",
    },
    {
      title: grade?.name || "",
      href: `/admin/document/${grade?.code}`,
    },
    {
      title: subject?.name || "",
      href: ``,
    },
  ];
  const [documents, setDocuments] = useState<DocumentTitle[]>([]);
  const [request] = useState<DocumentGetAllRequest>({
    take: 5,
    skip: 0,
    key: "",
    gradeId: grade?.id,
    subjectId: subject?.id,
  });
  const location = useLocation();
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
  }, [location.pathname]);
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
      {grade && subject && (
        <AddDocumentModal
          grade={grade}
          subject={subject}
          show={showModal}
          setShow={setShowModal}
          onAddDocument={addDocument as any}
        />
      )}
    </div>
  );
};

export default SubjectDocument;
