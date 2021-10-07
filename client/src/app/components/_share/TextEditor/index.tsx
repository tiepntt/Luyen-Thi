import React from "react";
import Editor from "./Editor/Editor";
import "./style.scss";
interface Props {
  placeholder: string;
  showHeader?: boolean;
  preElement?: any;
  document?: any;
  setDocument: (value: any) => void;
}
const TextEditor: React.FC<Props> = (props) => {
  const { document, setDocument } = props;
  // const [document, setDocument] = useState(initDefaultValue([]));
  return (
    <div className="text-editor">
      <div className="main-editor">
        <Editor document={document} onChange={setDocument} {...props} />
      </div>
    </div>
  );
};

export default TextEditor;
