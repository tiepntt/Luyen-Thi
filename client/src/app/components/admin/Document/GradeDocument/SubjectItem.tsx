import { Subject } from "models/matrix/Subject";
import React from "react";
import "./style.scss";
interface Props {
  subject: Subject;
  onClick: () => void;
}
const SubjectItem: React.FC<Props> = ({ subject, onClick }) => {
  return (
    <div className="subject-item" onClick={onClick}>
      <span>{subject.name}</span>
    </div>
  );
};

export default SubjectItem;
