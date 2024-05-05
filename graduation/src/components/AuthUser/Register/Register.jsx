import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { activateUser, register } from "../../../api";
import { Form, Input, Button, message } from "antd";

export default function Register() {
  const [showUserRegisterForm, setShowUserRegisterForm] = useState(true);
  const [showOTPCode, setShowOTPCode] = useState(false);
  const [otpString, setOtpString] = useState("");
  const navigate = useNavigate();

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [pass, setPass] = useState();
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
            Để khám phá chi tiết các tính năng với tư cách thành viên, hãy đăng
            ký!
          </p>
          <div className="login-content-box-button">
            <div className="login-content-box-button-name">
              <img
                src="https://demo.themeum.com/tutor/wp-content/uploads/2022/02/tutor-live-demo-student-icon.svg"
                alt=""
              />
              <p>
                Tạo tài khoản <span>K26Demy</span>
              </p>
            </div>
          </div>
          {showUserRegisterForm && (
            <Form
              name="registerForm"
              className="register-form"
              onFinish={handleSubmit}
              layout="vertical"
              style={{ width: "45%", marginTop: "0.8rem" }}
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
                  size="large"
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
                  size="large"
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
                  size="large"
                  placeholder="Mật khẩu"
                  onChange={(e) => setPass(e.target.value)}
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  style={{ width: "100%" }}
                >
                  Đăng ký
                </Button>
              </Form.Item>
              <Form.Item>
                <p>
                  Bạn đã có tài khoản? <Link to="/login">Đăng nhập</Link>
                </p>
              </Form.Item>
            </Form>
          )}
          {showOTPCode && (
            <Form onFinish={handleSubmitOTP}>
              <p style={{ margin: "1rem 0", padding: "0 2rem" }}>
                Vui lòng nhập mã OTP được gửi về email!
              </p>
              <div style={{ display: "flex", gap: "1rem" }}>
                <Input.OTP
                  variant="filled"
                  value={otpString}
                  onChange={(otp) => setOtpString(otp)}
                  length={4}
                />
                <Button onClick={handleSubmit}>Gửi lại OTP</Button>
              </div>

              <Button
                style={{ margin: "1.5rem 0", width: "100%" }}
                type="primary"
                htmlType="submit"
                size="large"
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
