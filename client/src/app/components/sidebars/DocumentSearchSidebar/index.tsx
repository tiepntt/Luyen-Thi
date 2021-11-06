import { Similar } from "app/components/_share/Similer";
import { useGrades } from "hooks/Grade-Subject/useGrades";
import { useSubjects } from "hooks/Grade-Subject/useSubjects";
import { Image } from "react-bootstrap";
import { history } from "services/history";

import qs from "query-string";
import "./style.scss";
interface Props {}

const DocumentSearchSidebar = (props: Props) => {
  const { grades } = useGrades();
  const { subjects } = useSubjects();
  return (
    <div className="document-side-bar">
      <div className="img-side-bar ">
        <Image src={"/assets/images/logo.gif"} />
      </div>
      <div className="item">
        <Similar
          list={grades}
          title="Tài liệu theo lớp"
          onClick={(id) => {
            history.push({
              pathname: "/document",
              search: qs.stringify({
                gradeCode: grades.find((i) => i.id === id)?.code,
              }),
            });
          }}
        />
      </div>
      <div className="item">
        <Similar
          list={subjects}
          title="Tài liệu theo môn học"
          onClick={(id) => {
            history.push({
              pathname: "/document",
              search: qs.stringify({
                subjectCode: subjects.find((i) => i.id === id)?.code,
              }),
            });
          }}
        />
      </div>
    </div>
  );
};
export default DocumentSearchSidebar;
