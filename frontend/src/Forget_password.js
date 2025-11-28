import React, { useState } from 'react';
import './Forget_password.css';
import { Link , useNavigate } from 'react-router-dom';





// Renamed the function from 'frogetPassword' to 'ForgotPassword'
function ForgotPassword() {


    //Navigation parts
    const navigate = useNavigate();

    const handleReset =(e) => {
        e.preventDefault();
        navigate("/verify-password");
    }



    const [email, setEmail] = useState('');
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    function isValidEmail(v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
    }

    const handleBack = () => {
        // Navigates back if history exists, otherwise goes to the home page ('/')
        navigate(-1);
    };

    const handleSend = async (e) => {
        e && e.preventDefault && e.preventDefault();
        setMessage(null);
        if (!isValidEmail(email.trim())) {
            setMessage({ type: 'error', text: 'Please enter a valid email address.' });
            return;
        }

        setLoading(true);
        try {
            // Replace with real API call if available
            // Simulating API delay with setTimeout
            setTimeout(() => {
                setLoading(false);
                // Standard security practice: Don't confirm if an email exists
                setMessage({ type: 'success', text: `If an account exists for ${email}, a verification code has been sent.` });

                setTimeout(() => {
                    navigate("/verify-password");
                }, 1500);

            }, 700);
        } catch (err) {
            setLoading(false);
            setMessage({ type: 'error', text: 'Could not send verification code. Try again later.' });
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