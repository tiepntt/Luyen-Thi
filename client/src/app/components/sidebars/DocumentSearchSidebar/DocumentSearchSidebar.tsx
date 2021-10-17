import { Similar } from "app/components/_share/Similer/Similer";
import { useGrades } from "hooks/Grade-Subject/useGrades";
import { useSubjects } from "hooks/Grade-Subject/useSubjects";
import { Image } from "react-bootstrap";
import "./style.scss";
interface Props {}

export const DocumentSearchSidebar = (props: Props) => {
  const { grades } = useGrades();
  const { subjects } = useSubjects();
  return (
    <div className="document-side-bar">
      <div className="img-side-bar ">
        <Image src={"/assets/images/logo.gif"} />
      </div>
      <div className="item">
        <Similar list={grades} title="Tài liệu theo lớp" onClick={(e) => {}} />
      </div>
      <div className="item">
        <Similar
          list={subjects}
          title="Tài liệu theo môn học"
          onClick={(e) => {}}
        />
      </div>
    </div>
  );
};
