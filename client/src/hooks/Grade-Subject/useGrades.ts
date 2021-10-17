import { useAppContext } from "hooks/AppContext/AppContext";

export const useGrades = () => {
  const { grades } = useAppContext();
  return { grades };
};
// static data
