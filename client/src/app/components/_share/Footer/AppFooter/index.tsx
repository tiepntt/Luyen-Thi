import { faEnvelope, faPhoneAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Facebook, GitHub, YouTube } from "@material-ui/icons";
import { history } from "services/history";
import qs from "query-string";
import React from "react";
import { makeStyles, Theme } from "@material-ui/core";
import { Col, Container, Row } from "react-bootstrap";
import "./style.scss";
const AppFooter = () => {
  const classes = useStyles();
  const navigateGrade = (gradeCode: string) => {
    history.push({
      pathname: "/document",
      search: qs.stringify({
        gradeCode: gradeCode,
      }),
    });
  };
  const navigateSubject = (subjectCode: string) => {
    history.push({
      pathname: "/document",
      search: qs.stringify({
        subjectCode: subjectCode,
      }),
    });
  };
  const navigateYoutube = () =>
    window.open(
      "https://www.youtube.com/watch?v=uWNiD3rumHk&ab_channel=KasanoKai",
      "_blank"
    );
  const navigateGithub = () =>
    window.open("https://github.com/NguyenThaiTiep", "_blank");
  const navigateFacebook = () =>
    window.open("https://www.facebook.com/nguyenthaitiep.206", "_blank");

  return (
    <div className="app-footer">
      <Container>
        <Row>
          <Col lg={4} md={6}>
            <div className="logo-label mb-3">iPractice</div>
            <div className="d-flex mt-1">
              <span className="icon-label">
                <FontAwesomeIcon icon={faPhoneAlt} />
              </span>
              <span>(+84) 819 200 620</span>
            </div>
            <div className="d-flex mt-1">
              <span className="icon-label">
                <FontAwesomeIcon icon={faEnvelope} />
              </span>
              <span>luyenthisp@gmail.com</span>
            </div>
            <div className="d-flex mt-2 social">
              <span className="icon-social">
                <Facebook
                  className={classes.activeLink}
                  onClick={navigateFacebook}
                />
              </span>
              <span className="icon-social mx-2">
                <GitHub
                  className={classes.activeLink}
                  onClick={navigateGithub}
                />
              </span>
              <span className="icon-social mx-2">
                <YouTube
                  className={classes.activeLink}
                  onClick={navigateYoutube}
                />
              </span>
            </div>
          </Col>
          <Col lg={4} md={6} className="mt-3">
            <div className="label mb-2">Đề thi theo môn</div>
            <Row>
              <Col lg={6} md={6} xs={6}>
                <div
                  className={classes.activeLink}
                  onClick={() => navigateSubject("math")}
                >
                  Toán học
                </div>
                <div
                  className={classes.activeLink}
                  onClick={() => navigateSubject("english")}
                >
                  Tiếng Anh
                </div>
                <div
                  className={classes.activeLink}
                  onClick={() => navigateSubject("physics")}
                >
                  Vật lý
                </div>
                <div
                  className={classes.activeLink}
                  onClick={() => navigateSubject("chemistry")}
                >
                  Hóa học
                </div>
              </Col>
              <Col lg={6} md={6} xs={6}>
                <div
                  className={classes.activeLink}
                  onClick={() => navigateSubject("biology")}
                >
                  Sinh học
                </div>
                <div
                  className={classes.activeLink}
                  onClick={() => navigateSubject("history")}
                >
                  Lịch sử
                </div>
                <div
                  className={classes.activeLink}
                  onClick={() => navigateSubject("geography")}
                >
                  Địa lý
                </div>
                <div
                  className={classes.activeLink}
                  onClick={() => navigateSubject("civic-education")}
                >
                  Giáo dục công dân
                </div>
              </Col>
            </Row>
          </Col>
          <Col lg={2} md={6} xs={6} className="mt-3">
            <Row>
              <div className="label mb-2">Ôn luyện</div>
              <div
                className={classes.activeLink}
                onClick={() => navigateGrade("grade-10")}
              >
                Lớp 10
              </div>
              <div
                className={classes.activeLink}
                onClick={() => navigateGrade("grade-11")}
              >
                Lớp 11
              </div>
              <div
                className={classes.activeLink}
                onClick={() => navigateGrade("grade-12")}
              >
                Lớp 12
              </div>
              <div className="mt-1">Ôn thi THPT Quốc gia</div>
            </Row>
          </Col>
          <Col lg={2} md={6} xs={6} className="mt-3">
            <Row>
              <div className="label mb-2">Hỗ trợ</div>
              <div className="mt-1">Báo cáo</div>
              <div className="mt-1">Hướng dẫn sử dụng</div>
              <div className="mt-1">Nhóm hỗ trợ học tập</div>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
const useStyles = makeStyles((theme: Theme) => ({
  activeLink: {
    cursor: "pointer",
    marginTop: "1px",
  },
})) as any;

export default AppFooter;
