import UserSearchForm from "app/components/_share/Form/UserSearchFrom";
import { AppPagination } from "app/components/_share/Pagination/Pagination";
import UserTable from "app/components/_share/Table/UserTable";
import { UserInfo } from "models/user/userInfo";
import React, { useEffect, useState } from "react";
import { userApi } from "services/api/user/user";
import { history } from "services/history";
import { NumberParam, StringParam, useQueryParams } from "use-query-params";
import qs from "query-string";
import "./style.scss";
import { toastService } from "services/toast";
import AddUserModalAccount from "app/components/_share/Modals/AddUserAccountModal";
const User: React.FC = () => {
  const [users, setUsers] = useState<UserInfo[]>([]);
  const [showModalAddUser, setShowModalAddUser] = useState(false);
  const [count, setCount] = React.useState(10);
  const take = 15;
  const [filter] = useQueryParams({
    key: StringParam,
    page: NumberParam,
    role: StringParam,
  });
  const onChangeCondition = (key: string, value: any) => {
    const newFilter = {
      ...filter,
      [key]: value,
      page: 1,
    };

    history.push({
      pathname: "/admin/users",
      search: qs.stringify(newFilter),
    });
  };
  const getUsers = () => {
    userApi
      .getUser({
        ...filter,
        take: take,
        skip: ((filter.page || 1) - 1) * take,
      } as any)
      .then((res) => {
        if (res.status === 200) {
          setUsers(res.data.items);
          setCount(res.data.total);
        } else {
          toastService.error(res.data.message);
        }
      });
  };
  useEffect(() => {
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);
  const onChangePage = (page: number) => {
    const newFilter = {
      ...filter,
      page,
    };
    history.push({
      pathname: "/admin/users",
      search: qs.stringify(newFilter),
    });
  };
  const onAddUser = (user: UserInfo) => {
    setUsers([user, ...users]);
  };
  return (
    <div className="user-admin">
      <UserSearchForm
        filter={filter as any}
        onChangeCondition={onChangeCondition}
        showAddModal={setShowModalAddUser}
      />
      <div className="user-list px-2 mt-3">
        <UserTable users={users} setUsers={setUsers} />
        <AppPagination
          pageActive={filter.page || 1}
          lastPage={Math.ceil(count / take)}
          onPageChange={onChangePage}
        />
      </div>
      <AddUserModalAccount
        show={showModalAddUser}
        setShow={setShowModalAddUser}
        onAddUser={onAddUser}
      />
    </div>
  );
};

export default User;
