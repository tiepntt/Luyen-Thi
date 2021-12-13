import React from "react";
import { Container } from "react-bootstrap";
import "./style.scss";
import ProfileNavbar from "app/components/_share/Menu/ProfileNavbar";
import { Redirect, Route, Switch } from "react-router";
import { profileRoutes } from "./routes";

const ProfilePage: React.FC = () => {
  return (
    <div className="profile">
      <Container className="px-3">
        <div className="profile-main-content">
          <ProfileNavbar />
          <div className="profile-content">
            <Switch>
              {profileRoutes.map((route, i) => (
                <Route {...route} key={i} />
              ))}
              <Redirect exact from="/profile" to={"/profile/info"} />
            </Switch>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ProfilePage;
