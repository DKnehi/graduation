import React, { useEffect, useState } from "react";
import CourseCard from "../Courses/CourseCard";
import { Course, Info } from "../../api";
import { message } from "antd";

export default function () {
  const [dataTeacher, setdataTeacher] = useState(null);
  const [dataCourse, setdataCourse] = useState({});

  useEffect(() => {
    const currentPath = window.location.pathname;
    const id = currentPath.split("/").pop();
    getDataTeacher(id);
    getCourseByTeacher(id, 1);
  }, []);
  const getDataTeacher = (id) => {
    Info.teacher(id)
      .then((response) => {
        setdataTeacher(response?.data?.data);
      })
      .catch((error) => {
        console.error(error);
        message.error("Get lỗi");
      });
  };
  const getCourseByTeacher = (id, page) => {
    Course.byTeacher(id, page)
      .then((response) => {
        // console.log(response?.data?.data);
        setdataCourse(response?.data?.data);
      })
      .catch((error) => {
        console.error(error);
        message.error("Get lỗi");
      });
  };
  console.log(dataTeacher);

  return (
    <div>
      <section className="instructor-section">
        <div className="instructor-section-headingbox">
          <div className="instructor-section-info-box">
            <div className="instructor-section-info-box2">
              <div className="info-box-avatar">
                <img
                  className="info-box-avatar-image"
                  src={
                    dataTeacher?.findTeacher?.user_avatar
                      ? dataTeacher?.findTeacher?.user_avatar
                      : "https://demo.themeum.com/tutor/wp-content/uploads/2022/02/Avatar-5.jpg"
                  }
                  alt=""
                />
              </div>
              <div className="info-box-name">
                <h1 className="info-box-name-heading">
                  {dataTeacher?.findTeacher?.user_name}
                </h1>
                <p className="info-box-name-subheading">
                  {dataTeacher?.total_stuent} Khóa học •{" "}
                  {dataTeacher?.number_course} Học viên
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="instructor-section-list-card">
          <h2 className="instructor-section-list-card-heading">
            Thông tin giảng viên
          </h2>
          <p className="instructor-section-list-card-subheading">
            {dataTeacher?.findTeacher?.user_about}
          </p>
          <h2 className="instructor-section-list-card-heading">Kinh nghiệm</h2>
          {dataTeacher?.findTeacher?.user_experience.map((item) => (
            <p className="instructor-section-list-card-subheading">
              {item?.company}
              <br />
              {item?.title}
              <br />
              {item?.description}
              <br />
            </p>
          ))}

          <h2 className="instructor-section-list-card-heading">Course</h2>
          <div className="instructor-section-list-card2">
            {dataCourse.length > 0 ? (
              <div className="course-section-content-list-card">
                {dataCourse.map((item) => (
                  <CourseCard key={item?._id} data={item} />
                ))}
              </div>
            ) : (
              <div>Không có khóa học</div>
            )}
            {/* <CourseCard data={dataCourse}></CourseCard> */}
          </div>
        </div>
      </section>
    </div>
  );
}
