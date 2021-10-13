import GradeNavbar from "app/components/_share/Menu/GradeNavbar/GradeNavbar";
import { useSubjects } from "hooks/Grade-Subject/useSubjects";
import React from "react";

import { Col, Row } from "react-bootstrap";
import { useHistory, useLocation } from "react-router";
import SubjectItem from "./SubjectItem";

const GradeDocument = () => {
  const { subjects } = useSubjects();
  const history = useHistory();
  const location = useLocation();
  const onSelectSubject = (code: string) => {
    history.push(`${location.pathname}/${code}`);
  };
  return (
    <div className="grade-document">
      <GradeNavbar parentPath="/admin/document" />
      {/* list Subject */}

      <div className="main-content-document">
        <Row>
          <Col lg={8} md={12}>
            <div className="list-subject">
              {subjects.map((subject, i) => (
                <SubjectItem
                  key={i}
                  subject={subject}
                  onClick={() => onSelectSubject(subject.code)}
                />
              ))}
              <div className="subject-item add-subject">
                <span>Thêm mới +</span>
              </div>
            </div>
          </Col>
          <Col lg={4} md={12}>
            {/* <BoxApp>
              <div className="side-bar-grade"></div>
            </BoxApp> */}
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default GradeDocument;
