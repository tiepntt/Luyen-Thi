import { useAppContext } from "hooks/AppContext";
import { LevelQuestion } from "models/matrix/Level";
import { useState } from "react";

export const useLevelQuestion = () => {
  const { levels } = useAppContext();
  const [currentLevel, setCurrentLevel] = useState<LevelQuestion>();
  return { levels, currentLevel, setCurrentLevel };
};
