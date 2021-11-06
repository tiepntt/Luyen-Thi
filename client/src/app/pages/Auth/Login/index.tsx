import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

import { useFormik } from "formik";
import { object, string } from "yup";
import { Link } from "react-router-dom";
import "./style.scss";
import { authApi } from "services/api/auth/auth";
import { toastService } from "services/toast";
import _ from "lodash";
import { useDispatch } from "react-redux";
import { UserFunction } from "redux/user/action";
import { useRedirectAuth } from "hooks/User/useRedirectAuth";
import GoogleLogin, { GoogleLoginResponse } from "react-google-login";
import ReactFacebookLogin, {
  ReactFacebookLoginInfo,
} from "react-facebook-login";

const SignInSchema = object().shape({
  username: string().required("Bạn chưa nhập tên đăng nhập"),
  password: string()
    .min(4, "Mật khẩu cần trên 4 ký tự")
    .required("Bạn chưa nhập mật khẩu"),
});

const Login = (props: any) => {
  useRedirectAuth();
  const [isSubmit, setIsSubmit] = useState(false);
  const [loadding, setLoadding] = useState(false);
  const dispatch = useDispatch();
  const formik = useFormik({
    validationSchema: SignInSchema,
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values) => {
      setIsSubmit(true);
      // moveToDashBoard();
    },
  });
  const onSubmit = (event: any) => {
    event.preventDefault();
    if (_.isEmpty(formik.errors)) {
      setLoadding(true);
      authApi.login(formik.values).then((res) => {
        setLoadding(false);
        if (res.status === 200) {
          dispatch(UserFunction.login(res.data));
        } else {
          toastService.error(res.data.message);
        }
      });
    }
  };
  const responseGoogle = (response?: GoogleLoginResponse) => {
    if (response) {
      setLoadding(true);
      authApi.loginGoogle(response.tokenId).then((res) => {
        setLoadding(false);
        if (res.status === 200) {
          dispatch(UserFunction.login(res.data));
        } else {
          toastService.error(res.data.message);
        }
      });
    }
  };
  const responseFacebook = (response: ReactFacebookLoginInfo) => {
    if (response) {
      setLoadding(true);
      authApi.loginFacebook(response.accessToken).then((res) => {
        setLoadding(false);
        if (res.status === 200) {
          dispatch(UserFunction.login(res.data));
        } else {
          toastService.error(res.data.message);
        }
      });
    }
  };
  return (
    <div className="login">
      <h2 className="text-center header-login mb-4">Đăng nhập</h2>
      <Row className="m-2">
        <Col lg={7} md={6} id="info-login">
          <Form onSubmit={onSubmit}>
            <Form.Group controlId="formBasicUsername" className="text-left">
              <Form.Control
                type="text"
                onChange={formik.handleChange}
                name="username"
                value={formik.values.username}
                isInvalid={!!formik.errors.username && isSubmit}
                placeholder="Tên đăng nhập"
              />
              <Form.Control.Feedback type="invalid" className="ac">
                {(isSubmit && formik.errors.username) || ""}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              controlId="formBasicPassword"
              className="text-left mt-1"
            >
              <Form.Control
                type="password"
                onChange={formik.handleChange}
                name="password"
                isInvalid={!!formik.errors.password && isSubmit}
                value={formik.values.password}
                placeholder="Mật khẩu"
              />
              <Form.Control.Feedback type="invalid">
                {(isSubmit && formik.errors.password) || ""}
              </Form.Control.Feedback>
            </Form.Group>
            <div className="group-submit-login mt-1">
              <Button
                disabled={loadding}
                variant="success"
                className="button-submit-login"
                type="submit"
              >
                {loadding ? "Đang đăng nhập" : "Đăng nhập"}
              </Button>
              <div className="link">Quên mật khẩu ?</div>
            </div>
          </Form>
        </Col>
        <Col className="login-another" lg={5} md={6}>
          <ReactFacebookLogin
            appId="457405485661193"
            cssClass="m-2 p-2 btn btn-primary w-100"
            textButton="Đăng nhập với Facebook"
            autoLoad={false}
            callback={responseFacebook}
          />
          <GoogleLogin
            clientId="493969128226-4va3ueqj1lk3b1rlus79sarpbii887ro.apps.googleusercontent.com"
            buttonText="Login"
            render={(renderProps) => (
              <Button
                variant="danger"
                className="m-2 p-2"
                onClick={(e) => {
                  e.preventDefault();
                  renderProps.onClick();
                }}
              >
                Đăng nhập với Google
              </Button>
            )}
            isSignedIn={false}
            autoLoad={false}
            onSuccess={responseGoogle as any}
            onFailure={() => {}}
            cookiePolicy={"http://localhost:3000"}
          />
          <div className="title-move-register ">
            Bạn chưa có tài khoản? &nbsp;
            <Link className="link" to="/auth/register">
              Đăng ký
            </Link>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
