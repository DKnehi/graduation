import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
export default function Header() {
  const [isHovered, setIsHovered] = useState(false);
  const [stateLogin, setstateLogin] = useState(false);
  const [dataUser, setDataUser] = useState(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  useEffect(() => {
    const jsonString = localStorage.getItem("user");
    if (jsonString) {
      const parsedDataUser = JSON.parse(jsonString);
      setDataUser(parsedDataUser);
      setstateLogin(true);
    }
  }, []);
//   console.log(dataUser);
  return (
    <div>
      <header className="header">
        <Link to="/" className="header-logo">
          <img
            src="https://demo.themeum.com/tutor/wp-content/uploads/2022/02/tutor-live-demo-logo.svg"
            alt=""
          />
        </Link>
        <nav className="nav-bar">
          <div className="buger">
            <div className="buger-icon buger-icon1"></div>
            <div className="buger-icon buger-icon2"></div>
            <div className="buger-icon buger-icon3"></div>
          </div>
          <div className="menu">
            <i class="fa-solid fa-magnifying-glass"></i>
            <input
              type="text"
              placeholder="Tìm kiếm khóa học, bài viết, video,..."
              name=""
              id=""
            />
          </div>
        </nav>
        {stateLogin ? (
          <div
            className="header-avatar-box"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* <div className="header-avatar"> */}
            <div className="">
              <img
                src={
                  dataUser?.metaData?.avatar
                    ? dataUser?.metaData?.avatar
                    : "https://demo.themeum.com/tutor/wp-content/themes/tutorstarter/assets/dist/images/tutor-submenu-login-avatar.svg"
                }
                alt=""
              />
            </div>
            <p className="header-avatar-hello">Hello</p>
            <p>{dataUser?.metaData?.user_name}</p>
            {isHovered && (
              <div className="hovered-content">
                <div className="hovered-content-login">
                  <img
                    src={
                      dataUser?.metaData?.avatar
                        ? dataUser?.metaData?.avatar
                        : "https://demo.themeum.com/tutor/wp-content/themes/tutorstarter/assets/dist/images/tutor-submenu-login-avatar.svg"
                    }
                    alt=""
                  />

                  <Link to={"/login"}>
                    <h2>
                      Login as a <span>Student</span>
                    </h2>
                  </Link>

                  <button>
                    <i class="fa-solid fa-chevron-right"></i>
                  </button>
                </div>
                <div className="hovered-content-menu1">
                  <ul className="hovered-content-menu1-list">
                    <li>
                      <a href="">Dashboard</a>
                    </li>
                    <li>
                      <a href="">My Profile</a>
                    </li>
                    <li>
                      <a href="">Enrolled Courses</a>
                    </li>
                    <li>
                      <a href="">Wishlist</a>
                    </li>
                    <li>
                      <a href="">Reviews</a>
                    </li>
                    <li>
                      <a href="">My Quiz Attempts</a>
                    </li>
                    <li>
                      <a href="">Order History</a>
                    </li>
                    <li>
                      <a href="">Question & Answer</a>
                    </li>
                    <li>
                      <a href="">Calendar</a>
                    </li>
                  </ul>
                </div>
                <div className="hovered-content-menu1">
                  <ul className="hovered-content-menu1-list">
                    <li>
                      <a href="">My Courses</a>
                    </li>
                    <li>
                      <a href="">My Bundles</a>
                    </li>
                    <li>
                      <a href="">Announcements</a>
                    </li>
                    <li>
                      <a href="">Withdrawals</a>
                    </li>
                    <li>
                      <a href="">Quiz Attempts</a>
                    </li>
                    <li>
                      <a href="">Assignments</a>
                    </li>
                    <li>
                      <a href="">Certificate</a>
                    </li>
                    <li>
                      <a href="">Analytics</a>
                    </li>
                    <li>
                      <a href="">Settings</a>
                    </li>
                    <li>
                      <a href="">Logout</a>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="header-login-click">
            <Link to="/login">Đăng nhập</Link>
          </div>
        )}
      </header>
    </div>
  );
