import React from "react";
import CourseCard from "./CourseCard";

export default function () {
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
          <div className="course-section-content-list-card">
            <CourseCard></CourseCard>
            <CourseCard></CourseCard>
            <CourseCard></CourseCard>
          </div>
        </div>
      </section>
    </div>
  );
}
