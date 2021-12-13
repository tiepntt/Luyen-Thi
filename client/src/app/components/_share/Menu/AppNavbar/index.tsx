import React, { useEffect } from "react";
import "./style.scss";
import MenuIcon from "@material-ui/icons/Menu";

import { AppBar, Box, Hidden, IconButton, Toolbar } from "@material-ui/core";
import { Button, Container } from "react-bootstrap";
import Logo from "../../Logo/Logo";
import { NavLink } from "react-router-dom";
import { RootState } from "redux/store";
import { useSelector } from "react-redux";
import { UserRedux } from "models/user/userInfo";
import UserBadge from "../../Badge/UserBadge";
interface Props {
  className?: string;
  onMobileNavOpen: () => void;
  rest?: any;
}
const AppNavbar: React.FC<Props> = ({ className, onMobileNavOpen, rest }) => {
  const userRedux = useSelector<RootState, UserRedux>(
    (root: RootState) => root.UserReducer
  );
  useEffect(() => {
    window.addEventListener("scroll", () => {
      var header = document.getElementById("app-nav-bar");
      header?.classList.toggle("sticky", window.scrollY > 64);
    });
  }, []);
  return (
    <AppBar className={"app-nav-bar"} elevation={0} id="app-nav-bar">
      <Container>
        <Toolbar>
          <Logo />
          <Box flexGrow={1} />
          <Hidden mdDown>
            <div className="nav-bar-list mx-2">
              <NavLink
                to="/home"
                activeClassName="active"
                className="navbar-item"
              >
                Trang chủ
              </NavLink>
              <NavLink
                to="/document"
                activeClassName="active"
                className="navbar-item"
              >
                Tài liệu
              </NavLink>
              <NavLink
                to="/practice"
                activeClassName="active"
                className="navbar-item"
              >
                Luyện thi
              </NavLink>
              {/* <NavLink
                to="/class-room"
                activeClassName="active"
                className="navbar-item"
              >
                Lớp học
              </NavLink> */}
            </div>
            {!userRedux.accessToken ? (
              <div className="auth-button">
                <Button
                  className="mx-2"
                  to="/auth/login"
                  as={NavLink}
                  activeClassName="none"
                >
                  Đăng nhập
                </Button>
                <Button
                  className="mx-2"
                  to="/auth/register"
                  as={NavLink}
                  activeClassName="none"
                >
                  Đăng ký
                </Button>
              </div>
            ) : (
              <div className="user-info mx-2 mr-0">
                {/* <Notification /> */}
                <UserBadge user={userRedux.userInfo as any} />
              </div>
            )}
          </Hidden>
          <Hidden lgUp>
            <IconButton color="inherit" onClick={onMobileNavOpen}>
              <MenuIcon />
            </IconButton>
          </Hidden>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default AppNavbar;
