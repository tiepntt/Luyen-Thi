import GradeNavbar from "app/components/_share/Menu/GradeNavbar";
import { useSubjects } from "hooks/Grade-Subject/useSubjects";
import React from "react";
import { Col, Row } from "react-bootstrap";
import { useLocation, useParams } from "react-router";
import { history } from "services/history";
import SubjectItem from "../../Document/GradeDocument/SubjectItem";

const TemplateGrade: React.FC = () => {
  const location = useLocation();
  const { gradeId } = useParams<any>();
  const { subjects } = useSubjects(gradeId);
  const onSelectSubject = (code: string) => {
    history.push(`${location.pathname}/${code}`);
  };
  return (
    <div className="grade-matrix">
      <GradeNavbar parentPath="/admin/template" />
      {/* list Subject */}

      <div className="main-content-document">
        <Row>
          <Col lg={12} md={12}>
            {/* <BoxApp>
          <div className="side-bar-grade"></div>
        </BoxApp> */}
          </Col>
          <Col lg={12} md={12}>
            <div className="list-subject">
              {subjects.map((subject, i) => (
                <SubjectItem
                  key={i}
                  subject={subject}
                  onClick={() => onSelectSubject(subject.code)}
                />
              ))}
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default TemplateGrade;
