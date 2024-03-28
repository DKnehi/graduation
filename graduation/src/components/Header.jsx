import React from 'react'
import { Link } from 'react-router-dom'
export default function Header() {
  return (
    <div>
        <header className='header'>
            <Link to='/' className="header-logo">
                <img src="https://demo.themeum.com/tutor/wp-content/uploads/2022/02/tutor-live-demo-logo.svg" alt="" />
            </Link>
            <nav className='nav-bar'>
                <div className="buger">
                    <div className="buger-icon buger-icon1"></div>
                    <div className="buger-icon buger-icon2"></div>
                    <div className="buger-icon buger-icon3"></div>
                </div>
                <div className="menu">
                    <ul className='menu-list'>
                        <li>
                            <Link to='/' className='menu-item' href="">Overview</Link>
                        </li>
                        <li>
                            <Link to="/course" className='menu-item'href="">Courses</Link>
                        </li>
                        <li>
                            <a className='menu-item'href="">Course Details</a>
                        </li>
                        <li>
                            <Link to='/instructor' className='menu-item'href="">Instructor</Link>
                        </li>
                    </ul>
                </div>
            </nav>
            <div className="header-avatar-box">
                <div className="header-avatar"></div>
                <p className='header-avatar-hello'>Hello </p>
                <p> Quoc Dat</p>
            </div>
        </header>
    </div>
  )
}
