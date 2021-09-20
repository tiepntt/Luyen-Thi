import React, { useMemo } from "react";
import { createEditor } from "slate";
import { withHistory } from "slate-history";
import { Editable, ReactEditor, Slate, withReact } from "slate-react";
import { withImages } from "../Elements/ImageElement/withImage";
import { withKatex } from "../Elements/KatexElement/WithKatex";
import { withParagraph } from "../Elements/ParagraphElement/withParagraph";
import OptionEditor from "../Options/OptionEditor";
import { useEditorConfig } from "../_hook/TextEditorConfig";
import useSelection from "../_hook/useSelection";
interface Props {
  document: any;
  onChange: (value: any) => void;
}
const Editor: React.FC<Props> = ({ document, onChange }) => {
  const editor = useMemo(
    () =>
      withParagraph(
        withImages(
          withKatex(withHistory(withReact(createEditor() as ReactEditor)))
        )
      ),
    []
  );
  const [selection, setSelection] = useSelection(editor);

  const onChangeHandler = (document: any) => {
    onChange(document);
    (setSelection as any)(editor.selection);
  };

  const { renderElement, renderLeaf, onKeyDown } = useEditorConfig(editor);
  return (
    <Slate editor={editor} value={document} onChange={onChangeHandler}>
      <OptionEditor selection={selection as any} editor={editor} />
      <Editable
        renderElement={renderElement as any}
        renderLeaf={renderLeaf as any}
        onKeyDown={onKeyDown}
        spellCheck={false}
      />
    </Slate>
  );
};

export default Editor;
