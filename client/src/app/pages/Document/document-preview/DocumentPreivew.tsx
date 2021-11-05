import DocumentBanner from "app/components/_share/Banners/DocumentBanner";
import SnipperLayout from "app/components/_share/Layouts/SpinnerLayout";
import DocumentPreviewTopBar from "app/components/_share/Menu/DocumentPreviewTopbar";
import { DocumentPreview } from "models/document/DocumentPreview";
import React, { useEffect, useState, Suspense } from "react";
import { Container } from "react-bootstrap";
import { Redirect, Route, Switch, useParams } from "react-router";
import { documentApi } from "services/api/document/documentApi";
import { examApi } from "services/api/document/examApi";
import { history } from "services/history";
import { toastService } from "services/toast";
import { DocumentHistoryStatus } from "settings/document/documentHistory";
import "./style.scss";
const DocumentPreviewQuestion = React.lazy(
  () => import("app/components/documents/DocumentPreviewQuestion")
);
const DocumentPreviewRank = React.lazy(
  () => import("app/components/documents/DocumentPreviewRank")
);

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
  const startExam = () => {
    if (document) {
      examApi.reset(document?.id).then((res) => {
        if (res.status === 200) {
          history.push(`/document/${document?.id}`);
        } else {
          toastService.error(res.data.message);
        }
      });
    }
  };
  const continueExam = () => {
    history.push(`/document/${document?.id}`);
  };
  return (
    <div id="document-preview">
      <SnipperLayout loading={document} className="page-no-data">
        <DocumentBanner document={document} />
        <Container>
          <div className=" px-3">
            <div className="document-main">
              <DocumentPreviewTopBar
                status={
                  document?.documentHistory?.status ||
                  DocumentHistoryStatus.Close
                }
                documentId={document?.id}
                startExam={startExam}
                continueExam={continueExam}
              />
              <Suspense fallback={<></>}>
                <Switch>
                  <Route path={"/document/:id/preview/question"} exact>
                    <DocumentPreviewQuestion document={document} />
                  </Route>
                  <Route path={"/document/:id/preview/rank"} exact>
                    <DocumentPreviewRank
                      totalQuestions={document?.numberQuestion}
                    />
                  </Route>
                  <Redirect
                    from={"/document/:id/preview"}
                    to={"/document/:id/preview/question"}
                  />
                </Switch>
              </Suspense>
            </div>
          </div>
        </Container>
      </SnipperLayout>
    </div>
  );
};

export default DocumentPreivew;
