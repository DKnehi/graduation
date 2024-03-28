import React from 'react'

export default function Footer() {
  return (
    <div>
      <footer className='footer'>
        <div className="footer-logo">
          <img src="https://demo.themeum.com/tutor/wp-content/uploads/2022/02/themeum.svg" alt="" />
          <p className='footer-coppy'>© All Rights Reserved. Themeum</p>
        </div>
        <div>
          <ul className="footer-menu">
            <li>
              <a className='footer-item' href="">Overview</a>
            </li>
            <li>
              <a className='footer-item' href="">Courses</a>
            </li>
            <li>
              <a className='footer-item' href="">Course Details</a>
            </li>
            <li>
              <a className='footer-item' href="">Instructor</a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  )
}
