import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Login as loginApi } from "../../../api/index";
import { Form, Input, Button, message } from "antd";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onFinish = async () => {
    try {
      setLoading(true);
      const res = await loginApi.login(username, password);
      localStorage.setItem("user", JSON.stringify(res.data));
      await getUserInfo(res?.data?.metaData?._id, res?.data?.accessToken);
      message.success("Đăng nhập thành công!");
      setLoading(false);
      navigate("/");
    } catch (error) {
      console.log(error);
      message.error("Sai tài khoản hoặc mật khẩu!");
      setLoading(false);
    }
  };

  const getUserInfo = async (idUser, accessToken) => {
    try {
      const res = await loginApi.getInfo(idUser, accessToken);
      localStorage.setItem("userInfo", JSON.stringify(res.data));
    } catch (error) {
      return error;
    }
  };

  return (
    <div>
      <section className="login-section">
        <div className="login-content-box">
          <h2>Xin chào đã đến với K26Demy</h2>
          <p className="login-content-box-subheading">
            Để khám phá chi tiết các tính năng của chúng tôi chỉ cần nhấp vào
            'Đăng nhập'.
          </p>
          <div className="login-content-box-button">
            <div className="login-content-box-button-name">
              <img
                src="https://demo.themeum.com/tutor/wp-content/uploads/2022/02/tutor-live-demo-student-icon.svg"
                alt=""
              />
              <p>
                Đăng nhập với <span>K26Demy</span>
              </p>
            </div>
          </div>
          <Form
            className=""
            onFinish={onFinish}
            style={{ width: "45%", marginTop: "0.8rem" }}
          >
            <Form.Item
              style={{ marginTop: "1rem" }}
              name="username"
              rules={[
                { required: true, message: "Vui lòng nhập email!" },
                { type: "email", message: "Email không đúng định dạng!" },
              ]}
            >
              <Input
                size="large"
                type="email"
                placeholder="Nhập email"
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
            >
              <Input.Password
                size="large"
                placeholder="Nhập mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                size="large"
                style={{ width: "100%" }}
              >
                Đăng nhập
              </Button>
            </Form.Item>
            <Form.Item>
              <p>
                Bạn chưa có tài khoản?{" "}
                <Link to="/register">
                  <a href="">Đăng ký</a>
                </Link>
              </p>
            </Form.Item>
          </Form>
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
