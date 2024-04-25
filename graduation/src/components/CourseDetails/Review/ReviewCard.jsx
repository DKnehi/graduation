import React, { useState } from "react";
import { Card, Avatar, Rate, Typography, Button, Input } from "antd";
import moment from "moment";
import CardReply from "./CardReply";
import { getDataLocal } from "../../../utils/getLocalStorage";

const { Meta } = Card;
const { Text } = Typography;
const { TextArea } = Input;

const ReviewCard = ({ review, onReply }) => {
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyText, setReplyText] = useState("");

  const handleReplyClick = () => {
    setShowReplyInput(true);
  };

  const handleReplySubmit = () => {
    onReply(review._id, replyText);
    setReplyText("");
    setShowReplyInput(false);
  };
  const roleUser = getDataLocal("userInfo");
  
  return (
    <Card style={{ width: "auto", marginBottom: 20 }} bordered={true}>
      <Meta
        avatar={
          <Avatar
            src={
              review.userId.user_avatar ||
              "https://demo.themeum.com/tutor/wp-content/uploads/2022/02/Avatar-3-150x150.jpg"
            }
          />
        }
        title={review.userId.user_name}
        description={
          <>
            <Rate disabled defaultValue={review.review_rating} />
            <Text style={{ marginLeft: "2rem" }}>{review.review_comment}</Text>
            <br />
            <Text type="secondary">
              {moment(review.createdAt).format("DD/MM/YYYY")}
            </Text>
            <br />
            <p style={{ marginBottom: "1rem" }}>Câu trả lời của giảng viên:</p>
            {review.reply_comment.map((reply) => (
              <CardReply key={reply._id} reply={reply} />
            ))}
            {roleUser?.user_role === "teacher" ? (
              !showReplyInput ? (
                <Button type="primary" onClick={handleReplyClick}>
                  Reply
                </Button>
              ) : (
                <div>
                  <TextArea
                    rows={4}
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                  />
                  <Button
                    style={{ margin: "2rem 0" }}
                    type="primary"
                    onClick={handleReplySubmit}
                  >
                    Submit
                  </Button>
                </div>
              )
            ) : null}
          </>
        }
      />
    </Card>
  );
};

export default ReviewCard;
