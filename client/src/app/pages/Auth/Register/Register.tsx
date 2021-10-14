import React from "react";
import { Form, Button } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./style.scss";

const SignInSchema = Yup.object().shape({
  surname: Yup.string().required("Bạn chưa nhập họ và tên"),
  name: Yup.string().required("Bạn chưa nhập tên"),
  username: Yup.string()
    .max(50, "Tên đăng nhập quá dài")
    .required("Bạn chưa nhập tên đăng nhập"),
  password: Yup.string()
    .min(4, "Mật khẩu cần trên 4 ký tự")
    .max(50, "Mật khẩu quá dàu")
    .required("Bạn chưa nhập mật khẩu"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Mật khẩu không trùng khớp!")
    .required("Required"),
  email: Yup.string()
    .email("Bạn chưa nhập đúng định dạng email")
    .required("Bạn chưa nhập email"),
  phoneNumber: Yup.string().required("Bạn chưa nhập số điện thoại"),
});

const Register = (props: any) => {
  const formik = useFormik({
    validationSchema: SignInSchema,
    initialValues: {
      surname: "",
      name: "",
      username: "",
      password: "",
      confirmPassword: "",
      email: "",
      phoneNumber: "",
    },
    onSubmit: (values) => {
      console.log(values);
      props.onMoveToLogin();
    },
  });

  return (
    <div className="register">
      <Form className="m-4" onSubmit={formik.handleSubmit}>
        <h2 className="text-center header-register">Tạo tài khoản</h2>
        <Form.Group controlId="formBasicSurname" className="text-left">
          <Form.Label>
            Họ và tên đệm: <span className="text-require">*</span>
          </Form.Label>
          <Form.Control
            type="text"
            onChange={formik.handleChange}
            name="surname"
            value={formik.values.surname}
            isInvalid={!!formik.errors.surname}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.surname}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formBasicName" className="text-left">
          <Form.Label>
            Tên: <span className="text-require">*</span>
          </Form.Label>
          <Form.Control
            type="text"
            onChange={formik.handleChange}
            name="name"
            value={formik.values.name}
            isInvalid={!!formik.errors.name}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.name}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formBasicUsername" className="text-left">
          <Form.Label>
            Tên đăng nhập: <span className="text-require">*</span>
          </Form.Label>
          <Form.Control
            type="username"
            onChange={formik.handleChange}
            name="username"
            value={formik.values.username}
            isInvalid={!!formik.errors.username}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.username}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formBasicPassword" className="text-left">
          <Form.Label>
            Mật khẩu: <span className="text-require">*</span>
          </Form.Label>
          <Form.Control
            type="password"
            onChange={formik.handleChange}
            name="password"
            isInvalid={!!formik.errors.password}
            value={formik.values.password}
          />

          <Form.Control.Feedback type="invalid">
            {formik.errors.password}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formBasicConfirmPassword" className="text-left">
          <Form.Label>
            Nhập lại mật khẩu: <span className="text-require">*</span>
          </Form.Label>
          <Form.Control
            type="password"
            onChange={formik.handleChange}
            name="confirmPassword"
            isInvalid={!!formik.errors.confirmPassword}
            value={formik.values.confirmPassword}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.confirmPassword}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formBasicEmail" className="text-left">
          <Form.Label>
            Email: <span className="text-require">*</span>
          </Form.Label>
          <Form.Control
            type="text"
            onChange={formik.handleChange}
            name="email"
            isInvalid={!!formik.errors.email}
            value={formik.values.email}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.email}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formBasicPhoneNumber" className="text-left">
          <Form.Label>
            Số điện thoại: <span className="text-require">*</span>
          </Form.Label>
          <Form.Control
            type="text"
            onChange={formik.handleChange}
            name="phoneNumber"
            isInvalid={!!formik.errors.phoneNumber}
            value={formik.values.phoneNumber}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.phoneNumber}
          </Form.Control.Feedback>
        </Form.Group>
        <div className="text-center">
          <Button className="button-submit-register m-2" type="submit">
            Đăng ký
          </Button>
          <div>
            Bạn đã có tài khoản? &nbsp;
            <span className="link" onClick={props.onMoveToLogin}>
              Đăng nhập
            </span>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default Register;
