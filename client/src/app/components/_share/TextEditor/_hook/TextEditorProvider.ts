import React, { useContext } from "react";
export interface TextEditorModels {}
export const EditorContext = React.createContext<TextEditorModels>(
  {} as TextEditorModels
);
export const useTextEditorContent = () => useContext(EditorContext);
