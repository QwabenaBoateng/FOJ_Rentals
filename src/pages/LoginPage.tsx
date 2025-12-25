import { useState } from 'react';
import { useStore } from '../store/useStore';
import { useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import './LoginPage.css';

export const LoginPage = () => {
  const { setUser, setIsLoggedIn } = useStore();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Mock login
    if (formData.email && formData.password) {
      const mockUser = {
        id: '1',
        email: formData.email,
        name: formData.email.split('@')[0],
        phone: '555-1234',
        address: '123 Main St',
        isAdmin: formData.email.includes('admin'),
      };

      setUser(mockUser);
      setIsLoggedIn(true);
      navigate(mockUser.isAdmin ? '/admin' : '/');
    } else {
      setError('Please fill in all fields');
    }
  };

  return (
    <div className="user-login-container">
      <div className="user-login-wrapper">
        <div className="user-login-card">
          <div className="login-header">
            <div className="login-icon">
              <FaUser className="icon-large" />
            </div>
            <h1 className="login-title">Customer Login</h1>
            <p className="login-subtitle">Sign in with your email and password</p>
          </div>

          {error && (
            <div className="error-message">
              <p>{error}</p>
            </div>
          )}

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                required
                placeholder="user@example.com"
                className="form-input"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <div className="password-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Your password"
                  className="form-input password-input"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  className="toggle-password-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? (
                    <AiOutlineEyeInvisible />
                  ) : (
                    <AiOutlineEye />
                  )}
                </button>
              </div>
            </div>

            <button type="submit" className="submit-btn">
              Sign In
            </button>
          </form>

          <div className="login-footer">
            <p>
              Don't have an account?{' '}
              <a href="#" className="user-login-link" onClick={() => navigate('/register')}>
                Sign up here
              </a>
            </p>
            <p className="admin-access-hint">
              Admin?{' '}
              <a href="#" className="user-login-link" onClick={() => navigate('/admin-login')}>
                Login here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
