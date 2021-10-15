import {
  Badge,
  Grow,
  hexToRgb,
  IconButton,
  makeStyles,
  Paper,
} from "@material-ui/core";
import React, { useState } from "react";
import Poppers from "@material-ui/core/Popper";
import NotificationsIcon from "@material-ui/icons/NotificationsOutlined";
import classNames from "classnames";
import "./style.scss";
const Notification = () => {
  const [openNotification, setOpenNotification] = React.useState(null);
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const handleClickNotification = (event: any) => {
    if (openNotification && (openNotification as any).contains(event.target)) {
      setOpenNotification(null);
    } else {
      setOpenNotification(event.currentTarget);
    }

    setIsOpen(!isOpen);
  };
  return (
    <IconButton color="inherit" onClick={handleClickNotification}>
      <Badge badgeContent={<span>1</span>} color="error" variant="standard">
        <NotificationsIcon />
      </Badge>
      <Poppers
        open={Boolean(openNotification)}
        anchorEl={openNotification}
        transition
        disablePortal
        className={
          classNames({ [classes.popperClose]: !openNotification }) +
          " " +
          classes.popperNav +
          "paper"
        }
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper className={classes.paper}>
              <div className="notification-li">
                <div className="notification-header">Thông báo</div>
                <div className="notification-list">
                  <div className="inner-scroll-example"></div>
                </div>
                <div className="footer-notification">
                  Đánh dấu đã đọc tất cả thông báo trên
                </div>
              </div>
            </Paper>
          </Grow>
        )}
      </Poppers>
    </IconButton>
  );
};

export default Notification;
const useStyles = makeStyles((theme: any) => ({
  root: {
    backgroundColor: "#009177",
  },
  title: {
    color: "#ffffff",
    fontSize: 20,
  },
  avatar: {
    width: 60,
    height: 60,
  },
  dropdown: {
    borderRadius: "3px",
    border: "0",
    boxShadow: "0 2px 5px 0 rgba(" + hexToRgb("#000000") + ", 0.26)",
    top: "100%",
    margin: "2px 0 0",
    fontSize: "14px",
    textAlign: "left",
    backgroundColor: "white",
    WebkitBackgroundClip: "padding-box",
    backgroundClip: "padding-box",
  },
  dropdownItem: {
    fontSize: "13px",
    padding: "10px 20px",
    margin: "0 5px",
    borderRadius: "2px",
    WebkitTransition: "all 150ms linear",
    MozTransition: "all 150ms linear",
    OTransition: "all 150ms linear",
    MsTransition: "all 150ms linear",
    transition: "all 150ms linear",
    display: "block",
    clear: "both",
    lineHeight: "1.42857143",
    whiteSpace: "nowrap",
    height: "unset",
    minHeight: "unset",
    zIndex: 1350,
    "&:hover": {
      backgroundColor: "primary",
      color: "white",
    },
  },
  popperClose: {
    pointerEvents: "none",
  },
  popperNav: {
    [theme.breakpoints.down("sm")]: {
      position: "static !important",
      left: "unset !important",
      top: "unset !important",
      transform: "none !important",
      willChange: "unset !important",
      "& > div": {
        boxShadow: "none !important",
        marginLeft: "0rem",
        marginRight: "0rem",
        transition: "none !important",
        marginTop: "0px !important",
        marginBottom: "0px !important",
        padding: "0px !important",
        backgroundColor: "transparent !important",
        "& ul li": {
          color: "#ffffff" + " !important",
          margin: "10px 15px 0!important",
          padding: "10px 15px !important",
          "&:hover": {
            backgroundColor: "hsla(0,0%,78%,.2)",
            boxShadow: "none",
          },
        },
      },
    },
  },
  paper: {
    width: 300,

    textAlign: "left",
    fontSize: "1.1rem",
  },
}));
