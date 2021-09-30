import { useState } from "react";

export const useSubjects = () => {
  const [subjects, setSubjects] = useState(subjectData);
  return { subjects, setSubjects };
};
export const subjectData: Subject[] = [
  {
    id: "49795e43-199c-4d75-bc72-4d510af25dcb",
    name: "Toán học",
    code: "toan-hoc",
  },
  {
    id: "2e3a837f-efb0-4aae-9d8a-6c7ad75882db",
    name: "Tiếng Anh",
    code: "tieng-anh",
  },
  {
    id: "5497624c-b5ec-4288-afba-0c0a4abe18d2",
    name: "Vật lý",
    code: "val-ly",
  },
  {
    id: "72230517-0e81-4eb9-a29f-cf8b7b8902ad",
    name: "Hóa học",
    code: "hoa-hoc",
  },
  {
    id: "5a8cd25d-6905-4a9e-b968-d9878234fcb4",
    name: "Sinh học",
    code: "sinh-hoc",
  },
  {
    id: "18cdf684-f05e-4db2-a6da-f3d63856291c",
    name: "Lịch sử",
    code: "lich-su",
  },
  {
    id: "ce80af0d-1772-48b6-9a79-d894a560ba62",
    name: "Địa lý",
    code: "dia-ly",
  },
  {
    id: "370c25ae-5e13-4057-a76d-f2511a65143e",
    name: "Giáo dục công dân",
    code: "giao-duc-cong-dan",
  },
];
export interface Subject {
  name: string;
  code: string;
  id?: string;
}
