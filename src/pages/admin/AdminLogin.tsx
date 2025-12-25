import { useState } from 'react';
import { AiOutlineLock, AiOutlineUser, AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { FaLock } from 'react-icons/fa';
import './AdminLogin.css';

interface AdminLoginProps {
    onLogin: (username: string) => void;
}

export default function AdminLogin({ onLogin }: AdminLoginProps) {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        // Simulate authentication (replace with real authentication)
        setTimeout(() => {
            if (formData.username === 'admin' && formData.password === 'admin123') {
                onLogin(formData.username);
            } else {
                setError('Invalid username or password');
            }
            setIsLoading(false);
        }, 1000);
    };

    return (
        <div className="admin-login-container">
            <div className="admin-login-background">
                <div className="gradient-circle gradient-circle-1"></div>
                <div className="gradient-circle gradient-circle-2"></div>
                <div className="gradient-circle gradient-circle-3"></div>
            </div>

            <div className="admin-login-wrapper">
                <div className="admin-login-card">
                    <div className="login-header">
                        <div className="login-icon">
                            <FaLock className="icon-large" />
                        </div>
                        <h1 className="login-title">Admin Portal</h1>
                        <p className="login-subtitle">Secure Access Required</p>
                        <div className="header-divider"></div>
                    </div>

                    <form onSubmit={handleSubmit} className="login-form">
                        <div className="form-group">
                            <label className="form-label">
                                <AiOutlineUser className="label-icon" />
                                Admin Email
                            </label>
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                                className="form-input"
                                placeholder="admin@fojrentals.com"
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">
                                <AiOutlineLock className="label-icon" />
                                Password
                            </label>
                            <div className="password-wrapper">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    className="form-input password-input"
                                    placeholder="Enter your password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="toggle-password-btn"
                                    aria-label="Toggle password visibility"
                                >
                                    {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <div className="error-message">
                                <p>{error}</p>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="submit-btn"
                        >
                            {isLoading ? (
                                <div className="spinner"></div>
                            ) : (
                                'Access Admin Dashboard'
                            )}
                        </button>
                    </form>

                    <div className="login-divider">
                        <span>Demo Credentials</span>
                    </div>

                    <div className="demo-credentials-box">
                        <div className="credential-item">
                            <span className="credential-label">Email:</span>
                            <span className="credential-value">admin@fojrentals.com</span>
                        </div>
                        <div className="credential-item">
                            <span className="credential-label">Password:</span>
                            <span className="credential-value">admin123</span>
                        </div>
                    </div>

                    <div className="login-footer">
                        <p>Not an admin? <a href="/login" className="user-login-link">User Login</a></p>
                    </div>
                </div>
            </div>
        </div>
    );
}
