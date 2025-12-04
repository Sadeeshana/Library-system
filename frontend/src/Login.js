// This is our new Login Page component
import React, { useState } from 'react';
import './Login.css'; // We'll add styles here
import Lottie  from "lottie-react";
import bookAnimation from "./Bookslib.json"
import Librarian from "./Librarian.json"
import {Link, useNavigate} from "react-router-dom";
import { motion } from 'framer-motion';
import { FaUser, FaLock } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';

function Login() {
    //Functions for the button
    const navigate = useNavigate();



    // These "state" variables store what the user types
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(''); // Stores the server's response
    const [isLoading, setIsLoading] = useState(false);

    // This function runs when the user clicks the "Login" button
    const handleSubmit = async (event) => {
        event.preventDefault(); // Stops the page from reloading
        setIsLoading(true);
        setMessage(''); // Clear any old message



        try {
            // 1. Call our Spring Boot API (at port 8080)
            const response = await fetch('http://localhost:8080/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({username: username, password: password}),
            });

            console.log(response.status);

            // 2. Get the JSON response
            const data = await response.json();
            console.log(data);


            //    Check the 'status' from your backend
            if (data.status === 'success') {
                console.log("Login successfull");
                navigate("/dashboard");
            } else {
                console.log("Login failed");
                setMessage(data.message);
            }

        } catch (error) {
            console.error('Error:', error);
            setMessage('Could not connect to the server.');
        }
    };

    // 4. This is the JSX (HTML) that gets rendered
    // 4. This is the JSX (HTML) that gets rendered
    return (
        <div className="login-container">
            <div className="right-panel">
                <Lottie animationData={Librarian} loop={true}
                        height={100}
                        width={5}
                />

            </div>

            <div className="left-panel">
                <div className="form-container">
                    <h2 className="login-title">Librarian Login</h2>
                    <form onSubmit={handleSubmit}>
                        <label className="form-label" htmlFor="username">Username</label>
                        <div className="input-container">
                            <input
                                type="text"
                                id="username"
                                className="form-input"
                                placeholder="Enter Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>

                        <label className="form-label" htmlFor="password">Password</label>
                        <div className="input-container">
                            <input
                                type="password"
                                id="password"
                                className="form-input"
                                placeholder="Enter Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />


                        {/*Forget password*/}
                        <Link to="/forgot-password" className="forgot-link">
                            Forgot password
                        </Link>

                        {/*User registration*/}
                        <Link to="/Lib-register" className="userre">
                            Registration
                        </Link>

                        </div>


                        <button type="submit" className="login-button">Login</button>

                        {/* This will show "Login Successful!" or "Invalid username..." */}
                        {message && <p className="server-message">{message}</p>}
                    </form>
                </div>

            </div>
        </div>
    );
}

export default Login;