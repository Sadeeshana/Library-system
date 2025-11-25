import React, { useEffect } from "react";
import "./verify_password.css";
import { Link } from "react-router-dom";

function Verify_password() {

    // Auto move cursor between OTP boxes
    useEffect(() => {
        const inputs = document.querySelectorAll(".otp-input");

        inputs.forEach((input, index) => {
            input.addEventListener("input", () => {
                if (input.value.length === 1 && index < 3) {
                    inputs[index + 1].focus();
                }
            });

            input.addEventListener("keydown", (e) => {
                if (e.key === "Backspace" && input.value === "" && index > 0) {
                    inputs[index - 1].focus();
                }
            });
        });
    }, []);

    return (
        <div className="verify-container">

            {/* Left Side */}
            <div className="left-section">
                <p className="instruction-text">
                    Please enter the 4-digit verification code sent to your email
                </p>

                <Link to="/login">
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