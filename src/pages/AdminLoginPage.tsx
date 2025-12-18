import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { FaLock, FaUser } from 'react-icons/fa';

export const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser, setIsLoggedIn } = useStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      // Mock admin credentials
      if (email === 'admin@fojrentals.com' && password === 'admin123') {
        const adminUser = {
          id: '1',
          name: 'Admin User',
          email: email,
          phone: '0808 501 3419',
          address: 'London, UK',
          isAdmin: true,
        };
        setUser(adminUser);
        setIsLoggedIn(true);
        navigate('/admin/dashboard');
      } else {
        setError('Invalid admin credentials. Use admin@fojrentals.com / admin123');
      }
      setLoading(false);
    }, 800);
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="admin-auth-header">
            <FaLock className="admin-lock-icon" />
            <h1>Admin Portal</h1>
            <p>Secure Access Required</p>
          </div>

          {error && (
            <div className="error-message">
              <strong>Access Denied:</strong> {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">
                <FaUser className="input-icon" />
                Admin Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@fojrentals.com"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">
                <FaLock className="input-icon" />
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="submit-btn"
            >
              {loading ? 'Verifying...' : 'Access Admin Dashboard'}
            </button>
          </form>

          <div className="demo-hint">
            <strong>Demo Credentials:</strong><br />
            Email: admin@fojrentals.com<br />
            Password: admin123
          </div>

          <div className="auth-footer">
            <p>
              Not an admin?{' '}
              <a href="/login" className="auth-link">
                User Login
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
