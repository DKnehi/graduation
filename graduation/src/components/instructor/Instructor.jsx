import React, { useEffect, useState } from "react";
import CourseCard from "../Courses/CourseCard";
import { Course, Info } from "../../api";
import { Avatar, Empty, message } from "antd";
import { UserOutlined } from "@ant-design/icons";

export default function () {
  const [dataTeacher, setdataTeacher] = useState(null);
  const [dataCourse, setdataCourse] = useState({});
  const id = localStorage.getItem("idInstructor");
  // console.log(id);
  useEffect(() => {
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
              <div>
                <Avatar
                  style={{ border: "8px solid white" }}
                  icon={<UserOutlined />}
                  src={
                    dataTeacher?.teacher_infor?.user_avatar
                      ? dataTeacher?.teacher_infor?.user_avatar
                      : null
                  }
                  size={200}
                />
              </div>
              <div className="info-box-name">
                <h1 className="info-box-name-heading">
                  {dataTeacher?.teacher_infor?.user_name}
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
            Giới thiệu về giảng viên
          </h2>
          <p className="instructor-section-list-card-subheading">
            {dataTeacher?.teacher_infor?.user_about}
          </p>
          <h2 className="instructor-section-list-card-heading">Kinh nghiệm</h2>
          {dataTeacher?.teacher_infor?.user_experience.map((item) => (
            <p className="instructor-section-list-card-subheading">
              <span style={{ color: "grey" }}>Công ty: </span> {item?.company}
              <br />
              <span style={{ color: "grey" }}>Vị trí: </span>
              {item?.title}
              <br />
              <span style={{ color: "grey" }}>Mô tả:</span> {item?.description}
              <br />
            </p>
          ))}
          <h2 className="instructor-section-list-card-heading">Course</h2>
          <div className="instructor-section-list-card2">
            {dataCourse.length > 0 && (
              <div className="course-section-content-list-card">
                {dataCourse.map((item) => (
                  <CourseCard key={item?._id} data={item} />
                ))}
              </div>
            )}
            {/* <CourseCard data={dataCourse}></CourseCard> */}
          </div>
          {dataCourse && dataCourse?.length == 0 && (
            <div className="course-section-content-none">
              <Empty description={false} />
              <p>Không có khóa học!</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
