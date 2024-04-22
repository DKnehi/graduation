import React, { useState } from 'react';

export default function CourseInfo() {
    const [isVisible, setIsVisible] = useState(false);

    const handleButtonClick = () => {
        setIsVisible(!isVisible); // Đảo ngược trạng thái isVisible
    };
    return (
        <div>
            <div className="newcourse-section-video-box-dad-content-main">
                <h2>Về khóa học</h2>
                {/* <p>{dataOneCourse?.data?.course_description}</p> */}
                <h2 style={{ marginTop: '25px' }}>Description</h2>
                <h2 style={{ marginTop: '25px' }}>Nội dung khóa học</h2>
                <div className="newcourse-section-video-box-dad-content-main-button-box">
                    <button style={{borderBottomLeftRadius:'0', borderBottomRightRadius:'0'}} className="newcourse-section-video-box-dad-content-main-button" onClick={handleButtonClick}>
                        topic 1<i class="fa-solid fa-chevron-right"></i>
                    </button>
                    {isVisible && (
                        <div>
                            <button style={{borderTopLeftRadius:'0', borderTopRightRadius:'0', backgroundColor:'white', borderTop:'none', fontSize: '16px', color:'gray',}} className="newcourse-section-video-box-dad-content-main-button">
                                Bắt Đầu
                                <p style={{margin:'0'}}>8:01</p>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
