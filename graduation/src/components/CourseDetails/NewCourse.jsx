import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getOneCourse } from "../../api";
import findTypeCourse from "../../utils/findTypeCourse";
import { useStateValue } from "../../Context/StateProvider";
import ReactPlayer from "react-player";
import { convertToTime } from "../../utils/convertToTime";
import CourseInfo from "./CourseInfo";
import Review from "./Review";
export default function () {
  const [{ typeCourse, idCourseCard }, dispatch] = useStateValue();
  console.log('====================================');
  console.log(idCourseCard);
  console.log('====================================');
  const [dataOneCourse, setdataOneCourse] = useState(null);
  useEffect(() => {
    getCourseDetails(idCourseCard);
  }, []);

  const getCourseDetails = async (idCourseCard) => {
    try {
      const courseDetails = await getOneCourse(idCourseCard);
      setdataOneCourse(courseDetails);
      // console.log("Course details:", courseDetails);
    } catch (error) {
      // console.error("Error fetching course details:", error);
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

  const [activeButton, setActiveButton] = useState(1); // State để lưu trữ button đang được chọn

  const handleButtonClick = (buttonId) => {
    setActiveButton(buttonId); // Đặt button được chọn là button với ID tương ứng
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
                height="458px"
                controls={true}
                url={dataOneCourse?.data?.course_demoVideo}
              />
            </div>
            <div className="newcourse-section-video-box-dad-content">
              <div className="newcourse-section-video-box-dad-content-heading">
                <h2
                  onClick={() => handleButtonClick(1)}
                  className={activeButton === 1 ? 'activeButtonNewCourse' : ''}
                >Course Info</h2>
                <h2
                  onClick={() => handleButtonClick(2)}
                  className={activeButton === 2 ? 'activeButtonNewCourse' : ''}
                >Reviews</h2>
              </div>
              <div style={{padding:'25px 0'}}>
                {/* Hiển thị Component 1 nếu button 1 được chọn */}
                {activeButton === 1 && <CourseInfo></CourseInfo>}
                {activeButton === 2 && <Review></Review>}
              </div>

            </div>
          </div>

          <div className="newcourse-section-slide-box">
            <div className="newcourse-section-slide-box-button-box">
              <div className="new-course-section-slide-box-button">
                <Link to={`/lesson/${idCourseCard}`}>
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
