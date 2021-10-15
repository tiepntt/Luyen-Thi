import { Avatar } from "@material-ui/core";
import React from "react";
import "./style.scss";
import { Dropdown } from "react-bootstrap";
import "./style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { UserFunction } from "redux/user/action";
import { history } from "services/history";
const UserBadge = () => {
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(UserFunction.logout());
    history.push("/auth/login");
  };
  return (
    <div className="user-badge d-inline-block">
      <Dropdown>
        <Dropdown.Toggle id="dropdown-user" className="d-flex">
          <div className="info-user d-flex">
            <Avatar style={{ width: 30, height: 30 }} />
            <span>Tiệp</span>
          </div>
        </Dropdown.Toggle>

        <Dropdown.Menu align="right">
          <div className="user-menu-item">
            <div className="info-name">Nguyễn Thái Tiệp</div>
            <div className="info-role">Quản trị</div>
          </div>
          <div className="options">
            <Dropdown.Item
              className="item-option"
              as={NavLink}
              to="/profile/info"
            >
              <FontAwesomeIcon icon={faUserCircle} className="icon" />
              <span className="label-item">Thông tin tài khoản</span>
            </Dropdown.Item>
            <Dropdown.Item
              className="item-option"
              as={NavLink}
              to="/profile/result"
            >
              <FontAwesomeIcon icon={faUserCircle} className="icon" />
              <span className="label-item">Kết quả học tập</span>
            </Dropdown.Item>
            <Dropdown.Item
              className="item-option"
              as={NavLink}
              to="/profile/document"
            >
              <FontAwesomeIcon icon={faUserCircle} className="icon" />
              <span className="label-item">Tài liệu đã làm</span>
            </Dropdown.Item>
            <Dropdown.Item className="item-option" as={NavLink} to="/admin">
              <FontAwesomeIcon icon={faUserCircle} className="icon" />
              <span className="label-item">Quản lý hệ thống</span>
            </Dropdown.Item>
          </div>
          <div>
            <Dropdown.Item className="item-option">
              <span className="label-item">Đổi mật khẩu</span>
            </Dropdown.Item>
            <Dropdown.Item className="item-option" onClick={logout}>
              <span className="label-item">Thoát</span>
            </Dropdown.Item>
          </div>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default UserBadge;
