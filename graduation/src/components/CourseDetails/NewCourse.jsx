import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getOneCourse } from "../../api";
import findTypeCourse from "../../utils/findTypeCourse";
import { useStateValue } from "../../Context/StateProvider";
import ReactPlayer from "react-player";
import { convertToTime } from "../../utils/convertToTime";
export default function () {
  const [idOneCourse, setidOneCourse] = useState("65d89f2602fed4ae3c6d5375");
  const [{ typeCourse }, dispatch] = useStateValue();
  const [dataOneCourse, setdataOneCourse] = useState(null);
  useEffect(() => {
    getCourseDetails(idOneCourse);
  }, []);

  const getCourseDetails = async (idOneCourse) => {
    try {
      const courseDetails = await getOneCourse(idOneCourse);
      setdataOneCourse(courseDetails);
      console.log("Course details:", courseDetails);
    } catch (error) {
      console.error("Error fetching course details:", error);
    }
  };

  const [openSections, setOpenSections] = useState({});
  const handleSectionClick = (sectionId) => {
    setOpenSections((prevOpenSections) => ({
      ...prevOpenSections,
      [sectionId]: !prevOpenSections[sectionId],
    }));
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
  return (
    <div>
      <section className="newcourse-section">
        <div className="newcourse-section-headingbox">
          <div className="newcourse-section-headingbox-star-group">
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
          </div>
          <h2 className="newcourse-section-heading">
            {dataOneCourse?.data?.course_name}
          </h2>
        </div>
        <div className="newcourse-section-subheadingbox">
          <div className="newcourse-section-avatarbox">
            <div className="newcourse-section-avatar">
              <img
                className="newcourse-section-avatar"
                src="https://demo.themeum.com/tutor/wp-content/uploads/2023/12/60156-97afaf0b623337083cae6212e6a76a46.jpg"
                alt=""
              />
            </div>
            <p>Khóa học của</p>
            <a href="">James Aston</a>
            <p>
              {findTypeCourse(typeCourse, dataOneCourse?.data?.course_type)}
            </p>
          </div>
          <div className="newcourse-section-sharebox">
            <div className="newcourse-section-share">
              <i class="fa-regular fa-bookmark"></i>
              <p>Whilelist</p>
            </div>
            <div className="newcourse-section-share">
              <i class="fa-solid fa-share"></i>
              <p>Share</p>
            </div>
          </div>
        </div>
        <div className="newcourse-section-video-content">
          <div className="newcourse-section-video-box-dad">
            <div className="newcourse-section-video-box">
              <ReactPlayer
                width="100%"
                height="100%"
                controls={true}
                url={dataOneCourse?.data?.course_demoVideo}
              />
            </div>
            <div className="newcourse-section-video-box-dad-content">
              <div className="newcourse-section-video-box-dad-content-heading">
                <h2>Course Info</h2>
                <h2>Reviews</h2>
              </div>
              {/* <div className="newcourse-section-video-box-dad-content-main">
                <h2>Về khóa học</h2>
                <p>{dataOneCourse?.data?.course_description}</p>
                <h2>Nội dung khóa học</h2>
                <div className="newcourse-section-video-box-dad-content-main-button-box">
                  <button className="newcourse-section-video-box-dad-content-main-button">
                    topic 1<i class="fa-solid fa-chevron-right"></i>
                  </button>
                </div>
                <div className="newcourse-section-video-box-dad-content-main-button-box">
                  <button className="newcourse-section-video-box-dad-content-main-button">
                    topic 2<i class="fa-solid fa-chevron-right"></i>
                  </button>
                </div>
              </div> */}
              <div className="section-container-video-footer-subheader">
                <h6>Về khóa học</h6>
                <p>{dataOneCourse?.data?.course_description}</p>
                <h6>Bạn sẽ học gì?</h6>
                <ul>
                  {dataOneCourse?.data?.course_lessonContent.map((content, index) => (
                    <li key={index}>{content}</li>
                  ))}
                </ul>
              </div>

              <div className="section-container-video-footer-course-content">
                <h6>Nội dung khóa học</h6>
                {/* card content course */}
                {dataOneCourse?.data?.courseData.map((item) => (
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
                        {item.courseDataVideo.map((content) => (
                          <div
                            key={content?._id}
                            className="section-container-video-footer-course-second-content-array-arrl"
                          >
                            {/* {console.log(content._id)} */}
                            <div className="section-container-video-footer-course-second-content-array-arrl-logo">
                              <i class="fa-brands fa-youtube"></i>
                              <a href="">{content.video_title}</a>
                              {/* {console.log(content.courseData_title)} */}
                            </div>
                            <div className="section-container-video-footer-course-second-content-array-arrl-eye">
                              <p>{convertToTime(content.video_length)}</p>
                              <i class="fa-regular fa-eye"></i>
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

          <div className="newcourse-section-slide-box">
            <div className="newcourse-section-slide-box-button-box">
              <div className="new-course-section-slide-box-button">
                <Link to="/lesson">
                  <button>Bắt đầu học </button>
                </Link>
              </div>
              <div className="newcourse-section-slide-box-content-box">
                <div className="newcourse-section-ranking">
                  <i class="fa-solid fa-chart-simple"></i>
                  <p>Intermediate</p>
                </div>
                <div className="newcourse-section-ranking">
                  <i class="fa-solid fa-graduation-cap"></i>
                  <p>0 Total Enrolled</p>
                </div>
                <div className="newcourse-section-ranking">
                  <i class="fa-solid fa-arrows-rotate"></i>
                  <p>March 22, 2024 Last Updated</p>
                </div>
                <div className="newcourse-section-ranking">
                  <i class="fa-solid fa-stamp"></i>
                  <p>Certificate of completion</p>
                </div>
              </div>
            </div>
            <div className="newcourse-section-slide-box-avatar-box">
              <h2 className="newcourse-section-slide-box-avatar-box-heading">
                A course by
              </h2>
              <div className="newcourse-section-slide-box-avatar-2">
                <div className="newcourse-section-slide-box-avatar">
                  <img
                    className="newcourse-section-slide-box-avatar"
                    src="https://demo.themeum.com/tutor/wp-content/uploads/2023/12/60156-97afaf0b623337083cae6212e6a76a46.jpg"
                    alt=""
                  />
                </div>
                <div>
                  <h2>James Aston</h2>
                  <p>Desain grafis</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
