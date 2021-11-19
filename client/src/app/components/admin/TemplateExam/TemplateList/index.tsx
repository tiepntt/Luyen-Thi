import EditTemplateDocument from "app/components/template-documents/EditTemplateDocument";
import GradeDocumentBreadcubms from "app/components/_share/Breadcrumbs/GradeDocumentBreadcrubms";
import SpinnerLayout from "app/components/_share/Layouts/SpinnerLayout";
import { useGrades } from "hooks/Grade-Subject/useGrades";
import { useSubjects } from "hooks/Grade-Subject/useSubjects";
import { TemplateDocument } from "models/template-document/template-document";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useParams } from "react-router";
import { templateApi } from "services/api/document/templateApi";
import { Status } from "settings/_share/httpCode";

const TemplateList = () => {
  const { gradeId, subjectId } = useParams<any>();
  const { grades } = useGrades(subjectId);
  const { subjects } = useSubjects(gradeId);
  const subject = subjects.find((s) => s.code === subjectId);
  const grade = grades.find((s) => s.code === gradeId);

  const [template, setTemplate] = useState<TemplateDocument>();
  const params = [
    {
      title: "Mẫu đề thi",
      href: "/admin/template",
    },
    {
      title: grade?.name || "",
      href: `/admin/template/${grade?.code}`,
    },
    {
      title: subject?.name || "",
      href: ``,
    },
  ];
  useEffect(() => {
    if (grade && subject) {
      templateApi.getTemplate(grade?.id, subject?.id).then((res) => {
        if (res.status === Status.Ok) {
          setTemplate(res.data);
        }
      });
    }
  }, [grade, subject]);
  return (
    <div className="w-100">
      <GradeDocumentBreadcubms params={params} />
      <SpinnerLayout loading={template}>
        <div className="list-template mt-2">
          <Row className="mx-0">
            <Col lg={9}>
              <EditTemplateDocument
                questionSets={template?.templateQuestionSets || []}
                templateId={template?.id || ""}
              />
            </Col>
            <Col lg={3}>Chỉnh sửa</Col>
          </Row>
        </div>
      </SpinnerLayout>
    </div>
  );
};

export default TemplateList;
