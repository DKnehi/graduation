import React, { useState } from "react";
import { useStateValue } from "../../Context/StateProvider";
import { Button, Form, Input, message, Select, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { getCourseType, type, upload } from "../../api";
import { actionType } from "../../Context/reducer";
import { useNavigate } from "react-router-dom";

const { Option } = Select;
export default function CreateCourse() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [Image, setImage] = useState(null);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      setImage(file);
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCancelImg = () => {
    setSelectedImage(null);
  };
  const handleUploadImg = () => {
    setLoading(true);
    upload
      .uploadImg(Image)
      .then((response) => {
        // console.log(response?.data?.data);
        setCourse((prevCourse) => ({
          ...prevCourse,
          course_thumnail: response?.data?.data,
        }));
        message.success("Upload thành công");
      })
      .catch((error) => {
        console.error(error);
        message.error("Upload lỗi");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const [selectedVideo, setSelectedVideo] = useState(null);
  const [Video, setVideo] = useState(null);
  const handleCancelVideo = () => {
    setSelectedVideo(null);
  };
  // Xử lý sự kiện khi người dùng chọn video
  const handleVideoChange = (event) => {
    const file = event.target.files[0];

    if (file && file.type.startsWith("video/")) {
      setVideo(file);
      const reader = new FileReader();

      reader.onload = () => {
        setSelectedVideo(reader.result);
      };

      reader.readAsDataURL(file);
    } else {
      message.error("Vui lòng chọn một ảnh video hợp lệ.");
    }
  };

  const handleUploadVideo = () => {
    setLoadingVideo(true);
    upload
      .uploadVideo(Video)
      .then((response) => {
        // console.log(response?.data?.data);
        setCourse((prevCourse) => ({
          ...prevCourse,
          course_demoVideo: response?.data?.data,
        }));
        message.success("Upload thành công");
      })
      .catch((error) => {
        console.error(error);
        message.error("Upload lỗi");
      })
      .finally(() => {
        setLoadingVideo(false);
      });
  };

  const [course, setCourse] = useState({
    course_name: "",
    course_type: "",
    course_description: "",
    course_thumnail: "",
    course_demoVideo: "",
    course_benefits: [],
    course_lessonContent: [],
    course_price: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleBenefitChange = (index, value) => {
    setCourse((prevState) => {
      const updatedBenefits = [...prevState.course_benefits];
      updatedBenefits[index] = value;
      return { ...prevState, course_benefits: updatedBenefits };
    });
  };

  const handleLessonContentChange = (index, value) => {
    setCourse((prevState) => {
      const updatedLessonContent = [...prevState.course_lessonContent];
      updatedLessonContent[index] = value;
      return { ...prevState, course_lessonContent: updatedLessonContent };
    });
  };

  const handleAddInput = (field) => {
    setCourse((prevState) => ({
      ...prevState,
      [field]: [...prevState[field], ""],
    }));
  };
  // console.log(course);
  const [{ typeCourse }, dispatch] = useStateValue();

  const [loading, setLoading] = useState(false);
  const [loadingVideo, setLoadingVideo] = useState(false);

  // -------------
  const isFormValid = () => {
    return Object.values(course).every((value) => value !== "");
  };
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid()) {
      message.error("Vui lòng điền đầy đủ thông tin vào các trường");
      return;
    } else {
      upload
        .submitCourse(course)
        .then((response) => {
          console.log(response);
          message.success("Tạo khóa học thành công");
          setCourse((prevCourse) => ({
            ...prevCourse,
            course_thumnail: response?.data?.data,
          }));
          navigate(-1);
        })
        .catch((error) => {
          console.error(error);
          message.error("Tạo lỗi");
        })
        .finally(() => {});
    }
  };

  // const handelAddType = (values) => {
  //   type
  //     .addType(values)
  //     .then((data) => {
  //       console.log(data);
  //       fetchCourseType();
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //       message.error("Lỗi!");
  //     });
  // };
  // const fetchCourseType = async () => {
  //   try {
  //     const res = await getCourseType();
  //     dispatch({
  //       type: actionType.SET_TYPECOURSE,
  //       typeCourse: res.data.data,
  //     });
  //   } catch (error) {}
  // };
  return (
    <div>
      <form className="create-course" onSubmit={handleSubmit}>
        <div className="course-info-box-content">
          <div className="course-info-box">
            <h2>Thông tin khóa học</h2>
            <p>Tên khóa học</p>
            <input
              type="text"
              name="course_name"
              placeholder="Nhập tên khóa học"
              id=""
              onChange={handleChange}
            />
            <p>Thể loại</p>
            <select name="course_type" onChange={handleChange}>
              {typeCourse?.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.type_name}
                </option>
              ))}
            </select>

            {/* <Form onFinish={handelAddType}>
              <Form.Item name="type">
                <Input placeholder="Thêm lĩnh vực mới" />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Thêm
                </Button>
              </Form.Item>
            </Form> */}
            <p>Mô tả khóa học</p>
            <input
              type="text"
              name="course_description"
              placeholder="Nhập mô tả"
              id=""
              onChange={handleChange}
            />
            <p>Ảnh bìa khóa học</p>
            {selectedImage ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <img
                  src={selectedImage}
                  alt="Uploaded"
                  style={{ maxWidth: "251px" }}
                />
                <Button
                  type="primary"
                  style={{ marginTop: "30px" }}
                  loading={loading}
                  icon={<UploadOutlined />}
                  onClick={handleUploadImg}
                >
                  Upload hình ảnh
                </Button>
                <Button style={{ marginTop: "1rem" }} onClick={handleCancelImg}>
                  Hủy
                </Button>
              </div>
            ) : (
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            )}

            <p>Lợi ích của khóa học</p>
            {course.course_benefits.map((benefit, index) => (
              <div key={index}>
                <input
                  type="text"
                  placeholder=""
                  id=""
                  value={benefit}
                  onChange={(e) => handleBenefitChange(index, e.target.value)}
                />
              </div>
            ))}
            <Button
              type="primary"
              size="large"
              onClick={() => handleAddInput("course_benefits")}
            >
              Thêm lợi ích
            </Button>
            {/* <button
              type="button"
              onClick={() => handleAddInput("course_benefits")}
            >
              Thêm
            </button> */}
            <p>Nội dung khóa học</p>
            {course.course_lessonContent.map((lesson, index) => (
              <div key={index}>
                <input
                  type="text"
                  value={lesson}
                  onChange={(e) =>
                    handleLessonContentChange(index, e.target.value)
                  }
                  placeholder=""
                />
              </div>
            ))}
            <Button
              type="primary"
              size="large"
              onClick={() => handleAddInput("course_lessonContent")}
            >
              Thêm nội dung khóa học
            </Button>
            {/* <button
              type="button"
              onClick={() => handleAddInput("course_lessonContent")}
            >
              Thêm
            </button> */}

            <p>Giá khóa học</p>
            <input
              type="number"
              name="course_price"
              placeholder="Nhập giá khóa học"
              id=""
              onChange={handleChange}
            />
            <h2 style={{ marginTop: "20px" }}>Video demo</h2>

            {/* Hiển thị trước video đã chọn */}
            {selectedVideo ? (
              <div
                className="video-preview"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <video controls>
                  <source src={selectedVideo} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <Button
                  type="primary"
                  style={{ marginTop: "30px" }}
                  loading={loadingVideo}
                  icon={<UploadOutlined />}
                  onClick={handleUploadVideo}
                >
                  Upload video
                </Button>
                <Button
                  style={{ marginTop: "1rem" }}
                  onClick={handleCancelVideo}
                >
                  Hủy
                </Button>
              </div>
            ) : (
              <input
                type="file"
                accept="video/*"
                onChange={handleVideoChange}
              />
            )}
          </div>
          <Button type="primary" htmlType="submit" size="large" style={{width:'100%',marginTop:'30px'}}>
            Tạo khóa học
          </Button>
          {/* <button type="submit">Tạo khóa học</button> */}
        </div>
      </form>
    </div>
  );
}
