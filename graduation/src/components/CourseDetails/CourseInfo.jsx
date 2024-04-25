import React, { useState } from "react";
import { LuDot } from "react-icons/lu";
import { Card, Collapse, List, Menu } from "antd";
import { convertToTime } from "../../utils/convertToTime";
import { FaNoteSticky } from "react-icons/fa6";
import { IoVideocam, IoEyeSharp } from "react-icons/io5";
const { Panel } = Collapse;

export default function CourseInfo(data) {

  const [isVisible, setIsVisible] = useState(false);

  const handleButtonClick = () => {
    setIsVisible(!isVisible); // Đảo ngược trạng thái isVisible
  };

  const [isOpenContentCourse, setisOpenContentCourse] = useState(false);
  const [selectedItemId, setselectedItemId] = useState(null);
  const handleButtonCCClick = (itemId) => {
    if (selectedItemId === itemId) {
      setisOpenContentCourse(!isOpenContentCourse);
    } else {
      setisOpenContentCourse(true);
    }
    setselectedItemId(itemId);
  };

  const [openSections, setOpenSections] = useState({});
  const handleSectionClick = (sectionId) => {
    setOpenSections((prevOpenSections) => ({
      ...prevOpenSections,
      [sectionId]: !prevOpenSections[sectionId],
    }));
  };

  return (
    <div>
      <div className="newcourse-section-video-box-dad-content-main">
        <h2>Mô tả khóa học</h2>
        <p style={{ margin: "1rem" }}>{data?.data?.course_description}</p>

        <h2 style={{ marginTop: "25px" }}>Lợi ích của khóa học</h2>
        {data?.data?.course_benefits.map((item) => {
          return (
            <p style={{ margin: "1rem" }}>
              <LuDot />
              {item}
            </p>
          );
        })}
        <h2 style={{ marginTop: "25px" }}>Nội dung khóa học</h2>
        {data?.data?.course_lessonContent.map((item) => {
          return (
            <p style={{ margin: "1rem" }}>
              <LuDot />
              {item}
            </p>
          );
        })}

        {/* nội dung khóa học bên dưới */}
        <div className="section-container-video-footer-course-content">
          <h6>Nội dung khóa học</h6>
          {/* card content course */}
          {data?.data?.course_data.map((item) => (
            <div key={item?._id}>
              <div
                onClick={() => handleSectionClick(item?._id)}
                className="section-container-video-footer-course-content-array"
              >
                {/* {console.log(item?._id)} */}
                {item?.courseData_title}
                <i
                  className={`fa-solid fa-chevron-${
                    isOpenContentCourse && selectedItemId === item?._id
                      ? "down"
                      : "right"
                  }`}
                ></i>
              </div>
              {openSections[item?._id] && (
                <div className="section-container-video-footer-course-second-content-array">
                  {item?.course_data_video?.course_video?.map((content) => (
                    <div
                      key={content?._id}
                      className="section-container-video-footer-course-second-content-array-arrl"
                    >
                      {/* {console.log(content._id)} */}
                      <div className="section-container-video-footer-course-second-content-array-arrl-logo">
                        <IoVideocam />
                        <div style={{ margin: "0 1rem" }}>
                          {content.video_title}
                        </div>
                        {/* {console.log(content.courseData_title)} */}
                      </div>
                      <div className="section-container-video-footer-course-second-content-array-arrl-eye">
                        <div style={{ padding: "0 0.5rem" }}>
                          {convertToTime(content.video_length)}
                        </div>
                        <IoEyeSharp />
                      </div>
                    </div>
                  ))}
                  {item?.course_data_quiz?.map((content) => (
                    <div
                      key={content?._id}
                      className="section-container-video-footer-course-second-content-array-arrl"
                    >
                      {/* {console.log(content._id)} */}
                      <div className="section-container-video-footer-course-second-content-array-arrl-logo">
                        <FaNoteSticky />
                        <div style={{ margin: "0 1rem" }}>
                          {content.quiz_Tile}
                        </div>
                        {/* {console.log(content.courseData_title)} */}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
