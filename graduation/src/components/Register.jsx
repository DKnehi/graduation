import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { activateUser, register } from "../api";

import { toast, ToastContainer } from "react-toastify";
export default function Register() {
  const [showUserRegisterForm, setShowUserRegisterForm] = useState(false);
  const [showInstructorRegisterForm, setShowInstructorRegisterForm] =
    useState(false);
  const [showOTPCode, setShowOTPCode] = useState(true);
// không gửi đc dữ liệu sẽ bị lỗi, nên thay đổi bật tắt thủ công
  const handleUserRegisterClick = () => {
    setShowUserRegisterForm((prev) => !prev);
    setShowInstructorRegisterForm(false);
  };

  const handleInstructorRegisterClick = () => {
    setShowInstructorRegisterForm((prev) => !prev);
    setShowUserRegisterForm(false);
  };

  // const [otpValues, setOTPValues] = useState(["", "", "", ""]);
  const [otpString, setotpString] = useState();
  // const handleChange = (index, event) => {
  //   const value = event.target.value;

  //   // Kiểm tra nếu giá trị nhập vào không phải là số hoặc độ dài vượt quá 1 ký tự thì không cập nhật
  //   if (!/^\d*$/.test(value) || value.length > 1) {
  //     return;
  //   }

  //   // Cập nhật giá trị của input
  //   const newOTPValues = [...otpValues];
  //   newOTPValues[index] = value;
  //   setOTPValues(newOTPValues);

  //   // Nếu có giá trị mới và không phải là ô cuối cùng thì focus ô tiếp theo
  //   if (value && index < 3) {
  //     document.getElementById(`otpInput${index + 1}`).focus();
  //   }
  //   setotpString(newOTPValues.join(""));
  //   console.log(otpString);
  // };



  // -----------------------------------------------------------------------
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [pass, setPass] = useState();
  // console.log(name, email, pass);

  const handleSubmit = async (event) => {
    event.preventDefault();
    register(name, email, pass).then((data) => {
      if (data.code === 201) {
        console.log(data);
      setShowOTPCode(true);
      setShowUserRegisterForm(false);

      sessionStorage.setItem(
        "activationToken",
        JSON.stringify(data.data.activationToken)
      );
      setTimeout(() => {
        sessionStorage.removeItem("activationToken");
      }, 5 * 60 * 1000);
      }
      else console.log("tk da ton tai");
      
    });
  };
  // console.log(otpValues);
  const navigate = useNavigate();
// console.log(otpString);
  const handleSubmitOTP = async (event) => {
    event.preventDefault();
    const activationToken = sessionStorage.getItem("activationToken");
    const stringWithoutQuotes = activationToken.replace(/^"(.*)"$/, "$1");
    console.log(otpString, stringWithoutQuotes);
    activateUser(otpString, stringWithoutQuotes).then((data) => {
      if (data.code == 201) {
        navigate("/login");
        console.log(data);
        console.log("đk thành công");
      } else console.log("sai otp");
    });
  };

  return (
    <div>
      <section className="login-section">
        <div className="login-content-box">
          <h2>Tạo tài khoản!</h2>
          <p className="login-content-box-subheading">
            Để khám phá chi tiết các tính năng của sinh viên, chỉ cần nhấp vào
            'Đăng ký làm sinh viên'. Ngoài ra, hãy nhấp vào 'Đăng ký làm người
            hướng dẫn' để khám phá khía cạnh của người hướng dẫn.
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
              <i class="fa-solid fa-chevron-right"></i>
            </div>
          </button>
          {showUserRegisterForm && (
            <form onSubmit={handleSubmit} className="login-form">
              <h2>Học viên</h2>
              <input
                type="text"
                name=""
                placeholder="Họ và tên"
                id=""
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="email"
                name=""
                placeholder="Email"
                id=""
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                name=""
                placeholder="Mật khẩu"
                id=""
                value={pass}
                onChange={(e) => setPass(e.target.value)}
              />
              <button type="">Đăng ký</button>
              <ToastContainer />
              <p>
                Already have an account?{" "}
                <Link to="/login">
                  <a href="">Sign in</a>
                </Link>
              </p>
            </form>
          )}
          {showOTPCode && (
            <form onSubmit={handleSubmitOTP} className="otp-form">
              <h2>Mã xác thực</h2>
              <p>Please enter the code we just sent to email</p>
              <div>{email}</div>
              {/* <div className="otp-input-box">
                {otpValues.map((value, index) => (
                  <input
                    className="otp-input"
                    key={index}
                    id={`otpInput${index}`}
                    type="text"
                    placeholder="-"
                    maxLength={1}
                    value={value}
                    onChange={(event) => handleChange(index, event)}
                  />
                ))}
              </div> */}
              <input type="text" onChange={(e)=>setotpString(e.target.value)} />
              <div style={{ color: "blue" }} onClick={handleSubmit}>
                Resend code
              </div>
              <button type="">Đăng ký</button>
            </form>
          )}
          <button
            className="login-content-box-button"
            onClick={handleInstructorRegisterClick}
          >
            <div className="login-content-box-button-name">
              <img
                src="https://demo.themeum.com/tutor/wp-content/uploads/2022/02/tutor-live-demo-instructor-icon.svg"
                alt=""
              />
              <p>
                Register as a <span>Instructor</span>
              </p>
            </div>
            <div className="login-content-box-button-arrow">
              <i class="fa-solid fa-chevron-right"></i>
            </div>
          </button>
          {showInstructorRegisterForm && (
            <div className="login-form">
              <h2>Instructor</h2>
              <input type="text" name="" placeholder="Enter your name" id="" />
              <input
                type="email"
                name=""
                placeholder="Enter your email"
                id=""
              />
              <input
                type="password"
                name=""
                placeholder="Enter your password"
                id=""
              />
              <button>Sign Up</button>
              <p>
                Already have an account?{" "}
                <Link to="/login">
                  <a href="">Sign in</a>
                </Link>
              </p>
            </div>
          )}
        </div>
        <div className="login-slide-box"></div>
      </section>
    </div>
  );
}
