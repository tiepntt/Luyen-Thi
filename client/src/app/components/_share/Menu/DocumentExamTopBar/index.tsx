import React from "react";
import { Container } from "react-bootstrap";
import Logo from "../../Logo/Logo";
import "./style.scss";
const DocumentExamTopbar = () => {
  return (
    <div className="document-exam-topbar">
      <Container className="h-100">
        <div className="topbar-content d-flex h-100">
          <div className="name-document" style={{ flexGrow: 1 }}>
            <h5>
              Đề thi thử THPT Quốc gia năm 2021 trường THPT Chu văn An - Thái
              Bình
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
