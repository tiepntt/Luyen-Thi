import React, { useState } from "react";
import Editor from "./Editor/Editor";
import "./style.scss";
interface Props {
  placeholder: string;
  showHeader?: boolean;
  preElement?: any;
  value: [];
}
const TextEditor: React.FC<Props> = (props) => {
  const { value } = props;
  const [document, setDocument] = useState(
    value.length === 0 ? ExampleDocument : value
  );
  return (
    <div className="text-editor">
      <div className="main-editor">
        <Editor document={document} onChange={setDocument} {...props} />
      </div>
    </div>
  );
};

export default TextEditor;
const ExampleDocument = [
  {
    type: "paragraph",
    children: [{ text: "" }],
  },
];
