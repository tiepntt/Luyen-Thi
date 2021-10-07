import { TextEditorContext } from "hooks/TextEditorContext/TextEditorContext";
import React, { useEffect, useMemo, useState } from "react";
import { createEditor } from "slate";
import { Editable, ReactEditor, Slate, withReact } from "slate-react";
import { withImages } from "../Elements/ImageElement/withImage";
import { withKatex } from "../Elements/KatexElement/WithKatex";
import { withParagraph } from "../Elements/ParagraphElement/withParagraph";
import { withTables } from "../Elements/TableElement/withTables";
import OptionEditor from "../Options/OptionEditor";
import { useEditorConfig } from "../_hook/TextEditorConfig";
import useSelection from "../_hook/useSelection";
import "./style.scss";
import { withHistory } from "./withHistory";
interface Props {
  document: any;
  onChange: (value: any) => void;
  placeholder?: string;
  showHeader?: boolean;
  preElement?: any;
}
const Editor: React.FC<Props> = ({
  document,
  onChange,
  placeholder,
  showHeader,
  preElement,
}) => {
  const editor = useMemo(
    () =>
      withTables(
        withParagraph(
          withImages(
            withKatex(withHistory(withReact(createEditor() as ReactEditor)))
          )
        )
      ),
    []
  );
  const [showHeaderStatic, setShowHeaderStatic] = useState(false);
  const [selection, setSelection] = useSelection(editor);

  const onChangeHandler = (document: any) => {
    onChange(document);
    (setSelection as any)(editor.selection);
  };
  useEffect(() => {
    if (!showHeader) {
      setShowHeaderStatic(false);
    }
  }, [showHeader]);

  const { renderElement, renderLeaf, onKeyDown } = useEditorConfig(editor);
  const valueProvier = {
    selection: selection,
    setSelection: setSelection as any,
    setDocument: onChange,
    document,
  };
  return (
    <TextEditorContext.Provider value={valueProvier}>
      <Slate editor={editor} value={document} onChange={onChangeHandler}>
        {showHeader && showHeaderStatic && (
          <OptionEditor selection={selection as any} editor={editor} />
        )}
        <div className="d-flex">
          {preElement || ""}
          <div className="slate-editor-custom d-block w-100 h-100">
            <Editable
              placeholder={placeholder || "Nhập nội dung"}
              renderElement={renderElement as any}
              renderLeaf={renderLeaf as any}
              onKeyDown={onKeyDown}
              spellCheck={false}
              onClick={() => setShowHeaderStatic(true)}
            />
          </div>
        </div>
      </Slate>
    </TextEditorContext.Provider>
  );
};

export default Editor;
