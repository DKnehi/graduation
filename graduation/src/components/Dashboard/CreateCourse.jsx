import React, { useState } from 'react'

export default function CreateCourse() {
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUpload = () => {
        // Gửi hình ảnh đã chọn lên máy chủ ở đây
        console.log('Đã tải lên hình ảnh:', selectedImage);
        // Thực hiện các xử lý khác như gửi dữ liệu hình ảnh lên máy chủ
        // Ví dụ: sử dụng fetch hoặc Axios để gửi dữ liệu hình ảnh lên máy chủ
    };


    const [selectedVideo, setSelectedVideo] = useState(null);

    // Xử lý sự kiện khi người dùng chọn video
    const handleVideoChange = (event) => {
        const file = event.target.files[0];

        if (file && file.type.startsWith('video/')) {
            const reader = new FileReader();

            reader.onload = () => {
                setSelectedVideo(reader.result);
            };

            reader.readAsDataURL(file); // Đọc nội dung của file video dưới dạng URL Data
        } else {
            alert('Vui lòng chọn một file video hợp lệ.');
        }
    };

    // Xử lý sự kiện khi người dùng nhấn nút "Upload Video"
    const handleUploadVideo = () => {
        if (selectedVideo) {
            // Xử lý logic upload video ở đây
            alert('Video đã được upload thành công!');
        } else {
            alert('Vui lòng chọn một video trước khi upload.');
        }
    };
    return (
        <div>
            <div className='create-course'>
                <div className='course-info-box-content'>
                    <div className='course-info-box'>
                        <h2>Course Info</h2>
                        <p>Course Name</p>
                        <input type="text" name="" placeholder='New Course' id="" />
                        <p>Course Type</p>
                        <input type="text" name="" placeholder='New Type' id="" />
                        <p>Course Description</p>
                        <input type="text" name="" placeholder='New Description' id="" />
                        <p>Course Thumnail</p>
                        <input type="file" accept="image/*" onChange={handleImageChange} />
                        {selectedImage && (
                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                <img src={selectedImage} alt="Uploaded" style={{ maxWidth: '251px' }} />
                                <button className='course-thumbnail-button' onClick={handleUpload} style={{ marginTop: '30px' }}>Upload Image</button>
                            </div>
                        )}
                        <p>Course Benefits</p>
                        <input type="text" name="" placeholder='New Benefits' id="" />
                        <p>Course Lesson Content</p>
                        <input type="text" name="" placeholder='New Lesson Content' id="" />
                        <p>Course Price</p>
                        <input type="text" name="" placeholder='New Price' id="" />
                        <h2 style={{ marginTop: '20px' }}>Course Video</h2>
                        <input
                            type="file"
                            accept="video/*"
                            onChange={handleVideoChange}
                        />

                        {/* Hiển thị trước video đã chọn */}
                        {selectedVideo && (
                            <div className="video-preview">
                                <video controls>
                                    <source src={selectedVideo} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                        )}

                        {/* Nút Upload Video */}
                        <button className='course-thumbnail-button' onClick={handleUploadVideo}>Upload Video</button>
                    </div>
                </div>
                <div>

                </div>
            </div>
        </div>
    )
}
