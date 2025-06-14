import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/LoginPage.css';
import CircularLoader from '../components/CircularLoader';

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        setError(''); // Clear error when user types
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.email || !formData.password) {
            setError('All fields are required');
            return;
        }

        setLoading(true);
        try {
            const response = await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Login failed');
            }

            const data = await response.json();

            // Store user data in session
            sessionStorage.setItem('userEmail', formData.email);
            sessionStorage.setItem('username', data.user.username);
            
            // Redirect to home page
            navigate('/home');
        } catch (err) {
            console.error('Login error:', err);
            setError(err.message || 'Failed to login. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="main-container">
            <div className="login-panel">
                <div className="container">
                    <div className="header">
                        <div className="text">Welcome Back</div>
                        <div className="underline"></div>
                    </div>

                    <div className="auth-toggle">
                        <button 
                            className="active"
                            type="button"
                        >
                            Login
                        </button>
                        <button 
                            onClick={() => navigate('/signup')}
                            type="button"
                        >
                            Sign Up
                        </button>
                    </div>

                    {error && (
                        <div className="error-message">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="inputs">
                        <div className="input">
                            <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="M20 4H4C2.89543 4 2 4.89543 2 6V18C2 19.1046 2.89543 20 4 20H20C21.1046 20 22 19.1046 22 18V6C22 4.89543 21.1046 4 20 4Z" />
                                <path d="M22 6L12 13L2 6" />
                            </svg>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="input">
                            <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                <path d="M7 11V7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7V11" />
                            </svg>
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="submit-container">
                            <button 
                                type="submit" 
                                className="submit" 
                                disabled={loading}
                            >
                                {loading ? <CircularLoader /> : 'Login'}
                            </button>
                        </div>
                    </form>

                    <div className="forgot-password">
                        Don't have an account? <span onClick={() => navigate('/signup')}>Sign up here</span>
                    </div>
                </div>
            </div>

            <div className="image-panel">
                <div className="side-image"></div>
                <div className="gradient-overlay"></div>
                <div className="overlay-text">
                    Welcome Back!<br />Continue Your Scholarship Journey
                </div>
            </div>
        </div>
    );
};

export default LoginPage;