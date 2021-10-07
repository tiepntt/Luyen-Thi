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
  const currentBlockType = getTextBlockStyle(editor);
  const changeTo = currentBlockType === value ? "left" : value;

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
  try {
    const marks = Editor.marks(editor);
    return marks ? (marks as any)[format] === true : false;
  } catch {
    return false;
  }
};
export enum AlignType {
  LEFT = "left",
  RIGHT = "right",
  CENTER = "center",
  JUSTIFY = "jusify",
}
export function getTextBlockStyle(editor: any) {
  const selection = editor.selection;
  if (selection == null) {
    return null;
  }
  const topLevelBlockNodesInSelection = Editor.nodes(editor, {
    at: editor.selection,
    mode: "highest",
    match: (n) => Editor.isBlock(editor, n),
  });

  let blockType = null;
  let nodeEntry = topLevelBlockNodesInSelection.next();
  while (!nodeEntry.done) {
    const [node] = nodeEntry.value;
    if (blockType == null) {
      blockType = (node as any).align;
    } else if (blockType !== (node as any).align) {
      return "multiple";
    }

    nodeEntry = topLevelBlockNodesInSelection.next();
  }

  return blockType;
}
