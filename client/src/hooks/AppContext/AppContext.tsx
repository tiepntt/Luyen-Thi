import React, { useContext } from "react";
export interface AppModels {
  showHeader: boolean;
  showFooter: boolean;
  setShowHeader: (value: boolean) => void;
  setShowFooter: (value: boolean) => void;
}
export const AppContext = React.createContext<AppModels>({} as AppModels);
export const useAppContext = () => useContext(AppContext);
