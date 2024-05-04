import React from "react";
import { Card, Rate, Avatar, Button, Progress } from "antd";
import { Link, useNavigate } from "react-router-dom";

const { Meta } = Card;

const CourseCard = ({ data }) => {
  console.log(data?.process_Course);
  const navigate = useNavigate();
  const { course_name, course_price, course_ratingsAverage, course_slug } =
    data;
  const course_thumnail =
    data?._id?.course_thumnail ||
    data?.course_thumnail ||
    "https://demo.themeum.com/tutor/wp-content/uploads/2022/02/30.jpg";

  const handleClick = (id) => {
    localStorage.setItem("idCourseCard", id);
    navigate(`/newcourse`);
  };
  return (
    <Card
      hoverable
      style={{
        width: 240,
      }}
      cover={<img alt="example" src={course_thumnail} />}
      onClick={() => handleClick(data?._id?._id || data._id)}
    >
      <Meta
        title={
          <Link
            to="/newcourse"
            style={{
              fontWeight: "bold",
              fontSize: "16px",
              overflowWrap: "break-word",
              wordWrap: "break-word",
            }}
          >
            {data?._id?.course_name || data?.course_name}
          </Link>
        }
        description={
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "8px",
              }}
            >
              {course_ratingsAverage || typeof data?.process_Course ==="number"  ? (
                course_ratingsAverage ? (
                  <Rate
                    disabled
                    allowHalf
                    defaultValue={course_ratingsAverage}
                  />
                ) : (
                  <Progress percent={data?.process_Course*100} />
                )
              ) : null}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "8px",
              }}
            >
              {course_price ? <span>Giá: {course_price}</span> : null}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "8px",
              }}
            >
              <Avatar
                src={
                  data?._id?.user_teacher?.user_avatar ||
                  data?.user_teacher?.user_avatar ||
                  "https://demo.themeum.com/tutor/wp-content/uploads/2022/02/Avatar-5-150x150.jpg"
                }
              />
              <span style={{ marginLeft: "8px" }}>
                <Link to="/instructor/">
                  {data?._id?.user_teacher?.user_name ||
                    data?.user_teacher?.user_name}
                </Link>
              </span>
            </div>
            <div style={{ marginRight: "7px", marginTop: "1rem" }}>
              <Link to={`/newcourse`}>
                <Button type="primary" size="large" block>
                  Bắt đầu học
                </Button>
              </Link>
            </div>
          </div>
        }
      />
    </Card>
  );
};

export default CourseCard;
