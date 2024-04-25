import React from "react";
import { Card, Rate, Avatar, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";



const { Meta } = Card;

const CourseCard = ({ data }) => {
  const navigate = useNavigate();
  const { course_name, course_price, course_ratingsAverage, course_slug } =
    data;
  const course_thumnail =
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
      onClick={() => handleClick(data._id)}
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
            {data?.course_name}
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
              <Rate disabled allowHalf defaultValue={course_ratingsAverage} />
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "8px",
              }}
            >
              <span>Giá: {course_price}</span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "8px",
              }}
            >
              <Avatar src="https://demo.themeum.com/tutor/wp-content/uploads/2022/02/Avatar-5-150x150.jpg" />
              <span style={{ marginLeft: "8px" }}>
                <Link to="/instructor">Sophia Jaymes</Link>
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
