import { Grid } from "@material-ui/core";
import DocumentExamContent from "app/components/documents/DocumentExamContent";
import DocumentExamSidebar from "app/components/sidebars/DocumentExamSidebar";
import SnipperLayout from "app/components/_share/Layouts/SpinnerLayout";
import DocumentExamTopbar from "app/components/_share/Menu/DocumentExamTopBar";
import { useAppContext } from "hooks/AppContext";
import { useDocumentExam } from "hooks/Document/useDocumentExam";
import {
  HistoriesQuestionModel,
  HistoryQuestions,
} from "hooks/Question/historyQuestionExam";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router";
import { DocumentHistoryStatus } from "settings/document/documentHistory";
import ModalShowMark from "./modalShowMark";
import "./style.scss";
const DocumentExam = () => {
  const { showHeader, setShowHeader } = useAppContext();
  const { id } = useParams<any>();
  const {
    documentHistory,
    document,
    times,
    userAnswerIndex,
    answerQuestionIndex,
    submit,
    reset,
  } = useDocumentExam(id);
  useEffect(() => {
    if (showHeader) {
      setShowHeader(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showHeader]);
  const [showModalMark, setShowModalMark] = useState(false);
  const [showLoadingMark, setShowLoadingMark] = useState(false);
  const handleCloseModalMark = () => setShowModalMark(false);
  const handleShowModalMark = () => setShowModalMark(true);
  const questionHistoriesValue = {
    questionHistories: documentHistory?.questionHistories || [],
    disable: !(
      documentHistory && documentHistory.status !== DocumentHistoryStatus.Doing
    ),
    setQuestionHistoryIndex: answerQuestionIndex,
    userAnswerIndex: userAnswerIndex,
  } as HistoriesQuestionModel;

  useEffect(() => {
    if (
      documentHistory &&
      documentHistory.status === DocumentHistoryStatus.Close
    ) {
      handleShowModalMark();
      if (
        documentHistory.numberIncorrect + documentHistory.numberCorrect ===
        0
      ) {
        setShowLoadingMark(true);
      } else {
        setShowLoadingMark(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    documentHistory.numberCorrect,
    documentHistory.numberIncorrect,
    documentHistory.status,
  ]);

  const getMark = () => {
    if (documentHistory.numberCorrect + documentHistory.numberIncorrect !== 0) {
      return (
        (documentHistory.numberCorrect * 10) /
        (documentHistory.numberCorrect + documentHistory.numberIncorrect)
      );
    }
  };

  return (
    <div id={`document-exam-page`}>
      <SnipperLayout className="no-content" loading={document}>
        <DocumentExamTopbar document={document} />
        <Container>
          <HistoryQuestions.Provider value={questionHistoriesValue}>
            <div className="document-exam-main">
              <Grid container className="h-100">
                <Grid item lg={3} md={4} className="h-100">
                  <DocumentExamSidebar
                    documentHistory={documentHistory}
                    times={times}
                    onSubmit={submit}
                    onReset={reset}
                  />
                </Grid>
                <Grid item lg={9} md={8}>
                  <div className="exam-content">
                    <DocumentExamContent
                      questionSets={document?.questionSets || []}
                    />
                  </div>
                </Grid>
              </Grid>
            </div>
            <ModalShowMark
              loading={showLoadingMark}
              show={showModalMark}
              handleClose={handleCloseModalMark}
              getMark={getMark}
              documentHistory={documentHistory}
            />
          </HistoryQuestions.Provider>
        </Container>
      </SnipperLayout>
    </div>
  );
};

export default DocumentExam;
