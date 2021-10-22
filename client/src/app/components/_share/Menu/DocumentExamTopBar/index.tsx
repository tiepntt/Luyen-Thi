import { DocumentExam } from "models/document/Document";
import React from "react";
import { Container } from "react-bootstrap";
import Logo from "../../Logo/Logo";
import "./style.scss";
interface Props{
  document ?:DocumentExam
}
const DocumentExamTopbar:React.FC<Props> = ({document}) => {
  return (
    <div className="document-exam-topbar">
      <Container className="h-100">
        <div className="topbar-content d-flex h-100">
          <div className="name-document" style={{ flexGrow: 1 }}>
            <h5>
              {document?.name||""}
            </h5>
          </div>
          <div className="logo">
            <Logo />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default DocumentExamTopbar;
