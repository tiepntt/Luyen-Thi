import { Grid } from "@material-ui/core";
import QuestionSetPreview from "app/components/question-set/QuestionSetPreview";
import DocumentPriviewSideBar from "app/components/sidebars/DocumentPreviewSideBar";
import DocumentBanner from "app/components/_share/Banners/DocumentBanner";
import { DocumentPreview } from "models/document/DocumentPreview";
import { QuestionHistory } from "models/question/QuestionHistory";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router";
import { documentApi } from "services/api/document/documentApi";
import { toastService } from "services/toast";
import { QuestionType } from "settings/question/questionType";
import "./style.scss";
const DocumentPreivew = () => {
  const [document, setDocument] = useState<DocumentPreview>();
  const { id } = useParams<any>();
  useEffect(() => {
    documentApi.getPreview(id).then((res) => {
      if (res.status === 200) {
        setDocument(res.data);
      } else {
        toastService.error(res.data.message);
      }
    });
  }, [id]);
  const [historyQuestion, setQuestionHistory] = useState<QuestionHistory[]>([]);
  useEffect(() => {
    if (document) {
      if (!document.questionHistory) {
        // createHistory
        setQuestionHistory(
          document.questionSets
            .map((qs) => qs.questions)
            .flat()
            .map((q) =>
              q.type === QuestionType.MultipleChoice ? q : q.subQuestions
            )
            .flat()
            .map((q) => ({
              questionId: q.id,
            }))
        );
      }
    }
  }, [document]);
  return (
    <div id="document-preview">
      <DocumentBanner document={document} />

      <Container>
        <div className=" px-3">
          <div className="document-main">
            <Grid container>
              <Grid item lg={4} md={4} className="document-preview-sidebar">
                <DocumentPriviewSideBar
                  questions={historyQuestion || []}
                  times={document?.times || 60}
                />
              </Grid>
              <Grid item lg={8} md={8} sm={12}>
                <div className="top-options"></div>
                <div className="document-preview">
                  {document?.questionSets.map((qs, i) => (
                    <QuestionSetPreview data={qs} />
                  ))}
                </div>
              </Grid>
            </Grid>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default DocumentPreivew;
