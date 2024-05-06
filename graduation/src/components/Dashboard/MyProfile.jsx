import React, { useEffect, useState } from "react";
import { Info, upload } from "../../api";
import { message, Input, Button, Avatar, Modal, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Login as loginApi } from "../../api/index";

export default function MyProfile() {
  const [userData, setUserData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [urlAvatar, setUrlAvatar] = useState("");

  // Object tạm thời để lưu trữ các thay đổi
  const [tempUserData, setTempUserData] = useState({});

  useEffect(() => {
    Info.user()
      .then((data) => {
        setUserData(data?.data?.data);
      })
      .catch((error) => {
        console.error(error);
        message.error("Lỗi");
      });
  }, []);

  // Hàm xử lý thay đổi thông tin người dùng
  const handleChange = (fieldName, value) => {
    setTempUserData((prevUserData) => ({
      ...prevUserData,
      [fieldName]: value,
    }));
  };

  // Hàm gọi API để cập nhật thông tin người dùng
  const handleUpdateInfo = () => {
    // console.log(tempUserData);
    Info.updatPrf(tempUserData)
      .then((data) => {
        console.log(data);
        setUserData((prevUserData) => ({
          ...prevUserData,
          ...tempUserData,
        }));
        getUserInfo();
        message.success("Cập nhật thông tin thành công");
      })
      .catch((error) => {
        console.error(error);
        message.error("Có lỗi xảy ra, vui lòng thử lại sau");
      });
  };

  // Hàm gọi API để thay đổi mật khẩu
  const handleChargePass = () => {
    Info.chargePass(oldPassword, newPassword)
      .then((data) => {
        console.log(data);
        message.success("Thay đổi mật khẩu thành công");
        setOldPassword("");
        setNewPassword("");
      })
      .catch((error) => {
        console.error(error);
        message.error("Có lỗi xảy ra, vui lòng thử lại sau");
      });
  };

  // Hàm xử lý tải lên ảnh đại diện
  const handleUploadAvatar = (info) => {
    const { file } = info;
    if (!file) {
      message.error("Vui lòng chọn ảnh trước khi cập nhật");
      return;
    }
    upload
      .uploadImg(file)
      .then((data) => {
        console.log(data?.data?.data);
        setUrlAvatar(data?.data?.data);
        // Cập nhật thông tin ảnh đại diện vào object tạm thời
        setTempUserData((prevUserData) => ({
          ...prevUserData,
          user_avatar: data?.data?.data,
        }));
      })
      .catch((error) => {
        console.error(error);
        message.error("Có lỗi xảy ra, vui lòng thử lại sau");
      });
  };

  // Hàm hủy modal
  const handleCancel = () => {
    setModalVisible(false);
    setOldPassword("");
    setNewPassword("");
  };

  // Hàm xử lý thêm kinh nghiệm
  const handleAddExperience = () => {
    setTempUserData((prevUserData) => ({
      ...prevUserData,
      user_experience: [
        ...(prevUserData.user_experience || []),
        { company: "", title: "", description: "" },
      ],
    }));
  };

  // Hàm xử lý thay đổi thông tin kinh nghiệm
  const handleChangeExperience = (index, field, value) => {
    setTempUserData((prevUserData) => {
      const newExperience = [...(prevUserData.user_experience || [])];
      newExperience[index][field] = value;
      return { ...prevUserData, user_experience: newExperience };
    });
  };

  const getUserInfo = async () => {
    try {
      const res = await loginApi.getInfo();
      localStorage.setItem("userInfo", JSON.stringify(res.data));
      window.location.reload();
    } catch (error) {
      return error;
    }
  };
  return (
    <div>
      <label>
        {urlAvatar ? (
          <Avatar src={urlAvatar} size={64} />
        ) : (
          <Avatar src={userData?.user_avatar} size={64} />
        )}
        <Upload
          accept="image/*"
          showUploadList={false}
          customRequest={handleUploadAvatar}
          onChange={handleUploadAvatar}
        ></Upload>
      </label>
      <br />
      <div>
        Tên người dùng:
        <Input
          style={{ marginTop: "10px" }}
          type="text"
          value={tempUserData?.user_name || userData?.user_name}
          onChange={(e) => handleChange("user_name", e.target.value)}
        />
      </div>
      <br />
      <div>
        Email người dùng:
        <Input
          disabled
          style={{ marginTop: "10px" }}
          type="email"
          value={tempUserData?.user_email || userData?.user_email}
          onChange={(e) => handleChange("user_email", e.target.value)}
        />
      </div>
      <br />
      <div>
        Vai trò:
        <Input
          disabled
          style={{ marginTop: "10px" }}
          type="text"
          value={tempUserData?.user_role || userData?.user_role}
          onChange={(e) => handleChange("user_role", e.target.value)}
        />
      </div>
      <br />
      <div>
        Giới thiệu:
        <Input.TextArea
          style={{ marginTop: "10px" }}
          value={tempUserData?.user_about || userData?.user_about}
          onChange={(e) => handleChange("user_about", e.target.value)}
        />
      </div>
      <br />
      {userData?.user_role === "teacher" && (
        <div>
          <div>
            Kinh nghiệm:
            {tempUserData?.user_experience?.map((experience, index) => (
              <div key={index}>
                <Input
                  style={{ marginTop: "10px" }}
                  type="text"
                  value={experience.company}
                  placeholder="Công ty"
                  onChange={(e) =>
                    handleChangeExperience(index, "company", e.target.value)
                  }
                />
                <Input
                  style={{ marginTop: "10px" }}
                  type="text"
                  value={experience.title}
                  placeholder="Chức vụ"
                  onChange={(e) =>
                    handleChangeExperience(index, "title", e.target.value)
                  }
                />
                <Input
                  style={{ marginTop: "10px" }}
                  type="text"
                  value={experience.description}
                  placeholder="Mô tả"
                  onChange={(e) =>
                    handleChangeExperience(index, "description", e.target.value)
                  }
                />
              </div>
            ))}
            <Button
              style={{ margin: "10px 10px" }}
              type="primary"
              onClick={handleAddExperience}
            >
              Thêm kinh nghiệm
            </Button>
          </div>
          <br />
        </div>
      )}
      <Button
        type="primary"
        onClick={handleUpdateInfo}
        style={{ marginRight: "30px" }}
      >
        Lưu
      </Button>
      <Button type="primary" onClick={() => setModalVisible(true)}>
        Thay đổi mật khẩu
      </Button>
      <Modal
        title="Thay đổi mật khẩu"
        visible={modalVisible}
        onOk={handleChargePass}
        onCancel={handleCancel}
      >
        <Input.Password
          placeholder="Mật khẩu cũ"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
        <Input.Password
          placeholder="Mật khẩu mới"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </Modal>
    </div>
  );
}
