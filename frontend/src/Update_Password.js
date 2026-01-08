import React, { useState , useEffect} from 'react';
import './Update_Password.css';
import { useNavigate , useLocation } from "react-router-dom";

function UpdatePassword() {
    const navigate = useNavigate();
    const location = useLocation();

    const email = (location.state && location.state.email) ? location.state.email : "";

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    //If any error send user back to the first page
    useEffect(() => {
        if (!email) {
            alert("Session expired or invalid access. Please start again.");
            navigate("/forgot-password");
        }
    }, [email, navigate]);


        const handleUpdate = async (e) => {
        e.preventDefault();
        setMessage('');

        if (newPassword !== confirmPassword) {
            setMessage("Passwords do not match!");
            return;
        }

        if (newPassword.length < 6) {
            setMessage("Password must be at least 6 characters.");
            return;
        }
try{
        const response = await fetch('http://localhost:8080/api/auth/reset-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: email,        // Matches request.get("email")
                newPassword: newPassword // Matches request.get("newPassword")
            }),
        });

        const data = await response.json();

        if (data.status === 'success') {
            alert("Password Updated Successfully! Redirecting to Login...");

            navigate("/");
        } else {
            setMessage(data.message);
        }

    } catch (error) {
        console.error("Error:", error);
        setMessage("Server connection failed.");
    }

    };

    return (
        <div className="update-page-bg">

            <div className="update-card">
                <h2 className="title">Update Password</h2>
                <p className="subtitle">Enter a new secure password for your account.</p>

                <form onSubmit={handleUpdate}>

                    <label className="input-label">New Password</label>
                    <input
                        type="password"
                        placeholder="Enter New Password"
                        className="input-field"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />

                    <label className="input-label">Confirm New Password</label>
                    <input
                        type="password"
                        placeholder="Confirm New Password"
                        className="input-field"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />

                    <button type="submit" className="update-btn">
                        Update Password
                    </button>

                    <button type="button" className="cancel-btn" onClick={() => navigate('/')}>
                        Cancel
                    </button>

                    {message && <p className="message-text">{message}</p>}
                </form>
            </div>
        </div>
    );
}

export default UpdatePassword;