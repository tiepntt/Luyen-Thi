import { ListItem, Button } from "@material-ui/core";
import { profileRoutes } from "app/pages/Profile/routes";
import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./style.scss";
const ProfileNavbar = () => {
  const location = useLocation();
  return (
    <div className="profile-user-navbar d-flex">
      {profileRoutes.map((route, i) => (
        <ListItem
          disableGutters
          className={`profile-item ${
            location.pathname.includes(route.path) && "active"
          }`}
        >
          <Button
            activeClassName={"active"}
            className="profile-item-buton"
            component={NavLink}
            to={route.path}
          >
            <span>{route.title}</span>
          </Button>
        </ListItem>
      ))}
    </div>
  );
};

export default ProfileNavbar;
