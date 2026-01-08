import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';
import "./librarian_register.css";

function LibrarianRegister() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        address: '',
        email: '',
        phoneNumber: '',
        username: '',
        password: ''
    });

    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setMessage('');

        try {
            const response = await fetch('http://localhost:8080/api/employee/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (data.status === 'success') {
                alert("Registration Successful! Redirecting to Login...");
                navigate('/');
            } else {
                setMessage(data.message);
            }

        } catch (error) {
            console.error("Error:", error);
            setMessage("Server error. Please try again.");
        }
    };


    return (
        <div className="reg-page-bg">
            <div className="reg-card-popup">
                <h2 className="reg-title">Librarian Register</h2>
                <p className="reg-subtitle">Create a new account</p>

                <form className="reg-form" onSubmit={handleRegister}>

                    <div className="form-row">
                        <div className="form-col">
                            <label className="reg-label">Name</label>
                            <input
                                name="name"
                                type="text"
                                className="reg-input"
                                placeholder="Enter Name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-col">
                            <label className="reg-label">Address</label>
                            <input
                                name="address"
                                type="text"
                                className="reg-input"
                                placeholder="Enter Address"
                                value={formData.address}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-col">
                            <label className="reg-label">Email</label>
                            <input
                                name="email"
                                type="email"
                                className="reg-input"
                                placeholder="Enter Email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-col">
                            <label className="reg-label">Phone</label>
                            <input
                                name="phoneNumber"
                                type="text"
                                className="reg-input"
                                placeholder="Enter Phone"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-col">
                            <label className="reg-label">Username</label>
                            <input
                                name="username"
                                type="text"
                                className="reg-input"
                                placeholder="Username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-col">
                            <label className="reg-label">Password</label>
                            <input
                                name="password"
                                type="password"
                                className="reg-input"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <button className="reg-btn">Register</button>

                    <button type="button" className="reg-cancel-btn" onClick={() => navigate('/')}>
                        Cancel
                    </button>

                    {message && <p className="reg-message error">{message}</p>}
                </form>

            </div>
        </div>
    );
}

export default LibrarianRegister;