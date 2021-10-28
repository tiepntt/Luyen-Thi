import React from "react";
import { Image } from "react-bootstrap";
import "./style.scss";
interface Props {
  image: any;
  number: string;
  title: string;
  color: string;
}

export const UserResultBugget = (props: Props) => {
  const { image, color, title, number } = props;
  return (
    <div className="user-reuslt-bugget" style={{ color: color }}>
      <div className="image-icon">
        <Image src={image} width={64} />
      </div>
      <div className="info d-inline-block w-100 text-center ">
        <div className="number">{number}</div>
        <div className="title mt-2">{title}</div>
      </div>
    </div>
  );
};
