import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  cart,
  CreateCourseData,
  getInfo,
  getInfoTeacher,
  getOneCourse,
  getOneCourseMember,
} from "../../api";
import findTypeCourse from "../../utils/findTypeCourse";
import { useStateValue } from "../../Context/StateProvider";
import ReactPlayer from "react-player";
import { convertToTime } from "../../utils/convertToTime";
import CourseInfo from "./CourseInfo";
import Review from "./Review/Review";
import { Avatar, Button, message, Rate } from "antd";
import { FaMoneyCheckDollar, FaGraduationCap, FaClock } from "react-icons/fa6";
import { actionType } from "../../Context/reducer";
import { UserOutlined } from "@ant-design/icons";

export default function CourseDetail() {
  const [{ typeCourse, dataCourseLearn }, dispatch] = useStateValue();
  const jsonString = localStorage.getItem("user");
  const user = JSON.parse(jsonString);

  const [dataOneCourse, setdataOneCourse] = useState(null);
  const [dataTeacher, setdataTeacher] = useState(null);

  const [reloadData, setReloadData] = useState(false);
  const handleReloadData = () => {
    setReloadData(!reloadData);
  };
  // console.log(dataOneCourse?.data?.course_ratingsAverage);
  const storedIdCourseCard = localStorage.getItem("idCourseCard");
  const initialIdCourseCard = storedIdCourseCard
    ? storedIdCourseCard
    : "65d89f2602fed4ae3c6d5375";

  useEffect(() => {
    const fetchData = async () => {
      if (jsonString) {
        await getCourseDetailsMember(initialIdCourseCard);
      } else {
        await getCourseDetailsGuest(initialIdCourseCard);
      }
    };
    fetchData();
  }, [reloadData]);
  useEffect(() => {
    if (dataOneCourse) {
      getDataTeacher();
      checkVideoUrl(dataOneCourse);
    }
  }, [dataOneCourse]);
  const getDataTeacher = async () => {
    try {
      const data = await getInfoTeacher(dataOneCourse?.data?.user_teacher);
      setdataTeacher(data.data.data);
    } catch (error) {
      console.error("Error fetching course details:", error);
    }
  };
  const getCourseDetailsMember = async (idCourseCard) => {
    try {
      const courseDetails = await getOneCourseMember(idCourseCard);
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

  const [hasVideoUrl, setHasVideoUrl] = useState(false);
  const checkVideoUrl = () => {
    if (
      dataOneCourse?.data?.course_data[0]?.course_data_video?.course_video[0]?.hasOwnProperty(
        "video_url"
      )
    ) {
      setHasVideoUrl(true);
    } else {
      setHasVideoUrl(false);
    }
  };
  console.log(dataOneCourse);
  const dataCourse = dataOneCourse?.data;

  const handelAddCart = (id) => {
    cart
      .addCart(id)
      .then((data) => {
        console.log(data);
        message.success("giỏ hàng!");
      })
      .catch((error) => {
        console.error(error);
        message.error("Lỗi giỏ hàng!");
      });
  };
  console.log(dataTeacher);
  return (
    <div>
      <section className="newcourse-section">
        <div className="newcourse-section-headingbox">
          <Rate
            disabled
            allowHalf
            value={dataOneCourse?.data?.course_ratingsAverage}
          />
          <h2 className="newcourse-section-heading">
            {dataOneCourse?.data?.course_name}
          </h2>
        </div>
        <div className="newcourse-section-subheadingbox">
          <div className="newcourse-section-avatarbox">
            <Avatar
              icon={<UserOutlined />}
              src={dataTeacher?.teacher_infor?.user_avatar || null}
              size={50}
            />
            <p style={{ marginLeft: "16px" }}>Khóa học của</p>
            <Link
              style={{
                marginLeft: "8px",
                fontSize: "16px",
                fontWeight: "bold",
                color: "black",
              }}
              to={`/instructor`}
            >
              {dataTeacher?.teacher_infor?.user_name}
            </Link>
            {/* <div className="newcourse-section-avatar">
              <img
                className="newcourse-section-avatar"
                src={dataTeacher?.findTeacher?.user_avatar}
                alt=""
              />
            </div> */}

            <p>Thể loại: {dataOneCourse?.data?.course_type?.type_name}</p>
          </div>
        </div>
        <div className="newcourse-section-video-content">
          <div className="newcourse-section-video-box-dad">
            <div className="newcourse-section-video-box">
              <ReactPlayer
                width={"100%"}
                height={"600px"}
                controls={true}
                url={dataOneCourse?.data?.course_demoVideo}
                light={dataOneCourse?.data?.course_thumnail}
              />
            </div>
            <div className="newcourse-section-video-box-dad-content">
              <div className="newcourse-section-video-box-dad-content-heading">
                <h3
                  onClick={() => handleButtonClick(1)}
                  className={activeButton === 1 ? "activeButtonNewCourse" : ""}
                >
                  Chi tiết
                </h3>
                <h3
                  onClick={() => handleButtonClick(2)}
                  className={activeButton === 2 ? "activeButtonNewCourse" : ""}
                >
                  Đánh giá
                </h3>
              </div>
              <div style={{ padding: "25px 0" }}>
                {activeButton === 1 && (
                  <CourseInfo
                    data={dataCourse}
                    handleReload={handleReloadData}
                  />
                )}
                {activeButton === 2 && (
                  <Review
                    idCourse={dataOneCourse?.data?._id}
                    isUserReview={dataOneCourse?.data?.is_user_review}
                  />
                )}
              </div>
            </div>
          </div>

          <div className="newcourse-section-slide-box">
            <div className="newcourse-section-slide-box-button-box">
              <div className="new-course-section-slide-box-button">
                {hasVideoUrl ? (
                  <Link to={`/lesson/`}>
                    <Button type="primary">Bắt đầu học </Button>
                  </Link>
                ) : (
                  <Button
                    onClick={() => handelAddCart(initialIdCourseCard)}
                    type="primary"
                    style={{fontWeight:'300'}}
                  >
                    Thêm vào danh sách chờ
                  </Button>
                )}
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
              </div>
            </div>
            {/* <div className="newcourse-section-slide-box-avatar-box">
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
                  <h2>{dataTeacher?.findTeacher?.user_name}</h2>
                  <p>Desain grafis</p>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </section>
    </div>
  );
}
