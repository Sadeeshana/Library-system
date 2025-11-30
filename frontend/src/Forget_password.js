import React, { useState } from 'react';
import './Forget_password.css';
import { Link , useNavigate } from 'react-router-dom';

function ForgotPassword() {


    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    function isValidEmail(v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
    }

    const handleBack = () => {
        navigate(-1);
    };

    const handleSend = async (e) => {
        e.preventDefault();
        setMessage(null);

        // 1. Validate Email
        if (!isValidEmail(email.trim())) {
            setMessage({ type: 'error', text: 'Please enter a valid email address.' });
            return;
        }

        setLoading(true);

        try {
            // call the backend
            const response = await fetch('http://localhost:8080/api/auth/send-code', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email }),
            });

            const data = await response.json();
            setLoading(false);

            //Handle Backend Response
            if (data.status === 'success') {
                setMessage({ type: 'success', text: data.message });

                // 4. Navigate AND send the email to the next page
                setTimeout(() => {
                    navigate("/verify-password", { state: { email: email } });
                }, 1500);
            } else {
                setMessage({ type: 'error', text: data.message });
            }

        } catch (err) {
            setLoading(false);
            console.error("Fetch error:", err);
            setMessage({ type: 'error', text: 'Server not responding. Is Spring Boot running?' });
        }
    };
    return (
        <div className="fp-container">
            <aside className="fp-left">
                <div className="fp-left-inner">
                    <p className="fp-prompt">Please enter your email to receive a verification code.</p>
                </div>
                <div className="fp-back-wrap">
                    <button className="fp-back-btn" onClick={handleBack}>Back to Login</button>
                </div>
            </aside>

            <main className="fp-right">
                <div className="fp-icon-wrap">
                    <div className="fp-icon-circle" aria-hidden="true">
                        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path d="M2 6.5C2 5.67157 2.67157 5 3.5 5H20.5C21.3284 5 22 5.67157 22 6.5V17.5C22 18.3284 21.3284 19 20.5 19H3.5C2.67157 19 2 18.3284 2 17.5V6.5Z" stroke="white" strokeWidth="0.8"/>
                            <path d="M3 6.75L11.2 12.01C11.88 12.47 12.81 12.47 13.49 12.01L21 6.75" stroke="white" strokeWidth="0.8"/>
                        </svg>
                    </div>
                </div>

                <h1 className="fp-title">Forgot Password</h1>

                <form className="fp-card" onSubmit={handleSend} noValidate>
                    <label htmlFor="fp-email" className="fp-label">Email</label>
                    <input
                        id="fp-email"
                        className="fp-input"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        aria-label="Email"
                    />

                    <button type="submit" className="fp-send-btn" disabled={loading}>
                        {loading ? 'Sending...' : 'Send verification code'}
                    </button>

                    {message && (
                        <div className={`fp-message ${message.type === 'error' ? 'error' : 'success'}`}>{message.text}</div>
                    )}
                </form>
            </main>
        </div>
    );
}

// Export the corrected component
export default ForgotPassword;