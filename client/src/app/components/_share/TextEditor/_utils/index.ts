import { Editor, Transforms } from "slate";
import { ReactEditor } from "slate-react";

export function getActiveStyles(editor: any) {
  return new Set(Object.keys(Editor.marks(editor) ?? {}));
}

export function toggleStyle(editor: any, style: any) {
  if (isMarkActive(editor, style)) {
    Editor.removeMark(editor, style);
  } else {
    Editor.addMark(editor, style, true);
  }
}
export function toggleBlockType(editor: any, value: string) {
  const changeTo = value;
  Transforms.setNodes(
    editor,
    { align: changeTo } as any,
    // Node filtering options supported here too. We use the same
    // we used with Editor.nodes above.
    {
      at: editor.selection,
      match: (n: any) => Editor.isBlock(editor, n),
    } as any
  );
}
export const isMarkActive = (editor: ReactEditor, format: string) => {
  const marks = Editor.marks(editor);
  return marks ? (marks as any)[format] === true : false;
};
export enum AlignType {
  LEFT = "left",
  RIGHT = "right",
  CENTER = "center",
  JUSTIFY = "jusify",
}
