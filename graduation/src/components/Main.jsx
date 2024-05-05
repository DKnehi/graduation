import { Button } from "antd";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Main() {
  const navigate = useNavigate();
  const handelClickStart = () => {
    navigate("/course");
  };
  return (
    <div>
      <main className="main">
        <div className="main-heading-box">
          <h1 className="main-heading">
            Bắt Đầu Hành Trình Học Bằng{" "}
            <span className="main-subheading">K26Demy</span>
          </h1>
        </div>
        <img
          className="main-image"
          src="https://demo.themeum.com/tutor/wp-content/uploads/2022/02/tutor-live-demo-course-background.png"
          alt=""
        />
        <div className="overlay-content">
          <h1 className="overlay-heading">Khám Phá Ngay!!!</h1>
          <Button
            onClick={handelClickStart}
            style={{ margin: "1rem 1.5rem", width: "60%", fontWeight: "400" }}
            size="large"
            type="primary"
          >
            Bắt Đầu
          </Button>
        </div>
      </main>
      <section className="new-height-section">
        <div className="new-height-section-list-card">
          <div className="new-height-section-card">
            <img
              src="https://demo.themeum.com/tutor/wp-content/uploads/2022/02/tutor-live-demo-feature1.jpg"
              alt=""
            />
            <h3 className="new-height-section-card-heading">Đa nền tảng</h3>
            <p className="new-height-section-card-subheading">
              Đảm bảo người dùng có thể truy cập ứng dụng từ bất kì thiết bị
              nào.
            </p>
          </div>
          <div className="new-height-section-card">
            <img
              src="https://demo.themeum.com/tutor/wp-content/uploads/2022/02/tutor-live-demo-feature2.jpg"
              alt=""
            />
            <h3 className="new-height-section-card-heading">Nhiều sự hỗ trợ</h3>
            <p className="new-height-section-card-subheading">
              Người dùng có thể nhận được sự hỗ trợ từ cộng đồng.
            </p>
          </div>
          <div className="new-height-section-card">
            <img
              src="https://demo.themeum.com/tutor/wp-content/uploads/2022/02/tutor-live-demo-feature3.jpg"
              alt=""
            />
            <h3 className="new-height-section-card-heading">Thống kê</h3>
            <p className="new-height-section-card-subheading">
              Dễ dàng theo dõi mọi thứ.
            </p>
          </div>
        </div>
      </section>
      <section className="elearning-section">
        <div className="elearning-section-content-box">
          <h2 className="elearning-section-content-box-heading">50,000+</h2>
          <h3 className="elearning-section-content-box-subheading">
            Người đã dùng nền tảng K26Demy!
          </h3>
          <img
            className="elearning-section-content-box-image"
            src="https://demo.themeum.com/tutor/wp-content/uploads/2022/03/tutor-live-demo-carousel-dashboard.png"
            alt=""
          />
        </div>
      </section>
    </div>
  );
}
