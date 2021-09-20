import React, { useEffect, useState } from "react";
import Editor from "./Editor/Editor";
import "./style.scss";

const TextEditor = () => {
  const [document, setDocument] = useState(ExampleDocument);
  useEffect(() => {
    console.log(document);
  }, [document]);
  return (
    <>
      <div className="text-editor">
        <div className="main-editor">
          <Editor document={document} onChange={setDocument} />
        </div>
      </div>
      <div className="modal"></div>
    </>
  );
};

export default TextEditor;
const ExampleDocument = [
  {
    type: "paragraph",
    children: [
      {
        text: "Cho phương trình  ",
      },
      {
        type: "katex",
        content: "$x^2 + 2x + 4 = 0 \\dfrac{x^2 + 3x + 4}{y^2 + 8x + 10}$",
        children: [{ text: "abc" }],
      },
      {
        text: "\nChọn đạp án đúng",
        bold: true,
      },
    ],
  },
  {
    type: "paragraph",
    align: "center",
    children: [
      {
        text: "Cho hàng đẳng thức",
        italic: true,
      },
      {
        type: "image",
        url: "https://s.saokhuee.com/ktdg/tu-nhien-xa-hoi/lop1/bai-2-cau-1-3.png",
        children: [{ text: "" }],
      },
      {
        text: "Cho hàng đẳng thức",
        italic: true,
      },
    ],
  },
];
