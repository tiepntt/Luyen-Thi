import { useState } from "react";

export const useGrades = () => {
  const [grades, setGrades] = useState(gradeData);
  return { grades, setGrades };
};
// static data
const gradeData: Grade[] = [
  {
    name: "Lớp 10",
    code: "lop-10",
  },
  {
    name: "Lớp 11",
    code: "lop-11",
  },
  {
    name: "Lớp 12",
    code: "lop-12",
  },
  {
    name: "Thi THPT QG",
    code: "on-thi-thpt-quoc-gia",
  },
];
export interface Grade {
  name: string;
  code: string;
  id?: string;
}
