import React, { useState } from "react";
import CourseCard from "./CourseCard";
import Pagination from '../Pagination';
export default function () {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 100; // Tổng số trang

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Thực hiện các thao tác khác khi trang thay đổi, ví dụ: fetch dữ liệu mới từ API
  };
  return (
    <div>
      <section className="course-section">
        <div className="course-section-search-find-box">
          <button className="course-section-search-find-box-button">
            <i class="fa-solid fa-magnifying-glass"></i>
            <input
              className="course-section-search-find-box-input-button"
              type="text"
              name=""
              placeholder="Search"
              id=""
            />
          </button>
          <button className="course-section-search-find-box-button find-button">
            <p>Release Date (newest first)</p>
            <i class="fa-solid fa-chevron-down"></i>
          </button>
        </div>
        <div className="course-section-content">
          <div className="course-section-content-listchecked">
            <div className="course-section-content-checked">
              <h2 className="course-section-content-checked-heading">Type</h2>
              <span className="course-section-content-checked-box">
                <input
                  className="course-section-content-checked-icon"
                  type="checkbox"
                  name=""
                  id=""
                />
                <p className="course-section-content-checked-subheading">
                  Course
                </p>
              </span>
            </div>
            <div className="course-section-content-checked">
              <h2 className="course-section-content-checked-heading">
                Category
              </h2>
              <span className="course-section-content-checked-box">
                <input
                  className="course-section-content-checked-icon"
                  type="checkbox"
                  name=""
                  id=""
                />
                <p className="course-section-content-checked-subheading">Art</p>
              </span>
            </div>
            <div className="course-section-content-checked">
              <h2 className="course-section-content-checked-heading">Level</h2>
              <span className="course-section-content-checked-box">
                <input
                  className="course-section-content-checked-icon"
                  type="checkbox"
                  name=""
                  id=""
                />
                <p className="course-section-content-checked-subheading">
                  All Levels
                </p>
              </span>
            </div>
            <div className="course-section-content-checked">
              <h2 className="course-section-content-checked-heading">Price</h2>
              <span className="course-section-content-checked-box">
                <input
                  className="course-section-content-checked-icon"
                  type="checkbox"
                  name=""
                  id=""
                />
                <p className="course-section-content-checked-subheading">
                  Free
                </p>
              </span>
            </div>
          </div>

          <div className="app-container">
            {/* Hiển thị danh sách các item trên trang */}
            <div className="item-list">
              {`Hiển thị danh sách item của trang ${currentPage}`}
              {/* Thực hiện hiển thị dữ liệu của trang tại đây */}
              <div className="course-section-content-list-card">
                <CourseCard></CourseCard>
                <CourseCard></CourseCard>
                <CourseCard></CourseCard>
              </div>
            </div>
            {/* Hiển thị component phân trang */}
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
          </div>
        </div>
      </section>
    </div>
  );
}
