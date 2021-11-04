import { Button, ListItem } from "@material-ui/core";
import { useGrades } from "hooks/Grade-Subject/useGrades";
import { Grade } from "models/matrix/Grade";
import React, { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./style.scss";
interface Props {
  parentPath: string;
}
const GradeNavbar: React.FC<Props> = ({ parentPath }) => {
  const { grades } = useGrades();
  const location = useLocation();
  useEffect(() => {}, [location.pathname]);
  const GradeItem = (grade: Grade) => (
    <ListItem
      disableGutters
      className={`grade-item ${
        location.pathname === `${parentPath}/${grade.code}` && "active"
      }`}
    >
      <Button
        activeClassName={"active"}
        className="grade-item-buton"
        component={NavLink}
        to={`${parentPath}/${grade.code}`}
      >
        <span>{grade.name}</span>
      </Button>
    </ListItem>
  );
  return (
    <div className="grade-nav-bar d-flex pr-3">
      <div className="list-grade d-flex flex-grow-1">
        {grades.map((grade, i) => (
          <GradeItem key={i} {...grade} />
        ))}
      </div>
    </div>
  );
};

export default GradeNavbar;
