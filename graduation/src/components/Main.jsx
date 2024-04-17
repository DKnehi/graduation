import React from 'react'
import CourseCard from "./Courses/CourseCard"
import { Link, NavLink } from 'react-router-dom'
export default function Main() {
  return (
    <div>
      <main className='main'>
        <div className="main-heading-box">
          <h1 className='main-heading'>
            Start Your Online LMS Journey Using <span className='main-subheading'>
              Tutor LMS
            </span>
          </h1>
        </div>
        <img className='main-image' src="https://demo.themeum.com/tutor/wp-content/uploads/2022/02/27.jpg" alt="" />
      </main>
      <section className='discover-courses-section'>
        <div className="discover-course-heading-box">
          <h2 className='discover-course-heading'>
            Discover Courses
          </h2>
          <Link to ='/course'>
          <button className='discover-course-button'>
            View All Course
          </button>
          </Link>
        </div>
        <div className='discover-courses-section-list-card'>
          <CourseCard></CourseCard>
          <CourseCard></CourseCard>
          <CourseCard></CourseCard>
          <CourseCard></CourseCard>
        </div>
      </section>
      <section className='new-height-section'>
        <div className="new-height-section-content-box">
          <h2 className='new-height-section-heading'>
            Take Your eLearning Platform to New Heights!
          </h2>
          <p className='new-height-section-subheading'>Say hello to a flexible course builder, advanced quiz builder, powerful analytics, and more.</p>
        </div>
        <div className='new-height-section-list-card'>
          <div className='new-height-section-card'>
            <img src="https://demo.themeum.com/tutor/wp-content/uploads/2022/02/tutor-live-demo-feature1.jpg" alt="" />
            <h3 className='new-height-section-card-heading'>Responsive Design</h3>
            <p className='new-height-section-card-subheading'>Ensure the best user experience with this highly responsive plugin.</p>
          </div>
          <div className='new-height-section-card'>
            <img src="https://demo.themeum.com/tutor/wp-content/uploads/2022/02/tutor-live-demo-feature2.jpg" alt="" />
            <h3 className='new-height-section-card-heading'>Multiple Instructor</h3>
            <p className='new-height-section-card-subheading'>Conduct classes alongside other instructors with just a single click!</p>
          </div>
          <div className='new-height-section-card'>
            <img src="https://demo.themeum.com/tutor/wp-content/uploads/2022/02/tutor-live-demo-feature3.jpg" alt="" />
            <h3 className='new-height-section-card-heading'>Advanced Analytics</h3>
            <p className='new-height-section-card-subheading'>Keep up with your site’s progress with the help of Tutor LMS’ detailed reports.</p>
          </div>
        </div>
      </section>
      <section className='elearning-section'>
        <div className='elearning-section-content-box'>
          <h2 className='elearning-section-content-box-heading'>50,000+</h2>
          <h3 className='elearning-section-content-box-subheading'>eLearning enthusiasts who are using Tutor LMS!</h3>
          <img className='elearning-section-content-box-image' src="https://demo.themeum.com/tutor/wp-content/uploads/2022/03/tutor-live-demo-carousel-dashboard.png" alt="" />
        </div>
      </section>
    </div>
  )
}
