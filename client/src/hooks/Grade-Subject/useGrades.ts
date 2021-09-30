import { useState } from "react";

export const useGrades = () => {
  const [grades, setGrades] = useState(gradeData);
  return { grades, setGrades };
};
// static data
export const gradeData: Grade[] = [
  {
    id: "80486e93-144e-4969-afc5-cae30a87a1bf",
    name: "Lớp 10",
    code: "lop-10",
  },
  {
    id: "73a6f98e-8bcf-49db-b413-cf79ff3189bd",
    name: "Lớp 11",
    code: "lop-11",
  },
  {
    id: "7d9c9e86-89c5-49bf-bf35-99a97ca22f2a",
    name: "Lớp 12",
    code: "lop-12",
  },
  {
    id: "e377aa7a-4e79-4d3d-8fba-0219193b43f7",
    name: "Thi THPT QG",
    code: "on-thi-thpt-quoc-gia",
  },
];
export interface Grade {
  name: string;
  code: string;
  id?: string;
}
