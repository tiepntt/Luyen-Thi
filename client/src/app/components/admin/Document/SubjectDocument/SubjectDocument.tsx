import GradeDocumentBreadcubms from "app/components/_share/Breadcrumbs/GradeDocumentBreadcrubms/GradeDocumentBreadcubms";
import React from "react";
import DocumentList from "./DocumentList/DocumentList";

const SubjectDocument = () => {
  return (
    <div className="subject-document">
      <GradeDocumentBreadcubms />
      <div className="main-content-document">
        <DocumentList />
      </div>
    </div>
  );
};

export default SubjectDocument;
