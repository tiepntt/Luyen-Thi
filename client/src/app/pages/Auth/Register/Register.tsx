import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "./style.scss";
import _ from "lodash";
import { authApi } from "services/api/auth/auth";
import { toastService } from "services/toast";
import { useDispatch } from "react-redux";
import { UserFunction } from "redux/user/action";

const Register = (props: any) => {
  const [isSubmit, setIsSubmit] = useState(false);
  const dispatch = useDispatch();
  const formik = useFormik({
    validationSchema: SignInSchema,
    initialValues: {
      lastName: "",
      firstName: "",
      username: "",
      password: "",
      confirmPassword: "",
      email: "",
      phoneNumber: "",
      birthDay: new Date(),
    },
    onSubmit: (values) => {},
  });
  const onSubmit = (event: any) => {
    event.preventDefault();
    setIsSubmit(true);
    if (_.isEmpty(formik.errors)) {
      authApi.register(formik.values).then((res) => {
        if (res.status === 200) {
          dispatch(UserFunction.login(res.data));
        } else {
          toastService.error(res.data.message);
        }
      });
    } else {
    }
  };
  return (
    <div className="register">
      <Form className="m-4" onSubmit={onSubmit}>
        <h2 className="text-center header-register">Tạo tài khoản</h2>
        <Row className="mt-3">
          <Form.Group
            as={Col}
            md={6}
            sm={12}
            controlId="formBasicSurname"
            className="text-left"
          >
            <Form.Label>
              Họ và tên đệm<span className="text-require">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              onChange={formik.handleChange}
              name="lastName"
              value={formik.values.lastName}
              isInvalid={!!formik.errors.lastName && isSubmit}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.lastName}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group
            as={Col}
            md={6}
            sm={12}
            controlId="formBasicName"
            className="text-left"
          >
            <Form.Label>
              Tên<span className="text-require">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              onChange={formik.handleChange}
              name="firstName"
              value={formik.values.firstName}
              isInvalid={!!formik.errors.firstName && isSubmit}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.firstName}
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row>
          <Form.Group
            as={Col}
            md={6}
            sm={12}
            controlId="formBasicUsername"
            className="text-left"
          >
            <Form.Label>
              Tên đăng nhập <span className="text-require">*</span>
            </Form.Label>
            <Form.Control
              type="username"
              onChange={formik.handleChange}
              name="username"
              value={formik.values.username}
              isInvalid={!!formik.errors.username && isSubmit}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.username}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group
            as={Col}
            md={6}
            sm={12}
            controlId="formBasicEmail"
            className="text-left"
          >
            <Form.Label>
              Email <span className="text-require">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              onChange={formik.handleChange}
              name="email"
              isInvalid={!!formik.errors.email && isSubmit}
              value={formik.values.email}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.email}
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row>
          <Form.Group
            as={Col}
            md={6}
            sm={12}
            controlId="formBasicPassword"
            className="text-left"
          >
            <Form.Label>
              Mật khẩu <span className="text-require">*</span>
            </Form.Label>
            <Form.Control
              type="password"
              onChange={formik.handleChange}
              name="password"
              isInvalid={!!formik.errors.password && isSubmit}
              value={formik.values.password}
            />

            <Form.Control.Feedback type="invalid">
              {formik.errors.password}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group
            as={Col}
            md={6}
            sm={12}
            controlId="formBasicConfirmPassword"
            className="text-left"
          >
            <Form.Label>
              Nhập lại mật khẩu <span className="text-require">*</span>
            </Form.Label>
            <Form.Control
              type="password"
              onChange={formik.handleChange}
              name="confirmPassword"
              isInvalid={!!formik.errors.confirmPassword && isSubmit}
              value={formik.values.confirmPassword}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.confirmPassword}
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row>
          <Form.Group
            as={Col}
            md={6}
            sm={6}
            controlId="formBasicPhoneNumber"
            className="text-left"
          >
            <Form.Label>
              Số điện thoại <span className="text-require">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              onChange={formik.handleChange}
              name="phoneNumber"
              isInvalid={!!formik.errors.phoneNumber && isSubmit}
              value={formik.values.phoneNumber}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.phoneNumber}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group
            as={Col}
            md={6}
            sm={6}
            controlId="formBasicPhoneNumber"
            className="text-left"
          >
            <Form.Label>Ngày sinh</Form.Label>
            <Form.Control
              as={DatePicker}
              selected={formik.values.birthDay}
              onChange={(date: any) =>
                formik.setValues({ ...formik.values, birthDay: date })
              }
              name="birthDay"
              maxDate={new Date()}
              dateFormat="dd/MM/yyyy"
            />
          </Form.Group>
        </Row>
        <div className="text-center mt-3">
          <Button className="button-submit-register m-2" type="submit">
            Đăng ký
          </Button>
          <div>
            Bạn đã có tài khoản? &nbsp;
            <Link className="link" to="/auth/login">
              Đăng nhập
            </Link>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default Register;
const SignInSchema = Yup.object().shape({
  lastName: Yup.string().required("Bạn chưa nhập họ và tên"),
  firstName: Yup.string().required("Bạn chưa nhập tên"),
  username: Yup.string()
    .matches(
      /^[aA0-zZ9]+$/,
      "Tên đăng không nhập chứa ký tự đặc biệt và khoảng trắng"
    )
    .max(16, "Tên đăng nhập quá dài")
    .required("Trường này không được bỏ trống"),
  password: Yup.string()
    .min(4, "Mật khẩu cần trên 4 ký tự")
    .max(50, "Mật khẩu quá dàu")
    .required("Bạn chưa nhập mật khẩu"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Mật khẩu không trùng khớp!")
    .required("Required"),
  email: Yup.string()
    .email("Email không đúng định dạng")
    .required("Email không được bỏ trống"),
  phoneNumber: Yup.string()
    .matches(/^0[0-9]+/, "Số điện thoại không hợp lệ")
    .required("Không được bỏ trống phần này"),
});
