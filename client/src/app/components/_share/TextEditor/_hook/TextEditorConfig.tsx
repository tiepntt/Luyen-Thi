import isHotkey from "is-hotkey";
import React, { useCallback } from "react";
import { DefaultElement, ReactEditor } from "slate-react";
import HeadingElement from "../Elements/HeadingElement/HeadingElement";
import ImageElement from "../Elements/ImageElement/ImageElement";
import KatexElement from "../Elements/KatexElement/KatexElement";
import ParagraphElement from "../Elements/ParagraphElement/ParagraphElement";
import TableElement, {
  TableCell,
  TableRow,
} from "../Elements/TableElement/TableElement";
import { toggleBlockType, toggleStyle } from "../_utils";

export const useEditorConfig = (editor: ReactEditor) => {
  const onKeyDown = useCallback(
    (event) => KeyBindings.onKeyDown(editor, event),
    [editor]
  );

  return { renderElement, renderLeaf, onKeyDown };
};

const elements = {
  h1: HeadingElement,
  h2: HeadingElement,
  h3: HeadingElement,
  h4: HeadingElement,
  h5: HeadingElement,
  katex: KatexElement,
  paragraph: ParagraphElement,
  image: ImageElement,
  table: TableElement,
  table_cell: TableCell,
  table_row: TableRow,
};
enum ElementType {
  h1 = "h1",
  h2 = "h1",
  h3 = "h1",
  h4 = "h1",
  h5 = "h1",
  katex = "katex",
  paragraph = "paragraph",
  table = "table",
  table_cell = "table_cell",
  table_row = "table_row",
}
interface ElementProp {
  children: any;
  element: {
    type: ElementType;
  };
}
const renderElement: React.FC<ElementProp> = (props) => {
  const { element } = props;

  return (
    <>
      {elements[element.type] ? (
        React.createElement(elements[element.type] as any, { ...props })
      ) : (
        <DefaultElement {...(props as any)} />
      )}
    </>
  );
};
interface LeftProp {
  children: any;
  attributes: any;
  leaf: {
    bold: boolean;
    italic: boolean;
    code: boolean;
    underline: boolean;
    text: string;
  };
}
const renderLeaf: React.FC<LeftProp> = (props) => {
  try {
    const { leaf, children, attributes } = props;
    let el = <>{children}</>;
    if (leaf.bold) {
      el = <strong>{el}</strong>;
    }

    if (leaf.code) {
      el = <code>{el}</code>;
    }

    if (leaf.italic) {
      el = <em>{el}</em>;
    }

    if (leaf.underline) {
      el = <u>{el}</u>;
    }

    return <span {...attributes}>{el}</span>;
  } catch (e) {
    return <span></span>;
  }
};
const KeyBindings = {
  onKeyDown: (editor: any, event: any) => {
    if (isHotkey("mod+b", event)) {
      event.preventDefault();
      toggleStyle(editor, "bold");
      return;
    }
    if (isHotkey("mod+i", event)) {
      event.preventDefault();
      toggleStyle(editor, "italic");
      return;
    }
    if (isHotkey("mod+u", event)) {
      event.preventDefault();
      toggleStyle(editor, "underline");
      return;
    }
    // text align
    if (isHotkey("mod+e", event)) {
      event.preventDefault();
      toggleBlockType(editor, "center");
      return;
    }
    if (isHotkey("mod+l", event)) {
      event.preventDefault();
      toggleBlockType(editor, "left");
      return;
    }
    if (isHotkey("mod+r", event)) {
      event.preventDefault();
      toggleBlockType(editor, "right");
      return;
    }
    if (isHotkey("mod+j", event)) {
      event.preventDefault();
      toggleBlockType(editor, "justify");
      return;
    }
  },
};
