import React, {useState} from "react";
import { useNavigate, Link } from 'react-router-dom';
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
                body: JSON.stringify(formData) // Send all form data as JSON
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
        <div className="container">

            <div className="left-section">
                <img src="/library-image.png" className="side-img" alt="Library" />
            </div>

            <div className="right-section">
                <h2>Librarian Register</h2>

                <form className="form" onSubmit={handleRegister}>

                    <label>Employee ID</label>
                    <input type="text" placeholder="Auto-Generated" disabled={true} />

                    <label>Employee Name</label>
                    <input
                        name="name"
                        type="text"
                        placeholder="Enter your Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />

                    <label>Address</label>
                    <input
                        name="address"
                        type="text"
                        placeholder="Enter your Home address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                    />

                    <label>E-mail</label>
                    <input
                        name="email"
                        type="email"
                        placeholder="Enter your E-mail"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <label>Phone Number</label>
                    <input
                        name="phoneNumber"
                        type="text"
                        placeholder="Enter your Phone Number"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        required
                    />

                    <label>Username</label>
                    <input
                        name="username"
                        type="text"
                        placeholder="Enter Username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />

                    <label>Password</label>
                    <input
                        name="password"
                        type="password"
                        placeholder="Enter Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />

                    <button className="register-btn">Register</button>
                    {message && <p className="server-message" style={{color: 'red'}}>{message}</p>}
                </form>

            </div>
        </div>
    );
}

export default LibrarianRegister;
