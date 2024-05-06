import React from "react";
import { Card, Rate, Avatar, Button, Progress } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { FaUserEdit } from "react-icons/fa";
import { UserOutlined } from "@ant-design/icons";
const { Meta } = Card;

const CourseCard = ({ data }) => {
  const navigate = useNavigate();
  const { course_name, course_price, course_ratingsAverage, course_purchased } =
    data;
  const course_thumnail =
    data?._id?.course_thumnail ||
    data?.course_thumnail ||
    "https://demo.themeum.com/tutor/wp-content/uploads/2022/02/30.jpg";

  const handleClick = (id) => {
    localStorage.setItem("idCourseCard", id);
    navigate(`/newcourse`);
  };
  const formatPrice = (price) => {
    if (typeof price !== "undefined" && price !== null) {
      return price.toLocaleString("vi-VN");
    }
    return "";
  };

  return (
    <Card
      classNames="course-card"
      style={{
        width: 280,
        overflow: "hidden",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
      }}
      cover={
        <img
          alt="example"
          src={course_thumnail}
          style={{
            height: "158px",
            objectFit: "cover",
            overflow: "hidden",
          }}
        />
      }
      onClick={() => handleClick(data?._id?._id || data._id)}
      className="course-card"
    >
      <div
        style={{
          width: "100%",
          height: "56px",
          overflow: "hidden",
          fontSize: "1.1rem",
          fontWeight: "bold",
          color: "grey",
          marginBottom: "1rem",
        }}
      >
        <div
          style={{
            whiteSpace: "pre-wrap",
            lineHeightL: "1.5",
          }}
        >
          {data?._id?.course_name || data?.course_name}
        </div>
      </div>

      <Meta
        description={
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "8px",
              }}
            >
              {course_ratingsAverage != undefined &&
                (course_ratingsAverage > 0 ? (
                  <Rate
                    disabled
                    allowHalf
                    defaultValue={course_ratingsAverage}
                  />
                ) : (
                  <Rate disabled allowHalf defaultValue={0} />
                ))}
              {data?.process_Course >= 0 && (
                <Progress percent={Math.round(data?.process_Course * 100)} />
              )}
            </div>
            {course_purchased != undefined && (
              <div
                style={{
                  fontSize: "16px",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  marginBottom: "10px",
                  marginLeft: "2px",
                }}
              >
                <FaUserEdit />
                <div>{course_purchased}</div>
              </div>
            )}

            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "8px",
              }}
            >
              <Avatar
                icon={<UserOutlined />}
                src={
                  data?._id?.user_teacher?.user_avatar ||
                  data?.user_teacher?.user_avatar ||
                  null
                }
              />
              <span style={{ marginLeft: "8px", fontSize: "14px" }}>
                {data?._id?.user_teacher?.user_name ||
                  data?.user_teacher?.user_name}
              </span>
            </div>
            <div
              style={{
                marginRight: "7px",
                marginTop: "1rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "15px",
              }}
            >
              {course_price && (
                <div
                  style={{
                    fontSize: "16px",
                    color: "#4096ff",
                    fontWeight: "500",
                    marginLeft: "-10px",
                  }}
                >
                  {formatPrice(course_price)} VND
                </div>
              )}
              <Button
                style={{ marginRight: "-13px" }}
                type="primary"
                size="large"
                onClick={() => handleClick}
              >
                Xem thêm
              </Button>
            </div>
          </div>
        }
      />
    </Card>
  );
};

export default CourseCard;
