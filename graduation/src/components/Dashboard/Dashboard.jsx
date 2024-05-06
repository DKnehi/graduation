import React, { useState } from "react";
import ComponentDashboard from "./ComponentDashboard";
import MyProfile from "./MyProfile";
import EnrolledCourse from "./EnrolledCourse";
import EnrolledCourseCard from "./EnrolledCourseCard";
import { Link } from "react-router-dom";
import { getDataLocal } from "../../utils/getLocalStorage";
export default function Dashboard() {
  const [activeButton, setActiveButton] = useState(1); // State để lưu trữ button đang được chọn

  const handleButtonClick = (buttonId) => {
    setActiveButton(buttonId); // Đặt button được chọn là button với ID tương ứng
  };
  const checkRole = getDataLocal("userInfo");
  // console.log(checkRole);
  return (
    <div className="dashboard">
      {checkRole?.user_role === "teacher" && (
        <div className="dashboard-heading-content">
          <div>
            <Link to="/createcourse">
              <button className="create-course-btn">
                <i class="fa-solid fa-square-plus"></i>
                Tạo khóa học
              </button>
            </Link>
          </div>
        </div>
      )}

      <section className="dashboard-section">
        <div className="dashboard-list-menu">
          {/* Button 1 */}
          {checkRole?.user_role === "teacher" && (
            <button
              onClick={() => handleButtonClick(1)}
              className={activeButton === 1 ? "activeButton" : ""}
            >
              <i class="fa-solid fa-gauge-high"></i>
              Thống kê
            </button>
          )}
          <button
            onClick={() => handleButtonClick(2)}
            className={activeButton === 2 ? "activeButton" : ""}
          >
            <i class="fa-solid fa-user"></i>
            Thông tin tài khoản
          </button>
          <button
            onClick={() => handleButtonClick(3)}
            className={activeButton === 3 ? "activeButton" : ""}
          >
            <i class="fa-solid fa-graduation-cap"></i>
            Khóa học của tôi
          </button>
        </div>
        <div className="dashboard-list-content">
          {/* Hiển thị Component 1 nếu button 1 được chọn */}
          {activeButton === 1 && <ComponentDashboard />}
          {activeButton === 2 && <MyProfile />}
          {activeButton === 3 && <EnrolledCourse />}
        </div>
      </section>
    </div>
  );
}
