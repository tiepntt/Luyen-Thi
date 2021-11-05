import { Grid } from "@material-ui/core";
import Spinner from "app/components/_share/StaticLayout/Spinner";
import { useAppContext } from "hooks/AppContext/AppContext";
import { DocumentPreview } from "models/document/DocumentPreview";
import { QuestionHistory } from "models/question/QuestionHistory";
import React, { useEffect, useState, Suspense } from "react";
import { QuestionType } from "settings/question/questionType";
const QuestionSetPreview = React.lazy(
  () => import("app/components/question-set/QuestionSetPreview")
);
const DocumentPriviewSideBar = React.lazy(
  () => import("app/components/sidebars/DocumentPreviewSideBar")
);
interface Props {
  document?: DocumentPreview;
}
const DocumentPreviewQuestion: React.FC<Props> = ({ document }) => {
  const [historyQuestion, setQuestionHistory] = useState<QuestionHistory[]>([]);
  const { scrollTop } = useAppContext();
  useEffect(() => {
    if (document) {
      // createHistory
      scrollTop();
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [document]);
  return (
    <div className="documnt-preview-question" style={{ minHeight: 300 }}>
      <Suspense fallback={<Spinner />}>
        <Grid container>
          <Grid item lg={4} md={4} className="document-preview-sidebar">
            <DocumentPriviewSideBar
              questions={historyQuestion || []}
              times={document?.times || 60}
            />
          </Grid>
          <Grid item lg={8} md={8} sm={12}>
            <div className="document-preview">
              {document?.questionSets.map((qs, i) => (
                <QuestionSetPreview data={qs} />
              ))}
            </div>
          </Grid>
        </Grid>
      </Suspense>
    </div>
  );
};

export default DocumentPreviewQuestion;
