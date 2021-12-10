import TemplateEditor from "app/components/template-documents/Template-Editor";
import GradeDocumentBreadcubms from "app/components/_share/Breadcrumbs/GradeDocumentBreadcrubms";
import { useSubjects } from "hooks/Grade-Subject/useSubjects";
import React from "react";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { templateApi } from "services/api/document/templateApi";
import "./style.scss";
const TemplateDetail: React.FC = () => {
  const { subjectCode } = useParams<any>();
  const { subjects, setSubject } = useSubjects();
  const subject = subjects.find((i) => i.code === subjectCode);
  const params = [
    {
      title: "Mẫu đề thi",
      href: "/admin/template",
    },
    {
      title: "Mãu đề thi THPT Quốc gia môn " + subject?.name || "",
      href: `/admin/template/${subject?.code}`,
    },
  ];
  const createTemplate = () => {
    templateApi.createTemplate(subject?.id || "").then((res) => {
      if (res.status === 200) {
        setSubject({
          ...(subject as any),
          templateId: res.data.id,
        });
      }
    });
  };
  return (
    <div className="template-admin w-100">
      <GradeDocumentBreadcubms params={params} />
      {!subject?.templateId ? (
        <div className="add-template h-100 d-flex">
          <div className="add-btn">
            <Button onClick={createTemplate}>Tạo mẫu đề</Button>
          </div>
        </div>
      ) : (
        <TemplateEditor templateId={subject?.templateId || ""} />
      )}
    </div>
  );
};

export default TemplateDetail;
