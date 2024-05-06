import React, { useEffect, useState } from "react";
import EnrolledCourseCard from "./EnrolledCourseCard";
import CourseCard from "../Courses/CourseCard";
import { getDataLocal } from "../../utils/getLocalStorage";

import { Empty, message } from "antd";
import { Course } from "../../api";
export default function EnrolledCourse() {
  useEffect(() => {
    const infoUser = getDataLocal("userInfo");
    const id = infoUser?._id;
    if (infoUser?.user_role === "teacher") {
      getCourseByTeacher(id, 1);
    } else {
      getCourseByUser();
    }
  }, []);

  const [dataCourse, setdataCourse] = useState([]);

  const getCourseByUser = () => {
    Course.userEnrolled()
      .then((response) => {
        // console.log(response?.data?.data);
        setdataCourse(response?.data?.data?.user_course);
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

  // console.log(dataCourse);
  return (
    <div>
      <h2
        style={{
          fontSize: "26px",
          fontWeight: "500",
          color: "var(--color-second)",
          marginBottom: "30px",
        }}
      ></h2>
      {dataCourse && dataCourse?.length == 0 && (
        <div className="course-section-content-none">
          <Empty description={false} />
          <p>Không có khóa học!</p>
        </div>
      )}

      <div className="enrolled-course-list-card">
        {dataCourse?.map((item) => (
          <CourseCard key={item?._id} data={item} />
        ))}
      </div>
    </div>
  );
}
