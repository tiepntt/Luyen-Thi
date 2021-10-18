import { Avatar, Grid } from "@material-ui/core";
import UserFormInfo from "app/components/users/UserFormInfo";
import React from "react";
import "./style.scss";
const ProfileInfo = () => {
  return (
    <Grid container className="profile-user">
      <Grid item lg={3} md={6} sm={12}>
        <div className="profile-info-left text-center pt-3">
          <div className="avt-image p-2 d-inline-block">
            <Avatar style={{ width: 150, height: 150 }} />
          </div>
          <div className="m-3">
            <h5 className="profile-name-user">Nguyễn Thái Tiệp</h5>
            <div>Quản trị viên</div>
          </div>
        </div>
      </Grid>
      <Grid item lg={9} md={6} sm={12}>
        <div className="info-user">
          <h5 className="profile-info-title mb-3">THÔNG TIN CÁ NHÂN</h5>
          <UserFormInfo />
        </div>
      </Grid>
    </Grid>
  );
};

export default ProfileInfo;
