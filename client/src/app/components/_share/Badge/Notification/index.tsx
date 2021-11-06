import { Badge } from "@material-ui/core";
import React from "react";
import NotificationsIcon from "@material-ui/icons/NotificationsOutlined";
import "./style.scss";
import { Dropdown } from "react-bootstrap";
const Notification = () => {
  return (
    <div className="notification-badge  d-inline-block">
      <Dropdown>
        <Dropdown.Toggle id="dropdown-notification">
          <Badge badgeContent={<span>1</span>} color="error" variant="standard">
            <NotificationsIcon color="action" />
          </Badge>
        </Dropdown.Toggle>

        <Dropdown.Menu align="right">
          <div className="notification-li">
            <div className="notification-header">Thông báo</div>
            <div className="notification-list">
              <div className="inner-scroll-example"></div>
            </div>
            <div className="footer-notification">
              Đánh dấu đã đọc tất cả thông báo trên
            </div>
          </div>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default Notification;
