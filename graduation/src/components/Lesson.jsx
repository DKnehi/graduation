import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getOneCourse, getOneCourseMember, Process, Question } from "../api";
// import ReactPlayer from "react-player";
import { useStateValue } from "../Context/StateProvider";
import { IoVideocam } from "react-icons/io5";
import { Button, Collapse, message, Radio } from "antd";
import { convertToTime } from "../utils/convertToTime";
import ReviewCard from "./CourseDetails/Review/ReviewCard";
import TextArea from "antd/es/input/TextArea";
import Test from "./Layout/Test";
import Video from "./Layout/Video";
const { Panel } = Collapse;
export default function () {
  // const [{ dataCourseLearn }, dispatch] = useStateValue();
  const [dataCourseLearn, setdataCourseLearn] = useState();
  const [openSections, setOpenSections] = useState({});
  const [reload, setreload] = useState(false);
  // console.log(dataCourseLearn);
  const handleSectionClick = (sectionId) => {
    setOpenSections((prevOpenSections) => ({
      ...prevOpenSections,
      [sectionId]: !prevOpenSections[sectionId],
    }));
  };
  const [checkSeen, setcheckSeen] = useState(false);
  const handleClick = (url, id, isSeen) => {
    setUrlVideo(url);
    setidVideo(id);
    setApiSent(false);
    setcheckSeen(isSeen);
  };

  useEffect(() => {
    getCourseDetailsMember(idCourse);
  }, [reload]);

  const getCourseDetailsMember = async (idCourseCard) => {
    try {
      const courseDetails = await getOneCourseMember(idCourseCard);
      setdataCourseLearn(courseDetails?.data?.course_data);
    } catch (error) {
      console.error("Error fetching course details:", error);
    }
  };

  const [urlVideo, setUrlVideo] = useState();
  const [idVideo, setidVideo] = useState();
  const idCourse = localStorage.getItem("idCourseCard");
  const [played, setPlayed] = useState(0);
  const [apiSent, setApiSent] = useState(false);
  const handleProgress = (state) => {
    if (!state.played) return;
    const currentProgress = state.played * 100;
    setPlayed(currentProgress);

    if (currentProgress >= 70 && !apiSent && !checkSeen) {
      Process.upProcess(idCourse, idVideo)
        .then(() => {
          setApiSent(true);
          message.success("thành công!");
          setreload(!reload);
        })
        .catch((error) => {
          console.error(error);
          message.error("Lỗi!");
        });
    }
  };
  useEffect(() => {
    if (idVideo) {
      getQues(idVideo);
    }
  }, [idVideo]);
  // console.log(played);
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [data, setdata] = useState(null);

  const getQues = (idVideo) => {
    Question.getQuestion(idVideo)
      .then((data) => {
        setdata(data?.data?.data);
      })
      .catch((error) => {
        console.error(error);
        message.error("Lỗi!");
      });
  };
  // console.log(data);
  const [commentText, setCommentText] = useState("");
  const handleCommentSubmit = async () => {
    Question.addQuestion(idVideo, 0, idCourse, commentText)
      .then(() => {
        getQues(idVideo);
      })
      .catch((error) => {
        console.error(error);
        message.error("Lỗi!");
      });
    setCommentText("");
    setShowCommentInput(false);
  };

  const handleComment = async (idCm, commentText) => {
    Question.addAnwser(idCm, commentText)
      .then(() => {
        getQues(idVideo);
      })
      .catch((error) => {
        console.error(error);
        message.error("Lỗi!");
      });
  };

  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible); // Đảo ngược giá trị của isVisible
  };

  const [activeButton, setActiveButton] = useState(1); // State để lưu trữ button đang được chọn

  const handleButtonClick = (buttonId) => {
    setActiveButton(buttonId); // Đặt button được chọn là button với ID tương ứng
  };
  return (
    <div>
      <section className="lesson-section">
        <div className="lesson-section-headingbox-left">
          <div className="lesson-section-headingbox">
            <h2 style={{ fontSize: '22px', fontWeight: '500' }}>Course Content</h2>
          </div>
        </div>
        <div className="lesson-section-videobox">
          <div className="lesson-section-videobox-heading">
            <i class="fa-solid fa-chevron-left"></i>
            <h2>Test</h2>
            <Collapse accordion>
              {dataCourseLearn?.map((item) => (
                <Panel
                  key={item?._id}
                  header={item?.courseData_title}
                  onClick={() => handleSectionClick(item?._id)}
                >
                  {openSections[item?._id] && (
                    <>
                      {/* video  */}
                      {item?.course_data_video?.course_video.map((content) => (
                        <div className="" key={content?._id}>
                          <Radio
                            defaultChecked={content?.isSeen}
                            disabled={true}
                          />
                          <IoVideocam />
                          <div
                            className=""
                            onClick={() =>
                              handleClick(
                                content?.video_url,
                                content?._id,
                                content?.isSeen
                              )
                            }
                          >
                            {content?.video_title}
                          </div>
                          <div className="">
                            {convertToTime(content?.video_length)}
                          </div>
                        </div>
                      ))}
                      {/* quiz */}
                      {item?.course_data_quiz}
                    </>
                  )}
                </Panel>
              ))}
            </Collapse>
          </div>
          <div className="lesson-section-videobox-heading">
            <h2 style={{ marginRight: '10px' }}>Your Progress: 2 of 4 (50%)</h2>
            <i class="fa-solid fa-xmark"></i>
          </div>
        </div>
      </section>

      <section className="lesson-section-test">
        <div style={{ backgroundColor: '#EFF1F6' }}>
          <div className='lesson-test-content'>
            <button onClick={toggleVisibility} style={{ borderBottom: '1px solid #CDCFD5', padding: '18px 15px', width: '100%', display: 'flex', justifyContent: 'space-between' }}>
              <p style={{ fontSize: '18px', fontWeight: '500', color: '#677BA2' }}>Test 1</p>
              <div style={{ display: 'flex', gap: '10px' }}>
                <p>1/1</p>
                <i class="fa-solid fa-chevron-right"></i>
              </div>
            </button>
            <div className={isVisible ? 'content' : 'content hidden'}>
              <button onClick={() => handleButtonClick(1)} style={{ borderBottom: '1px solid #CDCFD5', padding: '18px 15px', width: '100%', display: 'flex', justifyContent: 'space-between', backgroundColor: 'white', borderRight: '1px solid #CDCFD5' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <i class="fa-solid fa-video"></i>
                  <p style={{ fontSize: '14px', fontWeight: '500', color: 'black' }}>Video 1</p>
                </div>
              </button>
              <button onClick={() => handleButtonClick(2)} style={{ borderBottom: '1px solid #CDCFD5', padding: '18px 15px', width: '100%', display: 'flex', justifyContent: 'space-between', backgroundColor: 'white', borderRight: '1px solid #CDCFD5' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <i class="fa-solid fa-clipboard-question"></i>
                  <p style={{ fontSize: '14px', fontWeight: '500', color: 'black' }}>Video 1</p>
                </div>
              </button>
            </div>
          </div>
        </div>
        <div style={{gridColumn:'2/5'}}>
          {activeButton === 1 && <Video></Video>}
          {activeButton === 2 && <Test></Test>}
        </div>
        <div>
          
        </div>
      </section>










      <div className="">
        bình luận video
        <div>
          {data?.map((item) => (
            <ReviewCard
              key={item._id}
              review={item}
              onReply={handleComment}
            />
          ))}

          {!showCommentInput ? (
            <Button type="primary" onClick={() => setShowCommentInput(true)}>
              đăng bình luận
            </Button>
          ) : (
            <div>
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
                bình luận
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

