import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Avatar, Button, Dropdown, Flex, Input, Menu, Space } from "antd";
import { useStateValue } from "../Context/StateProvider";
import { actionType } from "../Context/reducer";
import { FaShoppingCart } from "react-icons/fa";
import { UserOutlined } from "@ant-design/icons";
const { Search } = Input;
export default function Header() {
  const navigate = useNavigate();
  const [stateLogin, setstateLogin] = useState(false);
  const [dataUser, setDataUser] = useState(null);
  const [{ search }, dispatch] = useStateValue();

  useEffect(() => {
    const delay = setTimeout(() => {
      const jsonString = localStorage.getItem("userInfo");
      if (jsonString) {
        const parsedDataUser = JSON.parse(jsonString);
        setDataUser(parsedDataUser);
        setstateLogin(true);
      }
    }, 200);

    return () => clearTimeout(delay);
  }, []);

  const onSearch = (value) => {
    dispatch({ type: actionType.SET_SEARCH, search: value });
    navigate(`/course`);
  };

  const handelLogout = () => {
    localStorage.clear();
    setstateLogin(false);
    navigate("/");
  };

  const handleMenuClick = ({ key }) => {
    if (key === "logout") {
      handelLogout();
    }
    if (key === "profile") {
      navigate("/dashboard");
    }
    if (key === "dashboard") {
      navigate("/dashboard");
    }
    if (key === "cart") {
      navigate("/cart");
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      {dataUser?.user_role === "teacher" && (
        <Menu.Item key="dashboard">Dashboard</Menu.Item>
      )}
      {dataUser?.user_role === "student" && (
        <Menu.Item key="cart">Danh sách chờ</Menu.Item>
      )}

      <Menu.Item key="profile">Thông tin tài khoản</Menu.Item>
      <Menu.Item key="logout">Đăng xuất</Menu.Item>
    </Menu>
  );

  const handleLogin = () => {
    navigate("/login");
  };

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
            <Search
              placeholder="Tìm kiếm khóa học, bài viết, video,..."
              allowClear
              enterButton="Tìm kiếm"
              size="large"
              onSearch={onSearch}
            />
          </div>
        </nav>
        <div style={{  width: "auto" }}>
          {stateLogin ? (
            <Dropdown overlay={menu} placement="bottomRight">
              <div>
                <Avatar
                  src={dataUser?.user_avatar ? dataUser?.user_avatar : null}
                  size={40}
                  icon={<UserOutlined />}
                  style={{ marginRight: "8px", cursor: "pointer" }}
                />

                <span
                  style={{ cursor: "pointer", color: "grey", fontSize: "1rem" }}
                >
                  Xin chào
                </span>

                <span
                  style={{
                    cursor: "pointer",
                    fontSize: "1.1rem",
                    fontWeight: "500",
                  }}
                >
                  {" "}
                  {dataUser?.user_name}
                </span>
              </div>
            </Dropdown>
          ) : (
            <Button type="primary" onClick={handleLogin} size="large">
              Đăng nhập
            </Button>
          )}
        </div>
      </header>
    </div>
  );
}
