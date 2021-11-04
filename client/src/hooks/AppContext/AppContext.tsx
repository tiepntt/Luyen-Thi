import { Grade } from "models/matrix/Grade";
import { Subject } from "models/matrix/Subject";
import React, { useContext } from "react";
export interface AppModels {
  showHeader: boolean;
  showFooter: boolean;
  setShowHeader: (value: boolean) => void;
  setShowFooter: (value: boolean) => void;
  scrollTop: () => void;
  grades: Grade[];
  subjects: Subject[];
  timeZone?: string;
}
export const AppContext = React.createContext<AppModels>({} as AppModels);
export const useAppContext = () => useContext(AppContext);
