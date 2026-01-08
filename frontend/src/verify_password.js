import React, { useState, useRef } from "react";
import "./verify_password.css";
import { useNavigate, useLocation } from "react-router-dom";

function VerifyPassword() {
    const [otp, setOtp] = useState(['', '', '', '']);
    const inputRefs = useRef([]);
    const navigate = useNavigate();
    const location = useLocation();

    // Get email passed from previous page
    const email = location.state?.email || "your email";

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
        const finalCode = otp.join("");

        if (finalCode.length !== 4) {
            alert("Please enter a 4-digit code");
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/api/auth/verify-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: email,
                    code: finalCode
                }),
            });

            const data = await response.json();

            if (data.status === 'success') {
                navigate("/update-password", { state: { email: email } });
            } else {
                alert("Error: " + data.message);
            }

        } catch (error) {
            console.error("Error:", error);
            alert("Server connection failed.");
        }
    }

    const handleResend = async () => {
        if (!email) {
            alert("Error: No email found. Please restart the process.");
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/api/auth/resend-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email }),
            });
            const data = await response.json();

            if (data.status === 'success') {
                alert("New code sent to your email!");
                setOtp(['', '', '', '']); // Clear input boxes
            } else {
                alert("Failed to resend: " + data.message);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };



    return (
        <div className="vp-page-bg">
            <div className="vp-card-popup">

                {/* Icon */}
                <div className="vp-icon-wrap">
                    <div className="vp-icon-circle">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                            <path d="M9 12l2 2 4-4"></path>
                        </svg>
                    </div>
                </div>

                <h2 className="vp-title">Verify Code</h2>
                <p className="vp-subtitle">
                    Enter the 4-digit code sent to <br/>
                    <strong>{email}</strong>
                </p>

                <div className="otp-wrapper">
                    {otp.map((data, index) => {
                        return (
                            <input
                                key={index}
                                className="otp-input"
                                type="text"
                                maxLength="1"
                                value={data}
                                ref={(el) => inputRefs.current[index] = el}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                            />
                        );
                    })}
                </div>

                <button className="vp-verify-btn" onClick={handleVerify}>
                    Verify Code
                </button>

                <button className="vp-cancel-btn" onClick={() => navigate('/')}>
                    Cancel
                </button>

                <p className="vp-resend">Didn't receive code? <span onClick={handleResend} style={{cursor: 'pointer'}}>Resend</span></p>
            </div>
        </div>
    );
}

export default VerifyPassword;