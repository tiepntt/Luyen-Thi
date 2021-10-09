import { useState } from "react";

export const useLevelQuestion = () => {
  const [levels] = useState(levelsQuestion);
  return { levels };
};
const levelsQuestion = [
  {
    id: "85f2b183-d760-407e-b1cd-9abe0e54c122",
    name: "Nhận biết",
    code: "nhan-biet",
  },
  {
    id: "c072523a-3e53-4ea5-a493-1ad49c3d7d8b",
    name: "Thông hiểu",
    code: "thong-hieu",
  },
  {
    id: "e3ddb686-5c8a-416e-bbd6-d9ed20f2e609",
    name: "Vận dụng",
    code: "van-dung",
  },
  {
    id: "cb66d06b-7ce3-4c3e-a26d-7e39c993c50e",
    name: "Vận dụng cao",
    code: "van-dung-cao",
  },
];
