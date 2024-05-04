import React, { useEffect, useState } from "react";
import EnrolledCourseCard from "./EnrolledCourseCard";
import CourseCard from "../Courses/CourseCard";
import { getDataLocal } from "../../utils/getLocalStorage";

import { message } from "antd";
import { Course } from "../../api";
export default function EnrolledCourse() {
  useEffect(() => {
    getCourseByUser();
  }, [])  
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
  console.log(dataCourse);
  return (
    <div>
      <h2
        style={{
          fontSize: "26px",
          fontWeight: "500",
          color: "var(--color-second)",
          marginBottom: "30px",
        }}
      >
        Enrolled Courses
      </h2>
      <div className="enrolled-course-list-card">
        {dataCourse?.map((item) => (
          <CourseCard key={item?._id} data={item} />
        ))}
      </div>
    </div>
  );
}
