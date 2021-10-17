import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

import { useFormik } from "formik";
import { object, string } from "yup";
import { useHistory } from "react-router-dom";
// import { Link } from "react-router-dom";
import "./style.scss";
// import { authApi } from "services/api/auth/auth";
// import { toastService } from "services/toast";
import _ from "lodash";
// import { useDispatch } from "react-redux";
// import { UserFunction } from "redux/user/action";

const ChangePasswordSchema = object().shape({
  currentPassword: string()
    .min(4, "Mật khẩu cần trên 4 ký tự")
    .required("Bạn chưa nhập mật khẩu hiện tại"),
  newPassword: string()
    .min(4, "Mật khẩu cần trên 4 ký tự")
    .required("Bạn chưa nhập mật khẩu mới"),
  newRePassword: string()
    .min(4, "Mật khẩu cần trên 4 ký tự")
    .required("Bạn chưa nhập lại mật khẩu mới"),
});

const ChangePassword = (props: any) => {
  let history = useHistory();
  const [isSubmit, setIsSubmit] = useState(false);
  const [loadding, setLoadding] = useState(false);
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
      // moveToDashBoard();
    },
  });
  const onSubmit = (event: any) => {
    event.preventDefault();
    setIsSubmit(true);
    if (_.isEmpty(formik.errors)) {
      setLoadding(true);
      // authApi.login(formik.values).then((res) => {
      //   setLoadding(false);
      //   if (res.status === 200) {
      //     dispatch(UserFunction.login(res.data));
      //   } else {
      //     toastService.error(res.data.message);
      //   }
      // });
    }
  };
  function back() {
    history.push("/home");
  }

  return (
    <div className="changePassword">
      <Form className="m-2" onSubmit={onSubmit}>
        <h2 className="text-center header mb-4">Đổi mật khẩu</h2>
        <h5 className="text-center header mb-4">
          Vui lòng đặt lại mật khẩu của bạn
        </h5>
        <Form.Group
          controlId="formBasicPassword"
          className="text-left form mt-1"
        >
          <Form.Label>Mật khẩu hiện tại *</Form.Label>
          <Form.Control
            size="lg"
            type="password"
            onChange={formik.handleChange}
            name="currentPassword"
            value={formik.values.currentPassword}
            isInvalid={!!formik.errors.currentPassword && isSubmit}
            placeholder="Vui lòng nhập mật khẩu hiện tại"
          />
          <Form.Control.Feedback type="invalid" className="ac">
            {(isSubmit && formik.errors.currentPassword) || ""}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group
          controlId="formBasicPassword"
          className="text-left form mt-1"
        >
          <Form.Label>Mật khẩu mới *</Form.Label>
          <Form.Control
            size="lg"
            type="password"
            onChange={formik.handleChange}
            name="newPassword"
            isInvalid={!!formik.errors.newPassword && isSubmit}
            value={formik.values.newPassword}
            placeholder="Vui lòng nhập mật khẩu mới"
          />
          <Form.Control.Feedback type="invalid">
            {(isSubmit && formik.errors.newPassword) || ""}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group
          controlId="formBasicPassword"
          className="text-left form mt-1"
        >
          <Form.Label>Nhập lại mật khẩu mới *</Form.Label>
          <Form.Control
            size="lg"
            type="password"
            onChange={formik.handleChange}
            name="newRePassword"
            isInvalid={!!formik.errors.newRePassword && isSubmit}
            value={formik.values.newRePassword}
            placeholder="Vui lòng nhập lại mật khẩu mới"
          />
          <Form.Control.Feedback type="invalid">
            {(isSubmit && formik.errors.newRePassword) || ""}
          </Form.Control.Feedback>
        </Form.Group>
        <div className="group-submit-login mt-1">
          <div className="link" onClick={back}>
            Quay lại
          </div>
          <Button
            disabled={loadding}
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
