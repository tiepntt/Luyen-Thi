import { Grid } from "@material-ui/core";
import GradeDocumentBreadcubms from "app/components/_share/Breadcrumbs/GradeDocumentBreadcrubms/GradeDocumentBreadcubms";
import { DocumentDetail } from "models/document/DocumentDetail";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { documentApi } from "services/api/document/documentApi";
import { GradeApi } from "services/api/grade-subject/gradeApi";
import { SubjectApi } from "services/api/grade-subject/subecjtApi";
import QuestionDocument from "./question-documents/QuestionDocument";
interface Param {
  gradeId: string;
  subjectId: string;
  documentId: string;
}
const DocumentDetailAdmin = () => {
  const { gradeId, subjectId, documentId } = useParams<Param>();
  const grade = GradeApi.getGrade(gradeId);
  const subject = SubjectApi.getSubject(subjectId);
  const [document, setDocument] = useState<DocumentDetail>();
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
      href: `/admin/document/${grade.code}/${subject.code}`,
    },
    {
      title: document?.name || "",
      href: ``,
    },
  ];
  useEffect(() => {
    documentApi.getById(documentId).then((res) => {
      if (res.status === 200) {
        setDocument(res.data);
      }
    });
  }, [documentId]);
  return (
    <div className="admin-document-detail">
      <GradeDocumentBreadcubms params={params} />
      <div className="main-content-document">
        <Grid container>
          <Grid item lg={9} md={12} xl={8} xs={12}>
            {/* // question-document */}
            <QuestionDocument documentId={documentId} />
          </Grid>
          <Grid item lg={3} md={12} xl={4} xs={12}></Grid>
        </Grid>
      </div>
    </div>
  );
};

export default DocumentDetailAdmin;
