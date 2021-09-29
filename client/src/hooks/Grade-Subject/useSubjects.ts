import { useState } from "react";

export const useSubjects = () => {
  const [subjects, setSubjects] = useState(subjectData);
  return { subjects, setSubjects };
};
const subjectData: Subject[] = [
  {
    name: "Toán học",
    code: "toan-hoc",
  },
  {
    name: "Tiếng Anh",
    code: "tieng-anh",
  },
  {
    name: "Vật lý",
    code: "val-ly",
  },
  {
    name: "Hóa học",
    code: "hoa-hoc",
  },
  {
    name: "Sinh học",
    code: "sinh-hoc",
  },
  {
    name: "Lịch sử",
    code: "lich-su",
  },
  {
    name: "Địa lý",
    code: "dia-ly",
  },
  {
    name: "Giáo dục công dân",
    code: "giao-duc-cong-dan",
  },
];
export interface Subject {
  name: string;
  code: string;
  id?: string;
}
