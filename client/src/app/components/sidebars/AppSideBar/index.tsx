import {
  Avatar,
  Button,
  Divider,
  Drawer,
  Hidden,
  List,
  ListItem,
  makeStyles,
  Theme,
} from "@material-ui/core";
import { Home, Poll, Bookmark, Class } from "@material-ui/icons";
import Logo from "app/components/_share/Logo/Logo";
import { UserRedux } from "models/user/userInfo";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import { RootState } from "redux/store";
import { UserFunction } from "redux/user/action";
import { history } from "services/history";
import { getRoles } from "settings/user/role";
import "./style.scss";
interface Props {
  onMobileClose: () => void;
  openMobile: boolean;
}

const AppSideBar: React.FC<Props> = ({ onMobileClose, openMobile }) => {
  const location = useLocation();
  const { userInfo } = useSelector<RootState, UserRedux>(
    (root: RootState) => root.UserReducer
  );
  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);
  const classes = useStyles();
  const navbarData = [
    {
      name: "Trang chủ",
      href: "/home",
      Icon: <Home className={classes.icon} />,
    },
    {
      name: "Tài liệu",
      href: "/document",
      Icon: <Poll className={classes.icon} />,
    },
    // {
    //   name: "Lớp học",
    //   href: "/classroom",
    //   Icon: <Class className={classes.icon} />,
    // },
    {
      name: "Luyện thi",
      href: "/practice",
      Icon: <Bookmark className={classes.icon} />,
    },
  ];
  const userNabar = [
    {
      name: "Thông tin tài khoản",
      href: "/profile/info",
      Icon: <Home className={classes.icon} />,
    },
    {
      name: "Kết quả học tập",
      href: "/profile/result",
      Icon: <Poll className={classes.icon} />,
    },
    {
      name: "Tài liệu đã làm",
      href: "/profile/history",
      Icon: <Class className={classes.icon} />,
    },
    {
      name: "Quản lý hệ thống",
      href: "/admin",
      Icon: <Bookmark className={classes.icon} />,
    },
  ];
  const authNabvar = [
    {
      name: "Đăng nhập",
      href: "/auth/login",
      Icon: <Home className={classes.icon} />,
    },
    {
      name: "Đăng ký",
      href: "/auth/register",
      Icon: <Poll className={classes.icon} />,
    },
  ];
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(UserFunction.logout());
    history.push("/auth/login");
  };
  return (
    <Hidden lgUp>
      <Drawer
        anchor="left"
        classes={{ paper: classes.mobileDrawer }}
        onClose={onMobileClose}
        open={openMobile}
        variant="temporary"
      >
        <div className="app-menu-mobile">
          {userInfo ? (
            <div className="user-info-account d-flex">
              <div className="avatar-user mx-2 d-inline-block mr-3">
                <Avatar
                  src={userInfo.avatarUrl}
                  style={{ width: 42, height: 42 }}
                />
              </div>
              <div className="user-account mx-2">
                <div className="name">{`${userInfo.lastName} ${userInfo.firstName}`}</div>
                <div className="role">{getRoles(userInfo.roles)?.name}</div>
              </div>
            </div>
          ) : (
            <div className="app-logo text-center">
              <Logo />
            </div>
          )}

          <Divider />
          <List>
            {navbarData.map(({ href, name, Icon }, index) => (
              <ListItem
                className={classes.item}
                disableGutters
                key={`${index}-${name}`}
              >
                <Button
                  activeClassName={"navbar-active"}
                  className={classes.button}
                  component={NavLink}
                  to={href}
                >
                  {Icon}
                  <span className={classes.title}>{name}</span>
                </Button>
              </ListItem>
            ))}
          </List>
          <Divider />
          {userInfo ? (
            <div className="user-list-item">
              <List>
                {userNabar.map(({ href, name, Icon }, index) => (
                  <ListItem
                    className={classes.item}
                    disableGutters
                    key={`${index}-${name}`}
                  >
                    <Button
                      activeClassName={"navbar-active"}
                      className={classes.button}
                      component={NavLink}
                      to={href}
                    >
                      {Icon}
                      <span className={classes.title}>{name}</span>
                    </Button>
                  </ListItem>
                ))}
              </List>
              <Divider />
              <div className="auth-option">
                <List>
                  <ListItem className={classes.item} disableGutters>
                    <Button
                      activeClassName={"navbar-active"}
                      className={classes.button}
                      component={NavLink}
                      to={"auth/change-password"}
                    >
                      <Home className={classes.icon} />
                      <span className={classes.title}>Đổi mật khẩu</span>
                    </Button>
                  </ListItem>
                  <ListItem className={classes.item} disableGutters>
                    <Button className={classes.button} onClick={logout}>
                      <Home className={classes.icon} />
                      <span className={classes.title}>Đăng xuất</span>
                    </Button>
                  </ListItem>
                </List>
              </div>
            </div>
          ) : (
            <div className="auth-list-item">
              <List>
                {authNabvar.map(({ href, name, Icon }, index) => (
                  <ListItem
                    className={classes.item}
                    disableGutters
                    key={`${index}-${name}`}
                  >
                    <Button
                      activeClassName={"navbar-active"}
                      className={classes.button}
                      component={NavLink}
                      to={href}
                    >
                      {Icon}
                      <span className={classes.title}>{name}</span>
                    </Button>
                  </ListItem>
                ))}
              </List>
            </div>
          )}
          <Divider />
        </div>
      </Drawer>
    </Hidden>
  );
};

export default AppSideBar;
const useStyles: any = makeStyles((theme: Theme) => ({
  mobileDrawer: {
    width: 256,
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
  icon: {
    marginRight: theme.spacing(1),
  },
  button: {
    color: theme.palette.text.secondary,
    fontWeight: theme.typography.fontWeightMedium,
    justifyContent: "flex-start",
    letterSpacing: 0,
    padding: "10px 8px",
    textTransform: "none",
    width: "100%",
  },
  item: {
    display: "flex",
    paddingTop: 0,
    paddingBottom: 0,
    borderRadius: 0,
  },
}));
