import React from "react";
import "katex/dist/katex.css";
import "./style.scss";
import Latex from "react-latex-next";

interface Props {
  element: { content: string };
}

const TemplateKatex: React.FC<Props> = ({ element }) => {
  return (
    <span className="latex">
      <Latex
        delimiters={[
          { left: "$$", right: "$$", display: true },
          { left: "\\(", right: "\\)", display: false },
          { left: "$", right: "$", display: false },
          { left: "\\[", right: "\\]", display: true },
        ]}
      >
        {element.content}
      </Latex>
    </span>
  );
};

export default TemplateKatex;
