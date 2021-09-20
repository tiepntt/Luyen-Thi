import { ReactEditor } from "slate-react";
import isUrl from "is-url";
import { Transforms } from "slate";
import imageExtensions from "image-extensions";
export const withImages = (editor: ReactEditor) => {
  const { insertData, isVoid, isInline } = editor;

  editor.isVoid = (element: any) => {
    return element.type === "image" ? true : isVoid(element);
  };
  editor.isInline = (element: any) => {
    return element.type === "image" ? true : isInline(element);
  };

  editor.insertBreak = () => {
    const text = { text: "" };
    const image = { type: "paragraph", children: [text] };
    Transforms.insertNodes(editor, image);
  };
  editor.insertData = (data) => {
    const text = data.getData("text/plain");
    const { files } = data;

    if (files && files.length > 0) {
      for (const file of files) {
        const reader = new FileReader();
        const [mime] = file.type.split("/");

        if (mime === "image") {
          reader.addEventListener("load", () => {
            const url = reader.result;
            insertImage(editor, url as any);
          });

          reader.readAsDataURL(file);
        }
      }
    } else if (isImageUrl(text)) {
      insertImage(editor, text);
    } else {
      insertData(data);
    }
  };

  return editor;
};

export const insertImage = (editor: ReactEditor, url: string) => {
  const text = { text: "" };
  if (url === "") {
    return;
  }
  const image = { type: "image", url, children: [text] };
  Transforms.insertNodes(editor, image);
};

export const isImageUrl = (url: string) => {
  if (!url) return false;
  if (!isUrl(url)) return false;
  const ext = new URL(url).pathname.split(".").pop();
  return imageExtensions.includes(ext as any);
};
