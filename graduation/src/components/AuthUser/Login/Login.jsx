import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Login as loginApi } from "../../../api/index";
import { Form, Input, Button, message } from "antd";
export default function Login() {
  const [showUserLoginForm, setShowUserLoginForm] = useState(false);
  const [showInstructorLoginForm, setShowInstructorLoginForm] = useState(false);

  const handleUserLoginClick = () => {
    setShowUserLoginForm((prev) => !prev);
    setShowInstructorLoginForm(false);
  };

  const handleInstructorLoginClick = () => {
    setShowInstructorLoginForm((prev) => !prev);
    setShowUserLoginForm(false); //
  };

  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const onFinish = async () => {
    try {
      const res = await loginApi.login(username, password);
      localStorage.setItem("user", JSON.stringify(res.data));
      getUserInfo(res?.data?.metaData?._id, res?.data?.accessToken);
      message.success("Đăng nhập thành công");
      setLoading(false);
      navigate(-1); 
    } catch (error) {
      console.log(error);
      message.error("Đăng nhập thất bại");
      setLoading(false);
    }
  };

  const getUserInfo = async (idUser, accessToken) => {
    try {
      const res = await loginApi.getInfo(idUser, accessToken);
      localStorage.setItem("userInfo", JSON.stringify(res.data));
      // console.log(res);
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
            Để khám phá chi tiết các tính năng của sinh viên, chỉ cần nhấp vào
            'Đăng nhập với tư cách sinh viên'. Ngoài ra, hãy nhấp vào 'Đăng nhập
            với tư cách là người hướng dẫn' để khám phá khía cạnh của người
            hướng dẫn.
          </p>
          <button
            className="login-content-box-button"
            onClick={handleUserLoginClick}
          >
            <div className="login-content-box-button-name">
              <img
                src="https://demo.themeum.com/tutor/wp-content/uploads/2022/02/tutor-live-demo-student-icon.svg"
                alt=""
              />
              <p>
                Đăng nhập với <span>Học viên</span>
              </p>
            </div>
            <div className="login-content-box-button-arrow">
              <i class="fa-solid fa-chevron-right"></i>
            </div>
          </button>
          {showUserLoginForm && (
            <Form className="" onFinish={onFinish}>
              <Form.Item
                style={{ marginTop: "1rem" }}
                name="username"
                rules={[
                  { required: true, message: "Vui lòng nhập email!" },
                  { type: "email", message: "Email không đúng định dạng!" }, // Kiểm tra định dạng email
                ]}
              >
                <Input
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
                  placeholder="Nhập mật khẩu"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                  Đăng nhập
                </Button>
              </Form.Item>
              <Form.Item>
                <a href="">Quên mật khẩu</a>
              </Form.Item>
              <Form.Item>
                <p>
                  Bạn muốn là người hướng dẫn?{" "}
                  <Link to="/register">
                    <a href="">Đăng ký</a>
                  </Link>
                </p>
              </Form.Item>
            </Form>
          )}
          <button
            className="login-content-box-button"
            onClick={handleInstructorLoginClick}
          >
            <div className="login-content-box-button-name">
              <img
                src="https://demo.themeum.com/tutor/wp-content/uploads/2022/02/tutor-live-demo-instructor-icon.svg"
                alt=""
              />
              <p>
                Đăng nhập với <span>Hướng dẫn</span>
              </p>
            </div>
            <div className="login-content-box-button-arrow">
              <i class="fa-solid fa-chevron-right"></i>
            </div>
          </button>
          {showInstructorLoginForm && (
            <form className="login-form" onSubmit={onFinish}>
              <h2>Người hướng dẫn</h2>
              <input
                type="email"
                name=""
                placeholder="Enter your email"
                id=""
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="password"
                name=""
                placeholder="Enter your password"
                id=""
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit">Đăng nhập</button>
              <a href="">Quên mật khẩu</a>
              <p>
                Bạn muốn là người hướng dẫn?{" "}
                <Link to="/register">
                  <a href="">Đăng ký</a>
                </Link>
              </p>
            </form>
          )}
        </div>
        <div className="login-slide-box">
          <img
            style={{ width: "649px" }}
            src="https://demo.themeum.com/tutor/wp-content/uploads/2022/03/tutor-live-demo-carousel-dashboard.png"
            alt=""
          />
          <h2>Personalized Dashboard for All Roles</h2>
          <p>
            Organized and personalized dashboard for teachers & students. Access
            everything you need to manage your LMS website from one spot.
          </p>
        </div>
      </section>
    </div>
  );
}
