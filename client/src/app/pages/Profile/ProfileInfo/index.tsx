import { Avatar, Grid } from "@material-ui/core";
import UserFormInfo from "app/components/users/UserFormInfo";
import UploadImageForm from "app/components/_share/Form/UploadImage/UploadImageForm";
import { UserInfo, UserUpdateInfo } from "models/user/userInfo";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { UserFunction } from "redux/user/action";
import { profileApi } from "services/api/user/profile";
import { toastService } from "services/toast";
import { getRoles } from "settings/user/role";
import "./style.scss";
const ProfileInfo = () => {
  const [userInfo, setuserInfo] = useState<UserInfo>();
  const dispatch = useDispatch();
  useEffect(() => {
    profileApi.getInfo().then((res) => {
      if (res.status === 200) {
        setuserInfo(res.data);
      }
    });
  }, []);
  const updateProfile = () => {
    if (userInfo) {
      const info: UserUpdateInfo = {
        id: userInfo?.id,
        firstName: userInfo?.firstName,
        lastName: userInfo?.lastName,
        avatarUrl: userInfo?.avatarUrl,
        phoneNumber: userInfo?.phoneNumber,
        birthDay: userInfo?.birthDay,
        gender: userInfo.gender,
      };
      profileApi.updateProfile(info).then((res) => {
        if (res.status === 200) {
          toastService.success();
          dispatch(UserFunction.updateUser(res.data));
        } else {
          toastService.error(res.data.message);
        }
      });
    }
  };
  const changeAvatar = (value: any) => {
    profileApi.changeAvatar(value).then((res) => {
      if (res.status === 200) {
        toastService.success();
        setuserInfo(res.data);
        dispatch(UserFunction.updateUser(res.data));
      } else {
        toastService.error(res.data.message);
      }
    });
  };
  return (
    <Grid container className="profile-user">
      <Grid item lg={3} md={4} sm={12}>
        <div className="profile-info-left text-center pt-3">
          <div className="avt-image p-2 d-inline-block">
            <Avatar
              style={{ width: 150, height: 150 }}
              src={userInfo?.avatarUrl}
            />
            <div className="pos-absolute image-editor">
              <UploadImageForm onUpload={changeAvatar} title="Sửa Avt" />
            </div>
          </div>
          <div className="m-3">
            <h5 className="profile-name-user">{`${userInfo?.lastName} ${userInfo?.firstName}`}</h5>
            <div>{getRoles([])?.name}</div>
          </div>
        </div>
      </Grid>
      <Grid item lg={9} md={8} sm={12}>
        <div className="info-user">
          <h5 className="profile-info-title mb-3">THÔNG TIN CÁ NHÂN</h5>
          <UserFormInfo
            user={userInfo}
            setUser={setuserInfo}
            onUpdate={updateProfile}
          />
        </div>
      </Grid>
    </Grid>
  );
};

export default ProfileInfo;
