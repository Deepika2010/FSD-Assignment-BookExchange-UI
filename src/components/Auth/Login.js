import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const { login, user, error, setRecoveryEmail, resetPassword } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [forgotPassword, setForgotPassword] = useState(false);
    const navigate = useNavigate();

    // Handle login on form submission
    const handleLogin = async (e) => {
        e.preventDefault();
        await login(email, password); // Wait for the login process
    };

    // Handle password reset
    const handleRecovery = (e) => {
        e.preventDefault();
        if (resetPassword(email, password)) {
            alert('Password reset successfully');
            setForgotPassword(false);
        }
    };

    // Redirect after login is successful
    useEffect(() => {
        if (user) {
            navigate('/profile'); // Navigate to profile page after login
        }
    }, [user, navigate]);

    return (
        <div className="full-page-background">
            <h1 className="welcome-title">Welcome to Online Book Exchange Platform</h1>
            <div className="login-container">
                <h2 className="login-title">Login</h2>
                {!forgotPassword ? (
                    <form onSubmit={handleLogin}>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button type="submit">Login</button>
                        {error && <p style={{ color: 'red' }}>{error}</p>} {/* Show login error */}
                        <p onClick={() => setForgotPassword(true)} style={{ cursor: 'pointer', color: 'blue' }}>
                            Forgot Password?
                        </p>
                    </form>
                ) : (
                    <form onSubmit={handleRecovery}>
                        <input
                            type="email"
                            placeholder="Recovery Email"
                            value={email}
                            onChange={(e) => setRecoveryEmail(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="New Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button type="submit">Set New Password</button>
                        <p onClick={() => setForgotPassword(false)} style={{ cursor: 'pointer', color: 'blue' }}>
                            Back to Login
                        </p>
                    </form>
                )}
                <p>Don't have an account? <a href="/register">Register here</a></p>
            </div>
        </div>
    );
};

export default Login;
