import { useAccessRoles } from "hooks/User/accessRoles";
import { UserSearchQuery } from "models/user/userQuery";
import React from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import Select from "react-select";
import { Role, roleDefaults } from "settings/user/role";
import "./style.scss";
interface Props {
  onChangeCondition: (key: string, value: any) => void;
  filter?: UserSearchQuery;
  showAddModal?: (value: boolean) => void;
}
const UserSearchForm: React.FC<Props> = ({
  onChangeCondition,
  filter,
  showAddModal,
}) => {
  var accessAdmin = useAccessRoles(Role.Admin);

  return (
    <div className="user-search-form">
      <Form>
        <Row className="m-0">
          <Form.Group as={Col} lg={2}>
            <Button
              variant="outline-success"
              onClick={(e) => showAddModal && showAddModal(true)}
              disabled={accessAdmin}
            >
              Thêm mới
            </Button>
          </Form.Group>
          <Form.Group as={Col} lg={4}>
            <Form.Control
              placeholder="Từ khoá tìm kiếm"
              value={filter?.key}
              onChange={(e) => onChangeCondition("key", e.target.value)}
            />
          </Form.Group>
          <Form.Group as={Col} lg={3}>
            <Select
              className="no-border"
              placeholder="Chọn vai trò"
              options={roleDefaults}
              getOptionLabel={(e: any) => e.name}
              isClearable
              value={roleDefaults.find((i) => i.value === filter?.role)}
              onChange={(e) => onChangeCondition("role", e?.value)}
            />
          </Form.Group>
          <Form.Group as={Col} lg={3}>
            <Select className="no-border" />
          </Form.Group>
        </Row>
      </Form>
    </div>
  );
};

export default UserSearchForm;
