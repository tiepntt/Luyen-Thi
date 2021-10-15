import { Similar } from "app/components/_share/Similer/Similer";
import { Image } from "react-bootstrap";
import "./style.scss";
interface Props {}

export const DocumentSearchSidebar = (props: Props) => {
  return (
    <div className="document-side-bar">
      <div className="img-side-bar ">
        <Image src={"/assets/images/logo.gif"} />
      </div>
      <div className="item">
        <Similar
          list={gradeCounts}
          title="Tài liệu theo lớp"
          onClick={(e) => {}}
        />
      </div>
      <div className="item">
        <Similar
          list={subjectCounts}
          title="Tài liệu theo môn học"
          onClick={(e) => {}}
        />
      </div>
    </div>
  );
};
export const gradeCounts = [
  {
    name: "Lớp 10",
    count: 10,
    id: "12142",
  },
  {
    name: "Lớp 11",
    count: 10,
    id: "12142",
  },
  {
    name: "Lớp 12",
    count: 10,
    id: "12142",
  },
  {
    name: "Ôn thi THPT Quốc Gia",
    count: 10,
    id: "12142",
  },
];
export const subjectCounts = [
  {
    name: "Toán học",
    count: 10,
    id: "12142",
  },
  {
    name: "Tiếng anh",
    count: 10,
    id: "12142",
  },
  {
    name: "Vật lý",
    count: 10,
    id: "12142",
  },
  {
    name: "Hóa học",
    count: 10,
    id: "12142",
  },
  {
    name: "Toán học",
    count: 10,
    id: "12142",
  },
  {
    name: "Tiếng anh",
    count: 10,
    id: "12142",
  },
  {
    name: "Vật lý",
    count: 10,
    id: "12142",
  },
  {
    name: "Hóa học",
    count: 10,
    id: "12142",
  },
];
