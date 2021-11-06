import GradeDocumentBreadcubms from "app/components/_share/Breadcrumbs/GradeDocumentBreadcrubms";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DocumentList from "./DocumentList/DocumentList";
import AddDocumentModal from "app/components/_share/Modals/AddDocumentModal";
import { DocumentTitle } from "models/document/DocumentTitle";
import { DocumentGetAllRequest } from "models/document/DocumentGetAll";
import { documentApi } from "services/api/document/documentApi";
import { AppPagination } from "app/components/_share/Pagination";
import { NumberParam, StringParam, useQueryParams } from "use-query-params";
import { history } from "services/history";
import queryString from "query-string";
import { useGrades } from "hooks/Grade-Subject/useGrades";
import { useSubjects } from "hooks/Grade-Subject/useSubjects";
interface Param {
  gradeId: string;
  subjectId: string;
}
const SubjectDocument = () => {
  const { gradeId, subjectId } = useParams<Param>();
  const { grades } = useGrades(subjectId);
  const { subjects } = useSubjects(gradeId);
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
  const [count, setCount] = React.useState(10);
  const [filter] = useQueryParams({
    key: StringParam,
    page: NumberParam,
    type: NumberParam,
  });
  const getDocuments = (query: DocumentGetAllRequest) => {
    documentApi.getAll(query).then((res: any) => {
      if (res.status === 200) {
        setDocuments(res.data.documents);
        setCount(res.data.total);
      }
    });
  };
  const addDocument = (doc: any) => {
    setDocuments([...documents, { ...doc }]);
  };
  useEffect(() => {
    if (grade && subject) {
      var query: DocumentGetAllRequest = {
        key: filter.key || "",
        skip: ((filter.page || 1) - 1) * 6,
        gradeId: grade?.id,
        subjectId: subject?.id,
        take: 6,
      };
      getDocuments(query);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, grade, subject]);
  const onChangePage = (page: number) => {
    const newFilter = {
      ...filter,
      page,
    };
    history.push({
      pathname: `/admin/document/${grade?.code}/${subject?.code}`,
      search: queryString.stringify(newFilter),
    });
  };
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
      <AppPagination
        pageActive={filter.page || 1}
        lastPage={Math.ceil(count / 6)}
        onPageChange={onChangePage}
      />
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
