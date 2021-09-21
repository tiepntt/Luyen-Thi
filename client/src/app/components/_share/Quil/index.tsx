import React, { useEffect, useState } from "react";
import "./styles.scss";
import EquationEditor from "equation-editor-react";
interface Props {
  defaultValue: string;
  onChange?: (value: string) => void;
  onEnter?: () => void;
}
const InputMathQuil: React.FC<Props> = ({
  defaultValue,
  onChange,
  onEnter,
}) => {
  const [equation, setEquation] = useState(defaultValue || "");
  useEffect(() => {
    onChange && onChange(equation);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [equation]);
  return (
    <EquationEditor
      value={equation}
      onChange={setEquation}
      onEnter={onEnter}
      autoCommands="pi theta sqrt sum prod alpha beta gamma rho"
      autoOperatorNames="sin cos tan"
    />
  );
};

export default InputMathQuil;
