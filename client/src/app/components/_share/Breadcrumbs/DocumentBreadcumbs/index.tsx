import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { NavLink } from "react-router-dom";
import "./style.scss";
interface Props {
  params?: Param[];
  rootPath?: string;
  className?: string;
}
const DocumentBreadcumbs: React.FC<Props> = ({
  params,
  rootPath = "",
  className = "document-breadcrumbs",
}) => {
  return (
    <div className={`d-inline-flex ${className}`}>
      {params?.map(({ title, href }, i) => (
        <div
          className={`param-item ${i === params.length - 1 ? "last" : ""}`}
          key={i}
        >
          <NavLink to={`${rootPath}${href}`}>{title}</NavLink>
          {i < params.length - 1 && (
            <span className="mx-2">
              <FontAwesomeIcon icon={faChevronRight} />
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default DocumentBreadcumbs;
interface Param {
  title: string;
  href: string;
}
