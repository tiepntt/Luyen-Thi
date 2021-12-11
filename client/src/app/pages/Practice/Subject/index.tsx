import { Subject } from "models/matrix/Subject";
import React from "react";
import { Image } from "react-bootstrap";
import { Link, useRouteMatch } from "react-router-dom";
import "./style.scss";

const PracticeSubject = (props: Subject) => {
  const match = useRouteMatch();
  return (
    <Link to={`${match.url}/${props.code}`}>
      <Image
        className="practice_subject"
        src={props.avatarUrl}
        alt={props.name}
        fluid={true}
      />
    </Link>
  );
};

export default React.memo(PracticeSubject, (prev, next) => {
  if (prev.avatarUrl !== next.avatarUrl) return true;
  return false;
});
