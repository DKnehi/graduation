import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Link, useParams } from "react-router-dom";
import { getOneCourse } from "../api";
import ReactPlayer from "react-player";
export default function () {
  const { id } = useParams();
  const [dataOneCourse, setdataOneCourse] = useState(null);
  useEffect(() => {
    getCourseDetails(id);
  }, []);

  const getCourseDetails = async (id) => {
    try {
      const courseDetails = await getOneCourse(id);
      setdataOneCourse(courseDetails);
      //   console.log("Course details:", courseDetails);
    } catch (error) {
      console.error("Error fetching course details:", error);
    }
  };
  return (
    <div>
      <section className="lesson-section">
        <div className="lesson-section-headingbox-left">
          <div className="lesson-section-headingbox">
            <h2 className="lesson-section-heading">Course Content</h2>
          </div>
        </div>
        <div className="lesson-section-videobox">
          <div className="lesson-section-videobox-heading">
            <Link to="/course">
              <i class="fa-solid fa-chevron-left"></i>
            </Link>
            <h2>Video Editing</h2>
          </div>
          <div className="lesson-section-videobox-heading-out">
            <Link to="/">
              <i class="fa-solid fa-xmark"></i>
            </Link>
          </div>
        </div>
        <div className="lesson-section-video">
          <ReactPlayer
            width="100%"
            height="100%"
            controls={true}
            url={dataOneCourse?.data?.course_demoVideo}
          />
        </div>
      </section>
    </div>
  );
}
