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

const SignInSchema = object().shape({
  username: string().required("Bạn chưa nhập tên đăng nhập"),
  password: string()
    .min(4, "Mật khẩu cần trên 4 ký tự")
    .required("Bạn chưa nhập mật khẩu"),
});

const Login = (props: any) => {
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
    setIsSubmit(true);
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

  return (
    <div className="login">
      <Form className="m-2" onSubmit={onSubmit}>
        <h2 className="text-center header-login mb-4">Đăng nhập</h2>
        <Row>
          <Col lg={7} id="info-login">
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
          </Col>
          <Col className="login-another" lg={5}>
            <Button variant="primary" className="m-2 p-2">
              Đăng nhập với Facebook
            </Button>
            <Button variant="danger" className="m-2 p-2">
              Đăng nhập với Gmail
            </Button>
            <div className="title-move-register ">
              Bạn chưa có tài khoản? &nbsp;
              <Link className="link" to="/auth/register">
                Đăng ký
              </Link>
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default Login;
