import React from 'react'
import Header from './Header';
import Footer from './Footer';
import { Link } from 'react-router-dom';
export default function () {
    return (
        <div>
            <Header></Header>
            <section className='newcourse-section'>
                <div className='newcourse-section-headingbox'>
                    <div className='newcourse-section-headingbox-star-group'>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                    </div>
                    <h2 className='newcourse-section-heading'>New Course</h2>
                </div>
                <div className='newcourse-section-subheadingbox'>
                    <div className='newcourse-section-avatarbox'>
                        <div className='newcourse-section-avatar'>
                            <img className='newcourse-section-avatar' src="https://demo.themeum.com/tutor/wp-content/uploads/2023/12/60156-97afaf0b623337083cae6212e6a76a46.jpg" alt="" />
                        </div>
                        <p>By</p>
                        <a href="">James Aston</a>
                        <p>Uncategorized</p>
                    </div>
                    <div className='newcourse-section-sharebox'>
                        <div className='newcourse-section-share'>
                            <i class="fa-regular fa-bookmark"></i>
                            <p>Whilelist</p>
                        </div>
                        <div className='newcourse-section-share'>
                            <i class="fa-solid fa-share"></i>
                            <p>Share</p>
                        </div>
                    </div>
                </div>
                <div className='newcourse-section-video-content'>
                    <div className='newcourse-section-video-box-dad'>
                        <div className='newcourse-section-video-box'>

                        </div>
                        <div className='newcourse-section-video-box-dad-content'>
                            <div className='newcourse-section-video-box-dad-content-heading'> 
                            <h2>Course Info</h2>
                            <h2>Reviews</h2>
                            </div>
                            <div className='newcourse-section-video-box-dad-content-main'>
                                <h2>About Course</h2>
                                <p>demo1</p>
                                <h2>Course Content</h2>
                                <div className='newcourse-section-video-box-dad-content-main-button-box'>
                                    <button className='newcourse-section-video-box-dad-content-main-button'>
                                        topic 1
                                        <i class="fa-solid fa-chevron-right"></i>
                                    </button>
                                </div>
                                <div className='newcourse-section-video-box-dad-content-main-button-box'>
                                    <button className='newcourse-section-video-box-dad-content-main-button'>
                                        topic 2
                                        <i class="fa-solid fa-chevron-right"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='newcourse-section-slide-box'>
                        <div className='newcourse-section-slide-box-button-box'>
                            <div className='new-course-section-slide-box-button'>
                                <Link to='/lesson'>
                                <button>
                                    Start Learning
                                </button>
                                </Link>
                                
                            </div>
                            <div className='newcourse-section-slide-box-content-box'>
                                <div className='newcourse-section-ranking'>
                                    <i class="fa-solid fa-chart-simple"></i>
                                    <p>Intermediate</p>
                                </div>
                                <div className='newcourse-section-ranking'>
                                    <i class="fa-solid fa-graduation-cap"></i>
                                    <p>0 Total Enrolled</p>
                                </div>
                                <div className='newcourse-section-ranking'>
                                    <i class="fa-solid fa-arrows-rotate"></i>
                                    <p>March 22, 2024 Last Updated</p>
                                </div>
                                <div className='newcourse-section-ranking'>
                                    <i class="fa-solid fa-stamp"></i>
                                    <p>Certificate of completion</p>
                                </div>
                            </div>
                        </div>
                        <div className='newcourse-section-slide-box-avatar-box'>
                            <h2 className='newcourse-section-slide-box-avatar-box-heading'>A course by</h2>
                            <div className='newcourse-section-slide-box-avatar-2'>
                                <div className='newcourse-section-slide-box-avatar'>
                                    <img className='newcourse-section-slide-box-avatar' src="https://demo.themeum.com/tutor/wp-content/uploads/2023/12/60156-97afaf0b623337083cae6212e6a76a46.jpg" alt="" />
                                </div>
                                <div>
                                    <h2>James Aston</h2>
                                    <p>Desain grafis</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer></Footer>
        </div>
    )
}
