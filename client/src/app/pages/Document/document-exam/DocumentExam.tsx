import { Grid } from "@material-ui/core";
import DocumentExamSidebar from "app/components/sidebars/DocumentExamSidebar";
import DocumentExamTopbar from "app/components/_share/Menu/DocumentExamTopBar";
import { useAppContext } from "hooks/AppContext/AppContext";
import { useDocumentExam } from "hooks/Document/useDocumentExam";
import {
  HistoriesQuestionModel,
  HistoryQuestions,
} from "hooks/Question/historyQuestionExam";
import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router";
import "./style.scss";
const DocumentExam = () => {
  const { showHeader, setShowHeader } = useAppContext();
  const { id } = useParams<any>();
  const { documentHistory, document } = useDocumentExam(id);
  useEffect(() => {
    if (showHeader) {
      setShowHeader(false);
      console.log(showHeader);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showHeader]);
  const questionHistoriesValue = {
    questionHistories: documentHistory?.questionHistories || [],
  } as HistoriesQuestionModel;
  return (
    <div className="h-100" id="document-exam-page">
      <DocumentExamTopbar />
      <Container>
        <HistoryQuestions.Provider value={questionHistoriesValue}>
          <div className="document-exam-main">
            <Grid container className="h-100">
              <Grid item lg={8} md={8}></Grid>
              <Grid item lg={4} md={4} className="h-100">
                <DocumentExamSidebar />
              </Grid>
            </Grid>
          </div>
        </HistoryQuestions.Provider>
      </Container>
    </div>
  );
};

export default DocumentExam;
