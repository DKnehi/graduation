import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getOneCourse, getOneCourseMember } from "../../api";
import findTypeCourse from "../../utils/findTypeCourse";
import { useStateValue } from "../../Context/StateProvider";
import ReactPlayer from "react-player";
import { convertToTime } from "../../utils/convertToTime";
import CourseInfo from "./CourseInfo";
import Review from "./Review/Review";
import { Button, Rate } from "antd";
import { FaMoneyCheckDollar, FaGraduationCap, FaClock } from "react-icons/fa6";
export default function CourseDetail() {
  const [{ typeCourse }, dispatch] = useStateValue();
  const jsonString = localStorage.getItem("user");
  const user = JSON.parse(jsonString);

  const [dataOneCourse, setdataOneCourse] = useState(null);
  // console.log(dataOneCourse?.data?.course_ratingsAverage);
  useEffect(() => {
    const storedIdCourseCard = localStorage.getItem("idCourseCard");
    const initialIdCourseCard = storedIdCourseCard
      ? storedIdCourseCard
      : "65d89f2602fed4ae3c6d5375";

    if (jsonString) {
      getCourseDetailsMember(initialIdCourseCard);
    } else {
      getCourseDetailsGuest(initialIdCourseCard);
    }
  }, []);
  // console.log(dataOneCourse);
  const getCourseDetailsMember = async (idCourseCard) => {
    const accessToken = user?.accessToken;
    const idUser = user?.metaData?._id;
    // console.log(accessToken, idUser);
    try {
      const courseDetails = await getOneCourseMember(
        idCourseCard,
        idUser,
        accessToken
      );
      setdataOneCourse(courseDetails);
    } catch (error) {
      console.error("Error fetching course details:", error);
    }
  };
  const getCourseDetailsGuest = async (idCourseCard) => {
    try {
      const courseDetails = await getOneCourse(idCourseCard);
      setdataOneCourse(courseDetails);
    } catch (error) {
      console.error("Error fetching course details:", error);
    }
  };

  const [activeButton, setActiveButton] = useState(1);

  const handleButtonClick = (buttonId) => {
    setActiveButton(buttonId);
  };

  const formatPrice = (price) => {
    if (typeof price !== "undefined" && price !== null) {
      return price.toLocaleString("vi-VN");
    }
    return "";
  };

  return (
    <div>
      <section className="newcourse-section">
        <div className="newcourse-section-headingbox">
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
              Thể loại:{" "}
              {findTypeCourse(typeCourse, dataOneCourse?.data?.course_type)}
            </p>
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
                light={dataOneCourse?.data?.course_thumnail}
              />
            </div>
            <div className="newcourse-section-video-box-dad-content">
              <div className="newcourse-section-video-box-dad-content-heading">
                <h2
                  onClick={() => handleButtonClick(1)}
                  className={activeButton === 1 ? "activeButtonNewCourse" : ""}
                >
                  Course Info
                </h2>
                <h2
                  onClick={() => handleButtonClick(2)}
                  className={activeButton === 2 ? "activeButtonNewCourse" : ""}
                >
                  Reviews
                </h2>
              </div>
              <div style={{ padding: "25px 0" }}>
                {activeButton === 1 && (
                  <CourseInfo data={dataOneCourse?.data} />
                )}
                {activeButton === 2 && (
                  <Review idCourse={dataOneCourse?.data?._id} />
                )}

              </div>
            </div>
          </div>

          <div className="newcourse-section-slide-box">
            <div className="newcourse-section-slide-box-button-box">
              <div className="new-course-section-slide-box-button">
                <Link to={`/lesson/`}>
                  <Button type="primary">Bắt đầu học </Button>
                </Link>
              </div>
              <div className="newcourse-section-slide-box-content-box">
                <div className="newcourse-section-ranking">
                  <FaMoneyCheckDollar />
                  <div>
                    {formatPrice(dataOneCourse?.data?.course_price)} VND
                  </div>
                </div>
                <div className="newcourse-section-ranking">
                  <FaGraduationCap />
                  <div>
                    {dataOneCourse?.data?.course_purchased} người đăng ký
                  </div>
                </div>
                <div className="newcourse-section-ranking">
                  <FaClock />
                  <div>
                    Tổng thời gian{" "}
                    {convertToTime(dataOneCourse?.data?.total_length_video)}
                  </div>
                </div>
                <Rate
                  disabled
                  allowHalf
                  value={dataOneCourse?.data?.course_ratingsAverage}
                />
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
