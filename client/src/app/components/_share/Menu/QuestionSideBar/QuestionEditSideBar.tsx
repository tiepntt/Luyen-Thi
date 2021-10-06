import React, { useEffect } from "react";
import { Hidden, Drawer, makeStyles, Theme, Box } from "@material-ui/core";
import { useLocation } from "react-router-dom";
import { QuestionSetDetail } from "models/questionSet/QuestionSetDetail";
import QuestionSetItem from "./QuestionSetItem/QuestionSetItem";
interface Props {
  onMobileClose: () => void;
  openMobile: boolean;
  questionSets: QuestionSetDetail[];
}
const QuestionEditSideBar: React.FC<Props> = ({
  onMobileClose,
  openMobile,
  questionSets,
}) => {
  const classes = useStyles();
  const location = useLocation();

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);
  const content = (
    <Box height="100%" display="flex" flexDirection="column">
      <div className="question-set-list">
        {questionSets.map((questionSet, i) => (
          <QuestionSetItem key={i} questionSet={questionSet} />
        ))}
      </div>
    </Box>
  );
  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

export default QuestionEditSideBar;
const useStyles: any = makeStyles((theme: Theme) => ({
  mobileDrawer: {
    width: 375,
  },
  tabDrawer: {
    width: 375,
  },
  desktopDrawer: {
    width: 375,
    top: 64,
    height: "calc(100% - 64px)",
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 10,
    backgroundColor: "#F6F5F5",
  },
  avatar: {
    cursor: "pointer",
    width: 64,
    height: 64,
    // border: `2px solid gray`,
    boxShadow:
      ": 0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
  },
  input: {
    display: "none",
  },
}));
