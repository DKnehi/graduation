import React, { useState } from 'react'
import ComponentDashboard from './ComponentDashboard';
import MyProfile from './MyProfile';
import EnrolledCourse from './EnrolledCourse';
import EnrolledCourseCard from './EnrolledCourseCard';
export default function Dashboard() {
  const [activeButton, setActiveButton] = useState(1); // State để lưu trữ button đang được chọn

  const handleButtonClick = (buttonId) => {
    setActiveButton(buttonId); // Đặt button được chọn là button với ID tương ứng
  };
  return (
    <div className='dashboard'>
      <div className="dashboard-heading-content">
        <div className='dashboard-heading-img-box'>
          <img className='dashboard-heading-img' src="https://demo.themeum.com/tutor/wp-content/uploads/2023/12/60156-97afaf0b623337083cae6212e6a76a46.jpg" alt="" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <p style={{ fontSize: '26px', color: 'var(--color-second)' }}>James Aston</p>
            <div style={{ display: 'flex', gap: '5px' }}>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <p>4.27 (11 Ratings)</p>
            </div>

          </div>
        </div>
        <div>
          <button className='create-course-btn'>
            <i class="fa-solid fa-square-plus"></i>
            Create A New Course
          </button>
        </div>
      </div>
      <section className='dashboard-section'>
        <div className='dashboard-list-menu'>
          {/* Button 1 */}
          <button
            onClick={() => handleButtonClick(1)}
            className={activeButton === 1 ? 'activeButton' : ''}
          >
            <i class="fa-solid fa-gauge-high"></i>
            Dashboard
          </button>
          <button onClick={() => handleButtonClick(2)}
            className={activeButton === 2 ? 'activeButton' : ''}>
            <i class="fa-solid fa-user"></i>
            My Profile
          </button>
          <button
          onClick={() => handleButtonClick(3)}
          className={activeButton === 3 ? 'activeButton' : ''}
          >
            <i class="fa-solid fa-graduation-cap"></i>
            Enrolled Course
          </button>
          <button
          onClick={() => handleButtonClick(4)}
          className={activeButton === 4 ? 'activeButton' : ''}
          >
            <i class="fa-solid fa-gear"></i>
            Setting
          </button>
          <button>
            <i class="fa-solid fa-right-from-bracket"></i>
            Logout
          </button>
        </div>
        <div className='dashboard-list-content'>
          {/* Hiển thị Component 1 nếu button 1 được chọn */}
          {activeButton === 1 && <ComponentDashboard></ComponentDashboard>}
          {activeButton === 2 && <MyProfile></MyProfile>}
          {activeButton === 3 && <EnrolledCourse></EnrolledCourse>}
        </div>
      </section>
    </div>
  )
}
