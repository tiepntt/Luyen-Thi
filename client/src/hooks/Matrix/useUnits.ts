import { Unit } from "models/matrix/Unit";
import { useEffect, useState } from "react";
import { unitApi } from "services/api/matrix/unit";

export const useUnits = (chapterId: string) => {
  const [units, setUnits] = useState<Unit[]>([]);
  const getUnits = () => {
    unitApi.getAllByChapterId(chapterId).then((res) => {
      if (res.status === 200) {
        setUnits(res.data);
      }
    });
  };

  useEffect(() => {
    getUnits();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chapterId]);
  return { units };
};
