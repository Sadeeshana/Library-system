import React, { useState, useRef } from "react";
import "./verify_password.css";
import { Link, useNavigate,useLocation } from "react-router-dom";

function Verify_password() {

    const [otp, setOtp] = useState(['', '', '', '']);
    const inputRefs = useRef([]);
    const navigate = useNavigate();
    const location = useLocation();

    // 2. Get the email from navigation
    const email = location.state?.email || "";

    const handleChange = (index, value) => {
        if (isNaN(value)) return;
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        if (value !== '' && index < 3) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && index > 0 && otp[index] === '') {
            inputRefs.current[index - 1].focus();
        }
    };


    const handleVerify = async (e) => {
        e.preventDefault();

        const finalCode = otp.join(""); // Turn ['1','2','3','4'] into "1234"

        if (finalCode.length !== 4) {
            alert("Please enter a 4-digit code");
            return;
        }

        try {

            const response = await fetch('http://localhost:8080/api/auth/verify-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: email, // We send the email we got from the previous page
                    code: finalCode
                }),
            });

            const data = await response.json();

            if (data.status === 'success') {
                alert("Code Verified Successfully! (You can create a reset password page next)");
                // navigate("/reset-password", { state: { email: email } });
            } else {
                alert("Error: " + data.message);
            }

        } catch (error) {
            console.error("Error:", error);
            alert("Server connection failed.");
        }
    }

    return (
        <div className="verify-container">

            {/* Left Side */}
            <div className="left-section">
                <p className="instruction-text">
                    Please enter the 4-digit verification code sent to your email
                </p>

                <Link to="/">
                    <button className="back-btn">Back to Login</button>
                </Link>
            </div>

            {/* Right Side */}
            <div className="right-section">
                <h2 className="verify-title">Verify Password</h2>

                <div className="otp-wrapper">
                    <input className="otp-input" maxLength="1" />
                    <input className="otp-input" maxLength="1" />
                    <input className="otp-input" maxLength="1" />
                    <input className="otp-input" maxLength="1" />
                </div>

                <button className="verify-btn">Verify</button>

                <p className="resend-link">Resend OTP</p>
            </div>
        </div>
    );
}

export default Verify_password;