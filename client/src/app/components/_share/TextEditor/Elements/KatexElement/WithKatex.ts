import { Transforms } from "slate";
import { ReactEditor } from "slate-react";

export const withKatex = (editor: ReactEditor) => {
  const { insertData, isVoid, isInline } = editor;
  editor.isInline = (element: any) => {
    return element.type === "katex" ? true : isInline(element);
  };
  editor.isVoid = (element: any) => {
    return element.type === "katex" ? true : isVoid(element);
  };
  editor.insertData = (data) => {
    const text = data.getData("text/plain");

    if (text) {
      insertKaText(editor, text);
    } else {
      insertData(data);
    }
  };

  return editor;
};
export const insertKaText = (editor: ReactEditor, content: string) => {
  const text = { text: "" };
  const katex = { type: "katex", content, children: [text] };
  Transforms.insertNodes(editor, katex);
};
export const insertKaTextAtIndex = (
  editor: ReactEditor,
  content: string,
  selection: any
) => {
  const text = { text: "" };
  const katex = { type: "katex", content, children: [text] };
  Transforms.insertNodes(editor, katex, { at: selection } as any);
};
