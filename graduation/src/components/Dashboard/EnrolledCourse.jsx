import React from 'react'
import EnrolledCourseCard from './EnrolledCourseCard'
export default function EnrolledCourse() {
  return (
    <div>
        <h2 style={{fontSize:'26px', fontWeight:'500', color:'var(--color-second)', marginBottom:'30px'}}>Enrolled Courses</h2>
        <div className='enrolled-course-list-card'>
            <EnrolledCourseCard></EnrolledCourseCard>
            <EnrolledCourseCard></EnrolledCourseCard>
            <EnrolledCourseCard></EnrolledCourseCard>
        </div>
    </div>
  )
}
