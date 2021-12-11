import { Container } from "react-bootstrap";
import React from "react";
import "./style.scss"

export type PracticeBannerProps = {
  title: string;
  subtitle: string;
};

const PracticeBanner = ({ title, subtitle }: PracticeBannerProps) => {
  return (
    <Container id="practice_banner" fluid={true} style={{backgroundColor: "#041E7C"}}>
      <h1 className="text-center practice_title">
      {title}
      </h1>
      <h6 className="text-center practice_subtitle">{subtitle}</h6>
    </Container>
  );
};

export default React.memo(PracticeBanner, (prevProps, nextProps) => {
  if (
    prevProps.title !== nextProps.title ||
    prevProps.subtitle !== nextProps.subtitle
  )
    return true;
  return false;
});
