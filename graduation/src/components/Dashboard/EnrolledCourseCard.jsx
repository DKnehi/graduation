import React from 'react'
import { Link } from 'react-router-dom'
export default function EnrolledCourseCard() {
  return (
    <div>
      <div className='courses-section-card'>
        <img className='courses-section-card-image' src="https://demo.themeum.com/tutor/wp-content/uploads/2022/02/30.jpg" alt="" />
        <div className='discover-courses-section-card-content-box'>
          <div className='discover-courses-section-card-content-box-list-start'>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <p>5.00 (1)</p>
          </div>
          <Link to='/newcourse'>
            <a className='discover-courses-section-card-content-box-heading' href="">Speaking Korean for Beginners</a>
          </Link>
          <div className='enrolled-course-card-process'>
            <p>0/1</p>
            <p>0% Complete</p>
          </div>
          <div className='enrolled-course-persen'>

          </div>
        </div>
        <div className='course-card-buttonbox'>
          <Link to='/lesson'>
            <button className='course-card-button'>Start Learning</button>
          </Link>

        </div>
      </div>
    </div>
  )
}
