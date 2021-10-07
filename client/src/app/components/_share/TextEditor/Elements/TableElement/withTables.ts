import { Editor, Transforms } from "slate";
import { ReactEditor } from "slate-react";
import { Range, Point, Element as SlateElement } from "slate";
export const withTables = (editor: ReactEditor) => {
  const { deleteBackward, deleteForward } = editor;

  editor.deleteBackward = (unit: any) => {
    const { selection } = editor;

    if (selection && Range.isCollapsed(selection)) {
      const [cell] = Editor.nodes(editor, {
        match: (n) =>
          !Editor.isEditor(n) &&
          SlateElement.isElement(n) &&
          (n as any).type === "table_cell",
      });

      if (cell) {
        const [, cellPath] = cell;
        const start = Editor.start(editor, cellPath);

        if (Point.equals(selection.anchor, start)) {
          return;
        }
      }
    }

    deleteBackward(unit);
  };

  editor.deleteForward = (unit) => {
    const { selection } = editor;

    if (selection && Range.isCollapsed(selection)) {
      const [cell] = Editor.nodes(editor, {
        match: (n) =>
          !Editor.isEditor(n) &&
          SlateElement.isElement(n) &&
          (n as any).type === "table_cell",
      });

      if (cell) {
        const [, cellPath] = cell;
        const end = Editor.end(editor, cellPath);

        if (Point.equals(selection.anchor, end)) {
          return;
        }
      }
    }

    deleteForward(unit);
  };

  // editor.insertBreak = () => {
  //   const text = { text: "" };
  //   const { selection } = editor;
  //   const image = { type: "paragraph", children: [text] };
  //   Transforms.insertNodes(editor, image, { at: selection } as any);
  // };

  return editor;
};
export const insertTabletAtIndex = async (
  editor: ReactEditor,
  rows: number,
  columns: number,
  selection: any
) => {
  let rowData = [];
  for (let i = 0; i < rows; i++) {
    let cellData = [];
    for (let indexCel = 0; indexCel < columns; indexCel++) {
      cellData.push({
        type: "table_cell",
        children: [
          {
            type: "paragraph",
            children: [{ text: "" }],
          },
        ],
      });
    }
    rowData.push({
      type: "table_row",
      children: cellData,
    });
  }
  const table = [
    {
      type: "table",
      children: rowData,
    },
    {
      type: "paragraph",
      children: [{ text: "" }],
    },
  ];
  if (table) {
    await Transforms.insertNodes(editor, table, {
      at: selection,
    } as any);
  }
};
