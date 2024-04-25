import React from "react";
import { Card, Avatar, Typography } from "antd";
import moment from "moment";

const { Meta } = Card;
const { Text } = Typography;

const CardReply = ({ reply }) => {
  return (
    <Card style={{ width: 300, marginBottom: 20 }} bordered={true}>
      <Meta
        avatar={
          <Avatar
            src={
              reply?.userId?.user_avatar ||
              "https://demo.themeum.com/tutor/wp-content/uploads/2022/02/Avatar-3-150x150.jpg"
            }
          />
        }
        title={reply.userId.user_name}
        description={
          <>
            <Text>{reply.reply_comment}</Text>
            <br />
            <Text type="secondary">
              {moment(reply.createdAt).format("DD/MM/YYYY")}
            </Text>
          </>
        }
      />
    </Card>
  );
};

export default CardReply;
