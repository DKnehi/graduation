import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
export default function Header() {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    }

    const handleMouseLeave = () => {
        setIsHovered(false);
    }
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
                                <Link to='/' className='menu-item' href="">Trang chủ</Link>
                            </li>
                            <li>
                                <Link to="/course" className='menu-item' href="">Khóa học</Link>
                            </li>
                            <li>
                                <a className='menu-item' href="">Chi tiết khóa học</a>
                            </li>
                            <li>
                                <Link to='/instructor' className='menu-item' href="">Instructor</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
                {/* <div className="header-avatar-box"
                 onMouseEnter={handleMouseEnter}
                 onMouseLeave={handleMouseLeave}
                >
                    <div className="header-avatar"></div>
                    <p className='header-avatar-hello'>Hello </p>
                    <p> Quoc Dat</p>
                    {isHovered && (
                        <div className="hovered-content">
                            <div className='hovered-content-login'>
                                <img src="https://demo.themeum.com/tutor/wp-content/themes/tutorstarter/assets/dist/images/tutor-submenu-login-avatar.svg" alt="" />
                                <h2>Login as a <span>Student</span></h2>
                                <button><i class="fa-solid fa-chevron-right"></i></button>
                            </div>
                            <div className='hovered-content-menu1'>
                                <ul className='hovered-content-menu1-list'>
                                    <li>
                                        <a href="">Dashboard</a>
                                    </li>
                                    <li>
                                        <a href="">My Profile</a>
                                    </li>
                                    <li>
                                        <a href="">Enrolled Courses</a>
                                    </li>
                                    <li>
                                        <a href="">Wishlist</a>
                                    </li>
                                    <li>
                                        <a href="">Reviews</a>
                                    </li>
                                    <li>
                                        <a href="">My Quiz Attempts</a>
                                    </li>
                                    <li>
                                        <a href="">Order History</a>
                                    </li>
                                    <li>
                                        <a href="">Question & Answer</a>
                                    </li>
                                    <li>
                                        <a href="">Calendar</a>
                                    </li>
                                </ul>
                            </div>
                            <div className='hovered-content-menu1'>
                                <ul className='hovered-content-menu1-list'>
                                    <li>
                                        <a href="">My Courses</a>
                                    </li>
                                    <li>
                                        <a href="">My Bundles</a>
                                    </li>
                                    <li>
                                        <a href="">Announcements</a>
                                    </li>
                                    <li>
                                        <a href="">Withdrawals</a>
                                    </li>
                                    <li>
                                        <a href="">Quiz Attempts</a>
                                    </li>
                                    <li>
                                        <a href="">Assignments</a>
                                    </li>
                                    <li>
                                        <a href="">Certificate</a>
                                    </li>
                                    <li>
                                        <a href="">Analytics</a>
                                    </li>
                                    <li>
                                        <a href="">Settings</a>
                                    </li>
                                    <li>
                                        <a href="">Logout</a>
                                    </li>
                                </ul>
                            </div>

                        </div>
                    )}
                </div> */}
                <div className='header-login-click'>
                    <p>Want to Explore!</p>
                    <Link to='/login'>
                    Đăng nhập
                    </Link>
                </div>

            </header>
        </div>
    )
}
