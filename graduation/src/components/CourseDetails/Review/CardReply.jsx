import React from "react";
import { Card, Avatar, Typography } from "antd";
import moment from "moment";

const { Meta } = Card;
const { Text } = Typography;

const CardReply = ({ reply }) => {
  // console.log(reply);
  return (
    <Card style={{ width: 300, marginBottom: 20 }} bordered={true}>
      <Meta
        avatar={
          <Avatar
          size={50}
            src={
              reply?.userId?.user_avatar ||
              "https://demo.themeum.com/tutor/wp-content/uploads/2022/02/Avatar-3-150x150.jpg"
            }
          />
        }
        title={reply.userId.user_name}
        description={
          <>
            <Text style={{fontSize:'17px'}}>{reply?.reply_comment || reply?.answser_comment}</Text>
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
