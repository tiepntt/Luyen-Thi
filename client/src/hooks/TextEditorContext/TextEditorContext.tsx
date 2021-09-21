import React, { useContext } from "react";
export interface TextEditModels {
  selection: any | null;
  setSelection?: (value: any) => void | null;
  setDocument: (document: any) => void;
  document: any;
}
export const TextEditorContext = React.createContext<TextEditModels>(
  {} as TextEditModels
);
export const useEditorContext = () => useContext(TextEditorContext);
