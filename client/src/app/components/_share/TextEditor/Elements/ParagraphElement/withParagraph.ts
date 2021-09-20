import { Transforms } from "slate";
import { ReactEditor } from "slate-react";

export const withParagraph = (editor: ReactEditor) => {
  const { insertData } = editor;
  editor.insertData = (data) => {
    const text = data.getData("text/plain");
    try {
      insertParagraph(editor, text);
    } catch {
      insertData(data);
    }
  };
  return editor;
};
const insertParagraph = (editor: ReactEditor, content: string) => {
  const text = { text: "" };
  const katex = { type: "paragraph", content, children: [text] };
  Transforms.insertNodes(editor, katex);
};
