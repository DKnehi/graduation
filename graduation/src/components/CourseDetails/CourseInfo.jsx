import React, { useEffect, useRef, useState } from "react";
import { LuDot } from "react-icons/lu";
import {
  Button,
  Card,
  Collapse,
  Form,
  Input,
  message,
  Modal,
  Space,
} from "antd";
import { convertToTime } from "../../utils/convertToTime";

import { IoVideocam, IoEyeSharp } from "react-icons/io5";
import { CreateCourseData, Quizz, upload } from "../../api";
import { getDataLocal } from "../../utils/getLocalStorage";
import { IoMdInformationCircle } from "react-icons/io";
import { IoDocumentText } from "react-icons/io5";
const { Panel } = Collapse;

export const CourseInfo = ({ data, handleReload }) => {
  const [isOpenContentCourse, setIsOpenContentCourse] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);

  const [openSections, setOpenSections] = useState({});

  const handleSectionClick = (sectionId) => {
    // console.log("sectionId:", sectionId);
    setOpenSections((prevOpenSections) => ({
      ...prevOpenSections,
      [sectionId]: !prevOpenSections[sectionId],
    }));
  };

  const handleClickNewTitle = () => {
    setIsOpenFormTitle(!isOpenFormTitle);
  };

  const [isOpenFormTitle, setIsOpenFormTitle] = useState(false);
  const [title, setTitle] = useState("");

  const handleSubmitTitle = async (idCourse, title) => {
    try {
      await CreateCourseData.title(idCourse, title);
      handleReload();
      setTitle("");
      setIsOpenFormTitle(false);
      message.success("Thêm tiêu đề thành công!");
    } catch (error) {
      console.log(error);
      message.error("Thêm tiêu đề thất bại!");
    }
  };

  const [visible, setVisible] = useState(false);
  const [videoFile, setVideoFile] = useState(null);
  const [timeVideo, setTimeVideo] = useState(0);
  const [tileCourseVideo, setTileCourseVideo] = useState("");
  const [loadingVideo, setLoadingVideo] = useState(false);
  const [urlVideo, setUrlVideo] = useState("initialState");

  const inputFileRef = useRef(null);

  const handleShowModal = (courseId) => {
    setCourseId(courseId);
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    if (file && file.type.startsWith("video/")) {
      setVideoFile(file);
      try {
        const durationInSeconds = await getVideoDurationInSeconds(file);
        setTimeVideo(durationInSeconds);
      } catch (error) {
        console.error("Đã xảy ra lỗi khi tính toán thời lượng video:", error);
      }
    } else {
      message.error("Vui lòng chọn một ảnh video hợp lệ.");
    }
  };

  const handleUpload = () => {
    if (!videoFile) {
      message.error("Vui lòng chọn video trước khi tải lên!");
      return;
    }
    setLoadingVideo(true);
    const formData = new FormData();
    formData.append("file", videoFile);

    upload
      .uploadVideo(videoFile)
      .then((response) => {
        setUrlVideo(response?.data?.data);
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

  const getVideoDurationInSeconds = async (videoFile) => {
    return new Promise((resolve, reject) => {
      if (videoFile) {
        const videoElement = document.createElement("video");
        videoElement.src = URL.createObjectURL(videoFile);
        videoElement.addEventListener("loadedmetadata", () => {
          resolve(videoElement.duration);
        });
        videoElement.addEventListener("error", (error) => {
          reject(error);
        });
      } else {
        resolve(0);
      }
    });
  };

  const handleDeleteVideo = () => {
    setVideoFile(null);
    inputFileRef.current.value = "";
  };

  const handleSubmit = (id, title, url, time) => {
    CreateCourseData.createCourseVideo(id, title, url, time)
      .then(() => {
        message.success("Form đã được gửi thành công!");
        handleReload();
        setVisible(false);
        handleDeleteVideo();
        setTileCourseVideo("");
      })
      .catch((error) => {
        console.error(error);
        message.error("Upload lỗi");
      });
  };
  const idUser = getDataLocal("userInfo");
  const [buttonVissible, setbuttonVissible] = useState(false);
  const showButton = () => {
    if (idUser?._id === data?.user_teacher) {
      setbuttonVissible(true);
    }
  };
  // console.log(idUser?._id, data?.user_teacher);
  // useEffect(() => {
  //   showButton();
  // }, []);
  useEffect(() => {
    showButton();
  }, [idUser?._id, data?.user_teacher]);

  const [courseId, setCourseId] = useState("");

  const [isOpenTestModal, setIsOpenTestModal] = useState(false);
  const handleCloseTestModal = () => {
    setIsOpenTestModal(false);
  };
  const handleOpenTestModal = (courseId) => {
    setIsOpenTestModal(true);
    setCourseId(courseId);
  };

  const handleSubmitTitle2 = async (courseId, title) => {
    try {
      await Quizz.addQuizz(courseId, title);
      handleReload();
      setTitle("");
      setIsOpenTestModal(false);
      message.success("Thêm tiêu đề thành công!");
    } catch (error) {
      console.log(error);
      message.error("Thêm tiêu đề thất bại!");
    }
  };
  const [openAddQuizz, setopenAddQuizz] = useState(false);
  return (
    <div>
      <div className="newcourse-section-video-box-dad-content-main">
        <h2>Mô tả khóa học</h2>
        <p style={{ margin: "1rem", lineHeight: "1.5" }}>
          {data?.course_description}
        </p>

        <h2 style={{ marginTop: "25px" }}>Lợi ích của khóa học</h2>
        {data?.course_benefits.map((item) => {
          return (
            <p style={{ margin: "1rem" }}>
              <LuDot />
              {item}
            </p>
          );
        })}
        <h2 style={{ marginTop: "25px" }}>Nội dung khóa học</h2>
        {data?.course_lessonContent.map((item) => {
          return (
            <p style={{ margin: "1rem" }}>
              <LuDot />
              {item}
            </p>
          );
        })}

        <div className="section-container-video-footer-course-content">
          <h2>Nội dung bài học</h2>
          <Space
            direction="vertical"
            style={{ width: "100%", margin: "23px 0" }}
          >
            {data?.course_data?.map((course) => (
              <Collapse style={{ backgroundColor: "#eff1f6" }} size="large">
                <Panel
                  key={course._id}
                  header={
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <span style={{ fontWeight: "300" }}>
                        {course.courseData_title}
                      </span>
                      <span>
                        Tổng time:{" "}
                        {convertToTime(
                          course.course_data_video.total_video_section
                        )}
                      </span>
                    </div>
                  }
                >
                  <div>
                    {/* mapvideo */}
                    {course.course_data_video.course_video.map((video) => (
                      <div
                        key={video._id}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                        // className="custom-hover-panel"
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            gap: "10px",
                            marginBottom: "10px",
                          }}
                        >
                          <IoVideocam
                            style={{ fontSize: "25px", color: "#bdbfc3" }}
                          />
                          <div>{video.video_title}</div>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            gap: "10px",
                          }}
                        >
                          {convertToTime(video.video_length)}
                          <IoEyeSharp
                            style={{ fontSize: "20px", color: "#bdbfc3" }}
                          />
                        </div>
                      </div>
                    ))}
                    {/* mapquiz */}
                    {course.course_data_quiz.map((quiz) => (
                      <div className="">
                        <div
                          key={quiz._id}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                          // className="custom-hover-panel"
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              gap: "10px",
                              marginBottom: "10px",
                            }}
                          >
                            <IoDocumentText
                              style={{ fontSize: "25px", color: "#bdbfc3" }}
                            />
                            <div>{quiz.quiz_Tile}</div>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              gap: "10px",
                            }}
                          >
                            <IoMdInformationCircle
                              style={{ fontSize: "20px", color: "#bdbfc3" }}
                            />
                          </div>
                        </div>
                        <Button>Thêm </Button>
                      </div>
                    ))}
                    {/* button */}
                    {buttonVissible && (
                      <div className="">
                        <Button
                          type="primary"
                          onClick={() => handleShowModal(course._id)}
                          style={{ marginTop: "10px", marginLeft: "10px" }}
                        >
                          Thêm video bài học
                        </Button>
                        <Button
                          type="primary"
                          onClick={() => handleOpenTestModal(course._id)}
                          style={{ marginTop: "10px", marginLeft: "10px" }}
                        >
                          Thêm bài test
                        </Button>
                      </div>
                    )}
                  </div>
                </Panel>
              </Collapse>
            ))}
          </Space>
        </div>

        {/* Modal nằm bên ngoài vòng lặp */}
        <Modal
          title="Thêm video bài học"
          visible={visible}
          onCancel={handleCancel}
          footer={null}
        >
          <Form
            onFinish={() =>
              handleSubmit(courseId, tileCourseVideo, urlVideo, timeVideo)
            }
          >
            <Form.Item
              name="title1"
              label="Tiêu đề"
              rules={[{ message: "Vui lòng nhập tiêu đề!" }]}
            >
              <Input
                onChange={(e) => setTileCourseVideo(e.target.value)}
                value={tileCourseVideo}
              />
            </Form.Item>
            <Form.Item label="Chọn video">
              <input
                ref={inputFileRef}
                type="file"
                accept="video/*"
                onChange={handleFileChange}
              />
            </Form.Item>
            {videoFile && (
              <Card title="Video xem trước" style={{ width: 300 }}>
                <video controls style={{ width: "100%" }}>
                  <source
                    src={URL.createObjectURL(videoFile)}
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              </Card>
            )}
            <Form.Item>
              <Space>
                <Button
                  loading={loadingVideo}
                  type="primary"
                  onClick={handleUpload}
                >
                  Tải lên
                </Button>
                <Button onClick={handleDeleteVideo}>Xóa video</Button>
              </Space>
            </Form.Item>
            <Button type="primary" htmlType="submit">
              Gửi
            </Button>
          </Form>
        </Modal>
        <Modal
          title="Thêm bài test"
          visible={isOpenTestModal}
          onCancel={handleCloseTestModal}
          footer={[
            <Button key="cancel" onClick={handleCloseTestModal}>
              Hủy
            </Button>,
            <Button
              key="submit"
              type="primary"
              onClick={() => handleSubmitTitle2(courseId, title)}
            >
              Tạo
            </Button>,
          ]}
        >
          <Input
            type="text"
            name="course_data_quiz_title"
            placeholder="Nhập tiêu đề bài test"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Modal>
        {isOpenFormTitle && (
          <Modal
            title="Tạo tiêu đề"
            visible={isOpenFormTitle}
            onCancel={handleClickNewTitle}
            footer={[
              <Button key="cancel" onClick={handleClickNewTitle}>
                Hủy
              </Button>,
              <Button
                key="submit"
                type="primary"
                onClick={() => handleSubmitTitle(data?._id, title)}
              >
                Tạo
              </Button>,
            ]}
          >
            <Input
              type="text"
              name="courseData_title"
              placeholder="Nhập tiêu đề"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Modal>
        )}
        {buttonVissible && (
          <Button onClick={handleClickNewTitle} type="primary">
            Thêm chủ đề học
          </Button>
        )}
      </div>
    </div>
  );
};

export default CourseInfo;
