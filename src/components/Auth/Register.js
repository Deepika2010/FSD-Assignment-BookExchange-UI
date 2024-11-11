import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
    const { register, user, error } = useAuth();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await register(username, email, password);
            // Redirect to profile only if registration is successful
            if (user) navigate('/profile');
        } catch (err) {
            console.error("Registration error: ", err);
        }
    };

    // Redirect to profile if already logged in
    useEffect(() => {
        if (user) navigate('/profile');
    }, [user, navigate]);

    return (
        <div className="register-container">
            <h2 className="register-title">Register</h2>
            <form className="register-form" onSubmit={handleRegister}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
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
                <button type="submit">Register</button>
            </form>
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default Register;
