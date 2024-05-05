import React from "react";
import { Card, Avatar, Button} from "antd";
import {  useNavigate } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
const { Meta } = Card;

const TeacherCard = ({ data }) => {
  const navigate = useNavigate();
  const { user_name, user_avatar, _id } = data;

  const handleClick = (id) => {
    localStorage.setItem("idInstructor", id);
    navigate(`/instructor`);
  };
//   console.log(data);
  return (
    
    <Card style={{ width: 300 }}>
      <Meta
        avatar={<Avatar icon={<UserOutlined />} src={user_avatar} size={64} />}
        title={user_name}
        description={
          <Button type="primary" onClick={()=>handleClick(_id)}>
            Tìm hiểu thêm
          </Button>
        }
      />
    </Card>
  );
};

export default TeacherCard;
