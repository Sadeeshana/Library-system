import React, { useState } from 'react';
import './Forget_password.css';
import { useNavigate } from 'react-router-dom';

function ForgotPassword() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    function isValidEmail(v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
    }

    const handleSend = async (e) => {
        e.preventDefault();
        setMessage(null);

        if (!isValidEmail(email.trim())) {
            setMessage({ type: 'error', text: 'Please enter a valid email address.' });
            return;
        }

        setLoading(true);

        try {
            const response = await fetch('http://localhost:8080/api/auth/send-code', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email }),
            });

            const data = await response.json();
            setLoading(false);

            if (data.status === 'success') {
                setMessage({ type: 'success', text: data.message });
                setTimeout(() => {
                    navigate("/verify-password", { state: { email: email } });
                }, 1500);
            } else {
                setMessage({ type: 'error', text: data.message });
            }

        } catch (err) {
            setLoading(false);
            console.error("Fetch error:", err);
            setMessage({ type: 'error', text: 'Server error' });
        }
    };

    return (
        <div className="fp-page-bg">
            <div className="fp-card-popup">

                {/* Icon */}
                <div className="fp-icon-wrap">
                    <div className="fp-icon-circle">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                            <polyline points="22,6 12,13 2,6" />
                        </svg>
                    </div>
                </div>

                <h2 className="fp-title">Forgot Password</h2>
                <p className="fp-subtitle">Enter your email to receive a verification code.</p>

                <form onSubmit={handleSend} noValidate>
                    <label htmlFor="fp-email" className="fp-label">Email Address</label>
                    <input
                        id="fp-email"
                        className="fp-input"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        required
                    />

                    <button type="submit" className="fp-send-btn" disabled={loading}>
                        {loading ? 'Sending...' : 'Send Code'}
                    </button>

                    <button type="button" className="fp-cancel-btn" onClick={() => navigate(-1)}>
                        Cancel
                    </button>

                    {message && (
                        <div className={`fp-message ${message.type === 'error' ? 'error' : 'success'}`}>
                            {message.text}
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}

export default ForgotPassword;