import { List } from "@material-ui/core";
import { useSubjects } from "hooks/Grade-Subject/useSubjects";
import React from "react";
import SideBarItem from "../AdminSideBar/SideBarItem";

const ProfileResultSidebar = () => {
  const { subjects } = useSubjects();
  return (
    <div>
      <List>
        <SideBarItem href={`/profile/result/overview`} title={"Tổng quan"} />
        {subjects.map((subject, i) => (
          <SideBarItem
            key={i}
            href={`/profile/result/${subject.code}`}
            title={subject.name}
          />
        ))}
      </List>
    </div>
  );
};

export default ProfileResultSidebar;
