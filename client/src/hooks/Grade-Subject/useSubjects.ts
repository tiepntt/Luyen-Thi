import { useAppContext } from "hooks/AppContext/AppContext";

export const useSubjects = () => {
  const { subjects } = useAppContext();
  return { subjects };
};
