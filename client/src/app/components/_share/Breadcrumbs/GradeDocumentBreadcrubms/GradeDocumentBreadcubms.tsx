import React from "react";
import "./style.scss";
interface Props {
  params?: Param[];
}
const GradeDocumentBreadcubms: React.FC<Props> = ({ params }) => {
  return <div className="grade-document-breadcrubms"></div>;
};

export default GradeDocumentBreadcubms;
interface Param {
  title: string;
  href: string;
}
