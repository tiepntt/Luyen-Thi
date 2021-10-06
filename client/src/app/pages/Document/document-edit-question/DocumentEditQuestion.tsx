import React, { useState } from "react";
import { Grid, makeStyles, Theme } from "@material-ui/core";
import "./style.scss";
import DocumentTopBar from "app/components/_share/Menu/DocumentTopBar/DocumentTopBar";
import QuestionEditSideBar from "app/components/_share/Menu/QuestionSideBar/QuestionEditSideBar";
import { Route, Switch, useParams } from "react-router";
import { useQuestions } from "hooks/Question/useQuestions";
import QuestionMatrixSideBar from "app/components/_share/Menu/QuestionMatrixSideBar/QuestionMatrixSideBar";
import QuestionDocument from "app/components/admin/Document/SubjectDocument/DocumentDetail/question-documents/QuestionDocument";
import QuestionEditor from "app/components/question/QuestionEditor/QuestionEditor";
import { DocumentEditContext } from "hooks/DocumentEditQuestionContext/DocumentEditContext";
const DocumentEditQuestion = () => {
  const { id } = useParams<Params>();
  // const [documentInfo, setDocumentInfo] = useState<DocoumentTitle>();
  const { question, questionSets, setQuestion, setQuestionSets } =
    useQuestions(id);
  const classes = useStyles();
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const value = {
    question: question as any,
    setQuestion,
  };
  return (
    <DocumentEditContext.Provider value={value}>
      <div className={classes.root}>
        <div className="edit-questions-page">
          <DocumentTopBar onMobileNavOpen={() => setMobileNavOpen(true)} />
          <QuestionEditSideBar
            onMobileClose={() => setMobileNavOpen(false)}
            openMobile={isMobileNavOpen}
            questionSets={questionSets}
          />
          <div className={classes.wrapper}>
            <div className={classes.contentContainer}>
              <div className={classes.content}>
                <div className="main-content-document">
                  <Grid container>
                    <Grid item xl={9} lg={8} md={12}>
                      <Switch>
                        <Route path="/document/:id/questions-edit" exact={true}>
                          <div className="preview-questions ">
                            <QuestionDocument
                              documentId={id}
                              questionSets={questionSets}
                              setQuestionSets={setQuestionSets}
                            />
                          </div>
                        </Route>
                        <Route
                          path="/document/:id/questions-edit/:questionId"
                          exact={true}
                        >
                          <div className="edit-question ">
                            <QuestionEditor />
                          </div>
                        </Route>
                      </Switch>
                    </Grid>
                    <Grid item xl={3} lg={4} md={12}>
                      <QuestionMatrixSideBar />
                    </Grid>
                  </Grid>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DocumentEditContext.Provider>
  );
};
interface Params {
  id: string;
}
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: "#F4F6F8",
    display: "flex",
    height: "100%",
    overflow: "hidden",
    width: "100%",
  },
  wrapper: {
    display: "flex",
    flex: "1 1 auto",
    overflow: "hidden",
    [theme.breakpoints.up("lg")]: {
      paddingLeft: 375,
    },
  },
  contentContainer: {
    display: "flex",
    flex: "1 1 auto",
    overflow: "hidden",
  },
  content: {
    flex: "1 1 auto",
    height: "100%",
    overflow: "auto",
  },
})) as any;

export default DocumentEditQuestion;
