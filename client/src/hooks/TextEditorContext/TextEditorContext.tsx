import React, { useContext } from "react";
export interface TextEditModels {
  setModalActive: () => void;
}
export const AppContext = React.createContext<TextEditModels>(
  {} as TextEditModels
);
export const useAppContext = () => useContext(AppContext);
