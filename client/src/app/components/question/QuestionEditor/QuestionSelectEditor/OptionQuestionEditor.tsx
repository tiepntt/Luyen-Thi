import Box from "app/components/_share/Box/Box";
import TextEditor from "app/components/_share/TextEditor";
import React from "react";
interface Props {
  value: any;
  className?: string;
  placeHolder?: string;
  onChange?: (value: string) => void;
  onClick?: () => void;
  focus?: boolean;
  preElement?: any;
}
const OptionQuestionEditor: React.FC<Props> = (props) => {
  const {
    className = "",
    placeHolder = "",
    focus,
    onClick,
    preElement,
    value,
  } = props;
  const showHeader = () => onClick && onClick();
  return (
    <Box>
      <div className={className || ""} onClick={showHeader}>
        <TextEditor
          value={value}
          placeholder={placeHolder}
          showHeader={focus}
          preElement={preElement}
        />
      </div>
    </Box>
  );
};

export default OptionQuestionEditor;
