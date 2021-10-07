import {
  faAlignCenter,
  faAlignJustify,
  faAlignLeft,
  faAlignRight,
  faBold,
  faItalic,
  faUnderline,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useSlate } from "slate-react";

import { isMarkActive, toggleBlockType, toggleStyle } from "../_utils";
import ImageButton from "./ImportOptions/ImageButton";
import KatexButton from "./ImportOptions/KatexButton";
import TableButton from "./ImportOptions/TableButton";
import "./style.scss";

const CHARACTER_STYLES = [
  {
    value: "bold",
    icon: <FontAwesomeIcon icon={faBold} size="sm" />,
  },
  { value: "italic", icon: <FontAwesomeIcon icon={faItalic} size="sm" /> },
  {
    value: "underline",
    icon: <FontAwesomeIcon icon={faUnderline} size="sm" />,
  },
];
const Block_STYLES = [
  {
    value: "left",
    type: "align",
    icon: <FontAwesomeIcon icon={faAlignLeft} />,
  },
  {
    value: "right",
    type: "align",
    icon: <FontAwesomeIcon icon={faAlignRight} />,
  },
  {
    value: "center",
    type: "align",
    icon: <FontAwesomeIcon icon={faAlignCenter} />,
  },
  {
    value: "justify",
    type: "align",
    icon: <FontAwesomeIcon icon={faAlignJustify} />,
  },
];
interface Props {
  selection: any;
  editor: any;
}
const OptionEditor: React.FC<Props> = ({ selection }) => {
  const editor = useSlate();
  return (
    <div className="option-editor">
      <div className="tool-bar">
        {/* Buttons for character styles */}
        {CHARACTER_STYLES.map(({ value, icon }, i) => (
          <ToolBarButton
            key={i}
            icon={icon}
            isActive={isMarkActive(editor as any, value)}
            onMouseDown={(e: any) => {
              e.preventDefault();
              toggleStyle(editor, value);
            }}
          />
        ))}
        <ImageButton />
        <KatexButton />
        <TableButton />
        {Block_STYLES.map(({ value, icon }) => (
          <ToolBarButton
            key={value}
            icon={icon}
            isActive={isMarkActive(editor as any, value)}
            onMouseDown={(e: any) => {
              e.preventDefault();
              toggleBlockType(editor, value);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default OptionEditor;
const ToolBarButton = (props: any) => {
  const { icon, isActive, onMouseDown } = props;
  return (
    <div
      className={`button-option-editor ${isActive && "active"}`}
      onMouseDown={onMouseDown}
    >
      {icon}
    </div>
  );
};
