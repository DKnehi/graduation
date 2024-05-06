import React, { useEffect, useState } from "react";
import ReviewCard from "./ReviewCard";
import { ReviewsAPI } from "../../../api/index";
import { Button, Empty, message, Rate } from "antd";
import TextArea from "antd/es/input/TextArea";
import { getDataLocal } from "../../../utils/getLocalStorage";
import { checkIdExists } from "../../../utils/findCoursePurchased";
export default function Review({ idCourse, isUserReview }) {
  const [data, setdata] = useState(null);
  // console.log(idCourse);
  useEffect(() => {
    loadReview(idCourse, "1");
  }, []);
  const loadReview = async (id, page) => {
    try {
      const res = await ReviewsAPI.getReview(id, page);

      return setdata(res?.data?.data);
    } catch (error) {
      return null;
    }
  };
  //   console.log(data);
  const jsonString = localStorage.getItem("user");
  const user = JSON.parse(jsonString);
  const accessToken = user?.accessToken;
  const idUser = user?.metaData?._id;

  const roleUser = getDataLocal("userInfo");
  const handleComment = async (idCm, commentText) => {
    try {
      await ReviewsAPI.addReplyReview(
        idUser,
        idCm,
        accessToken,
        idCourse,
        commentText
      );
      loadReview(idCourse, "1");
    } catch (error) {
      console.log(error);
    }
  };
  const [showCommentInput, setShowCommentInput] = useState(false);
  const handleCommentClick = () => {
    setShowCommentInput(true);
  };
  const handleCommentSubmit = async () => {
    try {
      await ReviewsAPI.addReview(
        idUser,
        idCourse,
        accessToken,
        rate,
        commentText
      );
      //   console.log(idUser, idCourse.idCourse, accessToken, rate, commentText);
      loadReview(idCourse, "1");
    } catch (error) {
      return message.error("Bạn phải mua khóa học!");
    }
    setCommentText("");
    setShowCommentInput(false);
  };
  const [commentText, setCommentText] = useState("");
  const [rate, setRate] = useState();
  // console.log(isUserReview);
  return (
    <div>
      {data?.lenght > 0 ? (
        <>
          {data?.map((review) => (
            <ReviewCard
              key={review._id}
              review={review}
              onReply={handleComment}
            />
          ))}
        </>
      ) : (
        <div className="course-section-content-none">
          <Empty description={false} />
          Không có đánh giá!
        </div>
      )}

      {isUserReview === false &&
        (!showCommentInput ? (
          <Button type="primary" onClick={handleCommentClick}>
            Đánh giá khóa học
          </Button>
        ) : (
          <div>
            <Rate
              style={{ marginBottom: "1rem" }}
              onChange={(e) => setRate(e)}
              value={rate}
            />
            <TextArea
              rows={4}
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <Button
              style={{ margin: "2rem 0" }}
              type="primary"
              onClick={handleCommentSubmit}
            >
              Đánh giá
            </Button>
          </div>
        ))}
    </div>
  );
}
