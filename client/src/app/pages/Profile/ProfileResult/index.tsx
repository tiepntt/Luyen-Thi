import { Grid } from "@material-ui/core";
import ProfileResultSidebar from "app/components/sidebars/ProfileResultSidebar";
import UserResult from "app/components/users/UserResult";
import React from "react";
import "./style.scss";
const ProfileResult = () => {
  return (
    <Grid container>
      <Grid item lg={2} md={2} sm={12} xs={12}>
        <ProfileResultSidebar />
      </Grid>
      <Grid item lg={10} md={10} sm={12} xs={12} className="border-left">
        <UserResult />
      </Grid>
    </Grid>
  );
};

export default ProfileResult;
