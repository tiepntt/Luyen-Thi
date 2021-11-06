import React from "react";
import GradeNavbar from "app/components/_share/Menu/GradeNavbar";
import { useSubjects } from "hooks/Grade-Subject/useSubjects";
import { Col, Row } from "react-bootstrap";
import { useHistory, useLocation, useParams } from "react-router-dom";
import SubjectItem from "../../Document/GradeDocument/SubjectItem";

const ListSubjectMatrix = () => {
  const { grade } = useParams<any>();
  const { subjects } = useSubjects(grade);
  const history = useHistory();
  const location = useLocation();
  const onSelectSubject = (code: string) => {
    history.push(`${location.pathname}/${code}`);
  };

  return (
    <div className="grade-matrix">
      <GradeNavbar parentPath="/admin/matrix" />
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

export default ListSubjectMatrix;
