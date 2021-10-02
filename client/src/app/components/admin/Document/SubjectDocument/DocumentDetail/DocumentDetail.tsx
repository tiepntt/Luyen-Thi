import { Grid } from "@material-ui/core";
import GradeDocumentBreadcubms from "app/components/_share/Breadcrumbs/GradeDocumentBreadcrubms/GradeDocumentBreadcubms";
import { DocumentDetailContext } from "hooks/Document/DocumentDetailContext";
import { DocumentDetail } from "models/document/DocumentDetail";
import { QuestionSetDetail } from "models/questionSet/QuestionSetDetail";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { documentApi } from "services/api/document/documentApi";
import { questionSetApi } from "services/api/document/questionSetApi";
import { GradeApi } from "services/api/grade-subject/gradeApi";
import { SubjectApi } from "services/api/grade-subject/subecjtApi";
import DocumentEditInfo from "./document-info";
import QuestionDocument from "./question-documents/QuestionDocument";
import "./style.scss";
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
  const [questionSets, setQuestionSets] = useState<QuestionSetDetail[]>();
  const getQuestionDocument = () => {
    questionSetApi.getByDocumentId(documentId).then((res) => {
      if (res.status === 200) {
        setQuestionSets(res.data);
      }
    });
  };
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
    getQuestionDocument();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [documentId]);
  const values = {
    document,
    setDocument,
    questionSets,
    setQuestionSets,
  };
  return (
    <DocumentDetailContext.Provider value={values as any}>
      <div className="admin-document-detail">
        <GradeDocumentBreadcubms params={params} />
        <div className="main-content-document">
          <Grid container spacing={1}>
            <Grid item lg={12} md={12} xl={6} xs={12}>
              <DocumentEditInfo documentId={documentId} />
            </Grid>
            <Grid item lg={12} md={12} xl={6} xs={12}>
              {/* // question-document */}
              <QuestionDocument
                documentId={documentId}
                questionSets={questionSets}
                setQuestionSets={setQuestionSets}
              />
            </Grid>
          </Grid>
        </div>
      </div>
    </DocumentDetailContext.Provider>
  );
};

export default DocumentDetailAdmin;
