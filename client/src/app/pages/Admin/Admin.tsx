import { makeStyles, Theme } from "@material-ui/core";
import AdminSideBar from "app/components/_share/Menu/AdminSideBar/AdminSideBar";
import AdminTopBar from "app/components/_share/Menu/AdminTopBar/AdminTopBar";
import React, { useState } from "react";
import { Redirect, Route, Switch } from "react-router";
import { adminRoutes } from "./router";
import "./style.scss";

const AdminPage: React.FC = () => {
  const classes = useStyles();
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  // const history = useHistory();
  return (
    <div className={classes.root}>
      <div className="admin-page">
        <AdminTopBar onMobileNavOpen={() => setMobileNavOpen(true)} />
        <AdminSideBar
          onMobileClose={() => setMobileNavOpen(false)}
          openMobile={isMobileNavOpen}
        />
        {/* nav-bar-admin */}
        <div className={classes.wrapper}>
          <div className={classes.contentContainer}>
            <div className={classes.content}>
              <Switch>
                {adminRoutes.map((route, i) => (
                  <Route key={i} path={route.href} {...route} />
                ))}
                <Redirect from="/admin" to="/admin/dashboard" />
              </Switch>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
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
      paddingLeft: 256,
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

export default AdminPage;
