import React, { useState } from 'react';
import './Update_Password.css';
import { Link } from "react-router-dom";

function UpdatePassword(){

    // State variables to store user inputs
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // This function runs when clicking the button
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Password Updated (UI Only)");
    };

    return (
        <div className="update-container">

            {/* Left side blue area */}
            <div className="left-panel">
                <p className="left-text">
                    Please enter and confirm your new password
                </p>

                <Link to="/login">
                    <button className="back-btn">Back to Login</button>
                </Link>
            </div>

            {/* Right side white area */}
            <div className="right-panel">

                <h2 className="title">Update Password</h2>

                <form onSubmit={handleSubmit} className="form-box">

                    <input
                        type="password"
                        placeholder="New Password"
                        className="input-field"
                        onChange={(e) => setNewPassowrd(e.target.value)}
                        />

                    <input
                        type="password"
                        placeholder="Confirm New Password"
                        className="input-field"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        />

                    <button type="submit" className="update-btn">
                        Update Password
                    </button>
                </form>
            </div>
        </div>
    );
}

export default UpdatePassword;


