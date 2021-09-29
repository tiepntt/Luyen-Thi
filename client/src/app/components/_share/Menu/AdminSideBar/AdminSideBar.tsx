import {
  Avatar,
  Typography,
  Divider,
  Hidden,
  Drawer,
  makeStyles,
  Theme,
  Box,
  Badge,
  List,
  withStyles,
  createStyles,
} from "@material-ui/core";
import { adminRoutes } from "app/pages/Admin/router";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import SideBarItem from "./SideBarItem";
interface Props {
  onMobileClose: () => void;
  openMobile: boolean;
}
const AdminSideBar: React.FC<Props> = ({ onMobileClose, openMobile }) => {
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
      <Box alignItems="center" display="flex" flexDirection="column" p={2}>
        {/* <Avatar className={classes.avatar} src={user?.avatar?.url} /> */}
        <Badge
          overlap="circular"
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          badgeContent={
            <>
              <input
                type="file"
                className={classes.input}
                id="icon-button-file"
              />
              <label htmlFor="icon-button-file">
                <SmallAvatar
                  alt="Remy Sharp"
                  src={process.env.PUBLIC_URL + "/assets/edit-avatar.png"}
                />
              </label>
            </>
          }
        >
          <Avatar className={classes.avatar} />
        </Badge>
        <Typography color="textPrimary" variant="h5">
          {"Nguyễn Thái Tiệp"}
        </Typography>
        <Typography color="textSecondary" variant="body2">
          {"Manager"}
        </Typography>
      </Box>
      <Divider />
      <Box p={2}>
        <List>
          {adminRoutes.map((item) => {
            return (
              <SideBarItem
                href={item.href}
                key={item.title}
                title={item.title}
                icon={item.icon}
              />
            );
          })}
        </List>
      </Box>
      <Box flexGrow={1} />
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

export default AdminSideBar;
const SmallAvatar = withStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 22,
      height: 22,
      border: `2px solid ${theme.palette.background.paper}`,
      cursor: "pointer",
    },
  })
)(Avatar);
const useStyles: any = makeStyles((theme: Theme) => ({
  mobileDrawer: {
    width: 256,
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: "calc(100% - 64px)",
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
