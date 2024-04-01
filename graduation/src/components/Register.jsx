import React, { useState } from 'react'
import { Link } from 'react-router-dom';
export default function Register() {
    const [showUserRegisterForm, setShowUserRegisterForm] = useState(false);
    const [showInstructorRegisterForm, setShowInstructorRegisterForm] = useState(false);
    const [showOTPCode, setShowOTPCode] = useState(false);
    const [buttonText, setButtonText] = useState('Register');

    const handleButtonClick = () => {
        setShowOTPCode(true);
        setButtonText('Verify');
      };

    const handleUserRegisterClick = () => {
        setShowUserRegisterForm((prev) => !prev);
        setShowInstructorRegisterForm(false);
    };

    const handleInstructorRegisterClick = () => {
        setShowInstructorRegisterForm((prev) => !prev);
        setShowUserRegisterForm(false);
    };


    const [otpValues, setOTPValues] = useState(['', '', '', '']);

    const handleChange = (index, event) => {
        const value = event.target.value;

        // Kiểm tra nếu giá trị nhập vào không phải là số hoặc độ dài vượt quá 1 ký tự thì không cập nhật
        if (!(/^\d*$/.test(value)) || value.length > 1) {
            return;
        }

        // Cập nhật giá trị của input
        const newOTPValues = [...otpValues];
        newOTPValues[index] = value;
        setOTPValues(newOTPValues);

        // Nếu có giá trị mới và không phải là ô cuối cùng thì focus ô tiếp theo
        if (value && index < 3) {
            document.getElementById(`otpInput${index + 1}`).focus();
        }
    };


    // Số ký tự tối đa được nhập vào
    const maxLength = 1;
    return (
        <div>
            <section className='login-section'>
                <div className='login-content-box'>
                    <h2>Create, Account!</h2>
                    <p className='login-content-box-subheading'>To explore the student features in detail, simply click on ‘Register as a student’. Else, click on ‘Register as an instructor’ to explore the instructor’s side of things.</p>
                    <button className='login-content-box-button' onClick={handleUserRegisterClick}>
                        <div className='login-content-box-button-name'>
                            <img src="https://demo.themeum.com/tutor/wp-content/uploads/2022/02/tutor-live-demo-student-icon.svg" alt="" />
                            <p>Register as a <span>Student</span></p>
                        </div>
                        <div className='login-content-box-button-arrow'>
                            <i class="fa-solid fa-chevron-right"></i>
                        </div>
                    </button>
                    {showUserRegisterForm && (
                        <div className="login-form">
                            <h2>Student</h2>
                            <input type="text" name="" placeholder='Enter your name' id="" />
                            <input type="email" name="" placeholder='Enter your email' id="" />
                            <input type="password" name="" placeholder='Enter your password' id="" />
                            {showOTPCode && <div className='otp-form'>
                                <h2>VerifY Code</h2>
                                <p>Please enter the code we just sent to email</p>
                                <a href="">truongquocdatlqd@gmail.com</a>
                                <div className='otp-input-box'>
                                    {otpValues.map((value, index) => (
                                        <input className='otp-input'
                                            key={index}
                                            id={`otpInput${index}`}
                                            type="text" placeholder='-'
                                            maxLength={1}
                                            value={value}
                                            onChange={(event) => handleChange(index, event)}
                                        />
                                    ))}
                                    <p>Didn't receive OTP?</p>
                                    <a href="">Resend code</a>
                                </div>
                            </div>}
                            <button onClick={handleButtonClick}>{buttonText}</button>

                            <p>Already have an account? <Link to='/login'><a href="">Sign in</a></Link></p>
                        </div>
                    )}
                    <button className='login-content-box-button' onClick={handleInstructorRegisterClick}>
                        <div className='login-content-box-button-name'>
                            <img src="https://demo.themeum.com/tutor/wp-content/uploads/2022/02/tutor-live-demo-instructor-icon.svg" alt="" />
                            <p>Register as a <span>Instructor</span></p>
                        </div>
                        <div className='login-content-box-button-arrow'>
                            <i class="fa-solid fa-chevron-right"></i>
                        </div>
                    </button>
                    {showInstructorRegisterForm && (
                        <div className="login-form">
                            <h2>Instructor</h2>
                            <input type="text" name="" placeholder='Enter your name' id="" />
                            <input type="email" name="" placeholder='Enter your email' id="" />
                            <input type="password" name="" placeholder='Enter your password' id="" />
                            <button>Sign Up</button>
                            <p>Already have an account? <Link to='/login'><a href="">Sign in</a></Link></p>
                        </div>
                    )}
                </div>
                <div className='login-slide-box'>

                </div>
            </section>
        </div>
    )
}
