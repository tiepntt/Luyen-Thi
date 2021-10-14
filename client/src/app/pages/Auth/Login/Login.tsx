import React from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import "./style.scss";

const SignInSchema = Yup.object().shape({
  username: Yup.string()
    .max(50, "Tên đăng nhập quá dài")
    .required("Bạn chưa nhập tên đăng nhập"),
  password: Yup.string()
    .min(4, "Mật khẩu cần trên 4 ký tự")
    .max(50, "Mật khẩu quá dàu")
    .required("Bạn chưa nhập mật khẩu"),
});

const Login = (props: any) => {
  const history = useHistory();
  const moveToDashBoard = () => {
    history.push("/dashboard");
  };

  const formik = useFormik({
    validationSchema: SignInSchema,
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log(values);
      moveToDashBoard();
    },
  });

  return (
    <div className="login">
      <Form className="m-4" onSubmit={formik.handleSubmit}>
        <h2 className="text-center header-login">Đăng nhập</h2>
        <Row>
          <Col>
            <Form.Group controlId="formBasicUsername" className="text-left">
              <Form.Label>Tên đăng nhập: </Form.Label>
              <Form.Control
                type="text"
                onChange={formik.handleChange}
                name="username"
                value={formik.values.username}
                isInvalid={!!formik.errors.username}
                placeholder="Tên đăng nhập"
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.username}
              </Form.Control.Feedback>
              <br />
            </Form.Group>
            <Form.Group controlId="formBasicPassword" className="text-left">
              <Form.Label>Mật khẩu: </Form.Label>
              <Form.Control
                type="password"
                onChange={formik.handleChange}
                name="password"
                isInvalid={!!formik.errors.password}
                value={formik.values.password}
                placeholder="Mật khẩu"
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.password}
              </Form.Control.Feedback>
              <br />
            </Form.Group>
            <div className="group-submit-login">
              <Button
                variant="success"
                className="button-submit-login"
                type="submit"
              >
                Đăng nhập
              </Button>
              <div className="link">Quên mật khẩu ?</div>
            </div>
          </Col>
          <Col className="login-another">
            <Button variant="primary" className="m-2 p-2">
              Đăng nhập với Facebook
            </Button>
            <Button variant="danger" className="m-2 p-2">
              Đăng nhập với Gmail
            </Button>
            <div className="title-move-register  m-2 p-2">
              Bạn chưa có tài khoản? &nbsp;
              <span className="link" onClick={props.onMoveToRegister}>
                Đăng ký
              </span>
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default Login;
