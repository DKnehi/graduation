import React, { useState } from 'react'
import { Link } from 'react-router-dom';
export default function Login() {
    const [showUserLoginForm, setShowUserLoginForm] = useState(false);
  const [showInstructorLoginForm, setShowInstructorLoginForm] = useState(false);

  const handleUserLoginClick = () => {
    setShowUserLoginForm((prev) => !prev); 
    setShowInstructorLoginForm(false);
  };

  const handleInstructorLoginClick = () => {
    setShowInstructorLoginForm((prev) => !prev); 
    setShowUserLoginForm(false); // 
  };
    return (
        <div>
            <section className='login-section'>
                <div className='login-content-box'>
                    <h2>Welcome, Guest!</h2>
                    <p className='login-content-box-subheading'>To explore the student features in detail, simply click on ‘Login as a student’. Else, click on ‘Login as an instructor’ to explore the instructor’s side of things.</p>
                    <button className='login-content-box-button' onClick={handleUserLoginClick}>
                        <div className='login-content-box-button-name'>
                            <img src="https://demo.themeum.com/tutor/wp-content/uploads/2022/02/tutor-live-demo-student-icon.svg" alt="" />
                            <p>Login as a <span>Student</span></p>
                        </div>
                        <div className='login-content-box-button-arrow'>
                            <i class="fa-solid fa-chevron-right"></i>
                        </div>
                    </button>
                    {showUserLoginForm && (
                        <div className="login-form">
                            <h2>Student</h2>
                            <input type="email" name="" placeholder='Enter your email' id="" />
                            <input type="password" name="" placeholder='Enter your password' id="" />
                            <button>Login</button>
                            <a href="">Forgot Password?</a>
                            <p>You have account yet? <Link to='/register'><a href="">Register</a></Link></p>
                        </div>
                    )}
                    <button className='login-content-box-button' onClick={handleInstructorLoginClick}>
                        <div className='login-content-box-button-name'>
                            <img src="https://demo.themeum.com/tutor/wp-content/uploads/2022/02/tutor-live-demo-instructor-icon.svg" alt="" />
                            <p>Login as a <span>Instructor</span></p>
                        </div>
                        <div className='login-content-box-button-arrow'>
                            <i class="fa-solid fa-chevron-right"></i>
                        </div>
                    </button>
                    {showInstructorLoginForm && (
                        <div className="login-form">
                            <h2>Instructor</h2>
                            <input type="email" name="" placeholder='Enter your email' id="" />
                            <input type="password" name="" placeholder='Enter your password' id="" />
                            <button>Login</button>
                            <a href="">Forgot Password?</a>
                            <p>You have account yet? <Link to='/register'><a href="">Register</a></Link></p>
                        </div>
                    )}
                </div>
                <div className='login-slide-box'>

                </div>
            </section>
        </div>
    )
}
