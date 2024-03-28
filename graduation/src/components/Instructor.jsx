import React from 'react'
import Header from './Header';
import Footer from './Footer';
import CourseCard from './CourseCard';

export default function
    () {
    return (
        <div>
            <Header></Header>
            <section className='instructor-section'>
                <div className="instructor-section-headingbox">
                    <div className="instructor-section-info-box">
                        <div className='instructor-section-info-box2'>
                            <div className="info-box-avatar">
                                <img className='info-box-avatar-image' src="https://demo.themeum.com/tutor/wp-content/uploads/2022/02/Avatar-5.jpg" alt="" />
                            </div>
                            <div className='info-box-name'>
                                <h1 className='info-box-name-heading'>Tony Hanna</h1>
                                <p className='info-box-name-subheading'>6 Courses • 16 Students</p>
                            </div>
                        </div>
                        <div className='info-box-social-box'>
                            <div className="info-box-star-box">
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <p>5.00 (4.00)</p>
                            </div>
                            <div className='info-box-social-box2'>
                                <i class="fa-brands fa-facebook"></i>
                                <i class="fa-brands fa-twitter"></i>
                                <i class="fa-brands fa-instagram"></i>
                                <i class="fa-solid fa-earth-americas"></i>
                                <i class="fa-brands fa-github"></i>
                            </div>


                        </div>

                    </div>
                </div>
                <div className='instructor-section-list-card'>
                    <h2 className='instructor-section-list-card-heading'>Biography</h2>
                    <p className='instructor-section-list-card-subheading'>Hi, I'm Tony Hanna. I'm an avid outdoor photographer and explorer and have been taking pictures for years. I've worked professionally taking photos but my true passion lies in teaching what I love to others.</p>
                    <h2 className='instructor-section-list-card-heading'>Course</h2>
                    <div className='instructor-section-list-card2'>
                        <CourseCard></CourseCard>
                        <CourseCard></CourseCard>
                        <CourseCard></CourseCard>
                    </div>
                </div>
            </section>
            <Footer></Footer>
        </div>
    )
}
