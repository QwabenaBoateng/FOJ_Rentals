import { useState } from 'react';
import { useStore } from '../store/useStore';
import { useNavigate } from 'react-router-dom';

export const LoginPage = () => {
  const { setUser, setIsLoggedIn } = useStore();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

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
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <h1>Login</h1>
          <p>Sign in to your FOJ Rentals account</p>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                required
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                required
                placeholder="Your password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>

            <button type="submit" className="submit-btn">
              Sign In
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Don't have an account?{' '}
              <a onClick={() => navigate('/register')}>Sign up here</a>
            </p>
            <p className="demo-hint">
              Demo: Use email "admin@test.com" to access admin dashboard
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
