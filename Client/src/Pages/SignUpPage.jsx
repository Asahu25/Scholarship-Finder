import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/LoginPage.css';
import CircularLoader from '../components/CircularLoader';

const SignUpPage = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
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

    const validateForm = () => {
        if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
            setError('All fields are required');
            return false;
        }
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return false;
        }
        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters long');
            return false;
        }
        if (!formData.email.includes('@')) {
            setError('Please enter a valid email address');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);
        try {
            const response = await fetch('http://localhost:3000/api/signUp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    username: formData.username,
                    email: formData.email,
                    password: formData.password
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong');
            }

            // Store user data in session
            sessionStorage.setItem('userEmail', formData.email);
            sessionStorage.setItem('username', formData.username);
            
            // Redirect to home page
            navigate('/home');
        } catch (err) {
            console.error('Signup error:', err);
            setError(err.message || 'Failed to create account. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="main-container">
            <div className="login-panel">
                <div className="container">
                    <div className="header">
                        <div className="text">Welcome</div>
                        <div className="underline"></div>
                    </div>

                    <div className="auth-toggle">
                        <button 
                            onClick={() => navigate('/login')}
                            type="button"
                        >
                            Login
                        </button>
                        <button 
                            className="active"
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
                                <path d="M20 21V19C20 16.7909 18.2091 15 16 15H8C5.79086 15 4 16.7909 4 19V21" />
                                <circle cx="12" cy="7" r="4" />
                            </svg>
                            <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />
                        </div>
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
                        <div className="input">
                            <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                <path d="M7 11V7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7V11" />
                            </svg>
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                value={formData.confirmPassword}
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
                                {loading ? <CircularLoader /> : 'Create Account'}
                            </button>
                        </div>
                    </form>

                    <div className="forgot-password">
                        Already have an account? <span onClick={() => navigate('/login')}>Login here</span>
                    </div>
                </div>
            </div>

            <div className="image-panel">
                <div className="side-image"></div>
                <div className="gradient-overlay"></div>
                <div className="overlay-text">
                    Start Your Journey<br />Find Your Perfect Scholarship
                </div>
            </div>
        </div>
    );
};

export default SignUpPage; 