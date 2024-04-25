import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { activateUser, register } from "../../../api";
import { Form, Input, Button, message } from "antd";

export default function Register() {
  const [showUserRegisterForm, setShowUserRegisterForm] = useState(false);
  const [showOTPCode, setShowOTPCode] = useState(false);
  const [otpString, setOtpString] = useState("");
  const navigate = useNavigate();

  const handleUserRegisterClick = () => {
    setShowUserRegisterForm((prev) => !prev);
  };
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [pass, setPass] = useState();
  console.log(name, email, pass);
  const handleSubmit = async () => {
    try {
      const response = await register(name, email, pass);
      if (response.code === 201) {
        setShowOTPCode(true);
        setShowUserRegisterForm();
        sessionStorage.setItem(
          "activationToken",
          JSON.stringify(response.data.activationToken)
        );
        setTimeout(() => {
          sessionStorage.removeItem("activationToken");
        }, 5 * 60 * 1000);
      }
    } catch (error) {
      message.error("Tài khoản đã tồn tại");
    }
  };

  const handleSubmitOTP = async () => {
    const activationToken = sessionStorage.getItem("activationToken");
    const stringWithoutQuotes = activationToken.replace(/^"(.*)"$/, "$1");
    console.log(otpString, stringWithoutQuotes);
    activateUser(otpString, stringWithoutQuotes).then((data) => {
      if (data.code == 201) {
        setShowOTPCode(false);
        navigate("/login");
        // console.log(data);
        message.success("Đăng ký thành công");
      } else message.error("Sai mã otp");
    });
  };
  return (
    <div>
      <section className="login-section">
        <div className="login-content-box">
          <h2>Tạo tài khoản!</h2>
          <p className="login-content-box-subheading">
            Để khám phá chi tiết các tính năng của sinh viên, chỉ cần nhấp vào
            'Đăng ký làm sinh viên'.
          </p>
          <button
            className="login-content-box-button"
            onClick={handleUserRegisterClick}
          >
            <div className="login-content-box-button-name">
              <img
                src="https://demo.themeum.com/tutor/wp-content/uploads/2022/02/tutor-live-demo-student-icon.svg"
                alt=""
              />
              <p>
                Tạo tài khoản <span>Học viên</span>
              </p>
            </div>
            <div className="login-content-box-button-arrow">
              <i className="fa-solid fa-chevron-right"></i>
            </div>
          </button>
          {showUserRegisterForm && (
            <Form
              name="registerForm"
              className="register-form"
              onFinish={handleSubmit}
              layout="vertical"
            >
              <h2> </h2>
              <Form.Item
                style={{ marginTop: "1rem" }}
                name="name"
                rules={[
                  { required: true, message: "Vui lòng nhập họ và tên!" },
                ]}
              >
                <Input
                  type="text"
                  placeholder="Họ và tên"
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Item>
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Vui lòng nhập email!" },
                  { type: "email", message: "Email không đúng định dạng!" },
                ]}
              >
                <Input
                  type="email"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
              >
                <Input.Password
                  placeholder="Mật khẩu"
                  onChange={(e) => setPass(e.target.value)}
                />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Đăng ký
                </Button>
              </Form.Item>
              <Form.Item>
                <p>
                  Already have an account? <Link to="/login">Sign in</Link>
                </p>
              </Form.Item>
            </Form>
          )}
          {showOTPCode && (
            <Form onFinish={handleSubmitOTP} className="">
              <h2>Mã xác thực</h2>
              <p style={{ marginBottom: "1rem " }}>
                Vui lòng nhập mã OTP được gửi về email
              </p>
              <div style={{ display: "flex", gap: "1rem" }}>
                <Input.OTP
                  variant="filled"
                  value={otpString}
                  onChange={(otp) => setOtpString(otp)}
                  length={4}
                />
                <Button onClick={handleSubmit}>Resend code</Button>
              </div>

              <Button
                style={{ margin: "1rem 0" }}
                type="primary"
                htmlType="submit"
              >
                Đăng ký
              </Button>
            </Form>
          )}
        </div>
        <div className="login-slide-box">
          <img
            style={{ width: "649px" }}
            src="https://demo.themeum.com/tutor/wp-content/uploads/2022/03/tutor-live-demo-carousel-dashboard.png"
            alt=""
          />
        </div>
      </section>
    </div>
  );
}
