import { Avatar } from "@material-ui/core";
import React from "react";
import "./style.scss";
import { Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { UserFunction } from "redux/user/action";
import { history } from "services/history";
import { User } from "models/user/userInfo";
import { getRoles } from "settings/user/role";
interface Props {
  user: User;
}
const UserBadge: React.FC<Props> = ({ user }) => {
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
            <Avatar style={{ width: 30, height: 30 }} src={user.avatarUrl} />
            <span>{user.firstName}</span>
          </div>
        </Dropdown.Toggle>

        <Dropdown.Menu align="right">
          <div className="user-menu-item">
            <div className="info-name">{`${user.lastName} ${user.firstName}`}</div>
            <div className="info-role">{getRoles(user.roles)?.name}</div>
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
              to="/profile/history"
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
            <Dropdown.Item
              className="item-option"
              as={NavLink}
              to="/auth/change-password"
            >
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
