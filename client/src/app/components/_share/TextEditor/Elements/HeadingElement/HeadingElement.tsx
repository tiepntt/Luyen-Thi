import React from "react";
interface Props {
  element: {
    type: string;
  };
  attributes: any;
  children: any;
}
const HeadingElement: React.FC<Props> = ({ element, attributes, children }) => {
  switch (element.type) {
    case "h1":
      return <h1 {...attributes} children={children} />;
    case "h2":
      return <h2 {...attributes} children={children} />;
    case "h3":
      return <h3 {...attributes} children={children} />;
    case "h4":
      return <h4 {...attributes} children={children} />;
    default:
      return <span {...attributes} children={children} />;
  }
};

export default HeadingElement;
