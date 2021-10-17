import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

import { useFormik } from "formik";
import { object, string } from "yup";
import "./style.scss";
import _ from "lodash";
import { useAuthorize } from "hooks/User/userAuthorize";
import { history } from "services/history";
import * as Yup from "yup";
import { authApi } from "services/api/auth/auth";
import { toastService } from "services/toast";

const ChangePassword = (props: any) => {
  useAuthorize();
  const [isSubmit, setIsSubmit] = useState(false);
  const [loadding, setLoadding] = useState(false);
  const [passwordCorrect, setPasswordCorrect] = useState(true);
  // const dispatch = useDispatch();
  const formik = useFormik({
    validationSchema: ChangePasswordSchema,
    initialValues: {
      currentPassword: "",
      newPassword: "",
      newRePassword: "",
    },
    onSubmit: (values) => {
      setIsSubmit(true);
    },
  });
  const back = () => {
    history.push("/home");
  };
  const checkPassword = () => {
    authApi.checkPassword(formik.values.currentPassword).then((res) => {
      if (res.status === 200) {
        setPasswordCorrect(true);
      } else {
        setPasswordCorrect(false);
      }
    });
  };
  const changePassword = (event: any) => {
    event.preventDefault();
    setIsSubmit(true);
    if (_.isEmpty(formik.errors)) {
      setLoadding(true);
      authApi
        .changePassword(formik.values.newPassword, formik.values.newRePassword)
        .then((res) => {
          setLoadding(false);
          if (res.status === 200) {
            toastService.success("Đổi mật khẩu thành công");
            history.push("/");
          } else {
            toastService.error(res.data.message);
          }
        });
    }
  };
  return (
    <div className="changePassword">
      <Form className="m-2" onSubmit={changePassword}>
        <h2 className="text-center header mb-4">Đổi mật khẩu</h2>
        <Form.Group controlId="formBasicPassword" className="text-left mb-2">
          <Form.Label>Mật khẩu hiện tại *</Form.Label>
          <Form.Control
            type="password"
            onChange={formik.handleChange}
            onBlur={checkPassword}
            name="currentPassword"
            value={formik.values.currentPassword}
            isInvalid={
              (!!formik.errors.currentPassword && isSubmit) || !passwordCorrect
            }
          />
          <Form.Control.Feedback type="invalid" className="ac">
            {(isSubmit && formik.errors.currentPassword) ||
              "Mật khẩu không chính xác"}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formBasicPassword" className="text-left mb-2">
          <Form.Label>Mật khẩu mới *</Form.Label>
          <Form.Control
            type="password"
            onChange={formik.handleChange}
            name="newPassword"
            isInvalid={!!formik.errors.newPassword && isSubmit}
            value={formik.values.newPassword}
          />
          <Form.Control.Feedback type="invalid">
            {(isSubmit && formik.errors.newPassword) || ""}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formBasicPassword" className="text-left mb-2">
          <Form.Label>Nhập lại mật khẩu mới *</Form.Label>
          <Form.Control
            type="password"
            onChange={formik.handleChange}
            name="newRePassword"
            isInvalid={!!formik.errors.newRePassword && isSubmit}
            value={formik.values.newRePassword}
          />
          <Form.Control.Feedback type="invalid">
            {(isSubmit && formik.errors.newRePassword) || ""}
          </Form.Control.Feedback>
        </Form.Group>
        <div className="group-submit-login  mt-3">
          <div className="link" onClick={back}>
            Quay lại
          </div>
          <Button
            disabled={loadding || !passwordCorrect}
            variant="success"
            className="button-submit-login"
            type="submit"
          >
            {loadding ? "Đang xác nhận" : "Xác nhận"}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default ChangePassword;
const ChangePasswordSchema = object().shape({
  currentPassword: string()
    .min(4, "Mật khẩu tối thiểu 8 kí tự")
    .required("Phần này không được bỏ trống"),
  newPassword: string()
    .min(4, "Mật khẩu cần trên 8 ký tự")
    .required("Phần này không được bỏ trống"),
  newRePassword: string()
    .oneOf([Yup.ref("newPassword"), null], "Mật khẩu không trùng khớp!")
    .required("Phần này không được bỏ trống"),
});
