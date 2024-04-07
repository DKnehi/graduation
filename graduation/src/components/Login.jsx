import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Login as loginApi } from "../api/index";


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
  const location = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // Lưu trữ đường dẫn trước đó
  const [prevPath, setPrevPath] = useState(location.state?.from || "/");

  const handleSubmit = async (event) => {
    event.preventDefault(); // Ngăn chặn việc tải lại trang khi submit form
    try {
      const res = await loginApi.login(username, password);
      console.log(res);
      localStorage.setItem("user", JSON.stringify(res.data));
      navigate(prevPath); // Quay lại đường dẫn trước đó sau khi đăng nhập thành công
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Lưu đường dẫn trước đó vào state khi có thay đổi trong location
    setPrevPath(location.state?.from || "/");
  }, [location]);
  console.log(username,password);
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
            <form className="login-form" onSubmit={handleSubmit}>
              <h2>Học viên</h2>
              <input
                type="email"
                name=""
                placeholder="Nhập email"
                id=""
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="password"
                name=""
                placeholder="Nhập mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id=""
              />
              <button type="submit">Đăng nhập</button>
              <a href="">Quên mật khẩu?</a>
              <p>
                Bạn không có tài khoản{" "}
                <Link to="/register">
                  <a href="">Đăng ký</a>
                </Link>
              </p>
            </form>
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
                Đăng nhập với <span>Người hướng dẫn</span>
              </p>
            </div>
            <div className="login-content-box-button-arrow">
              <i class="fa-solid fa-chevron-right"></i>
            </div>
          </button>
          {showInstructorLoginForm && (
            <form className="login-form" onSubmit={handleSubmit}>
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
        <div className="login-slide-box"></div>
      </section>
    </div>
  );
}
