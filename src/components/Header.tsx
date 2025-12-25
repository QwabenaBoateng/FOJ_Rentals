import { useStore } from '../store/useStore';
import { FaShoppingCart, FaUser, FaSignOutAlt, FaPhone, FaSearch } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';

export const Header = () => {
  const { cart, setUser, setIsLoggedIn, user } = useStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Hide header on admin routes
  if (location.pathname.startsWith('/admin')) {
    return null;
  }

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
    navigate('/');
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/category?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const handleSearchKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const categories = [
    { id: 'chairs', name: 'Chairs' },
    { id: 'tables', name: 'Tables' },
    { id: 'chair-covers', name: 'Chair Covers' },
    { id: 'chafing-dishes', name: 'Chafing Dishes' },
  ];

  return (
    <>
      {/* Top Info Bar - Dark Navy */}
      <div className="header-top">
        <div className="header-top-content">
          <div className="logo-section">
            <div className="logo">
              <h1 onClick={() => navigate('/')}>FOJ Rentals</h1>
              <p className="logo-tagline">Your Event Specialists</p>
            </div>
          </div>

          <nav className="top-nav">
            <a href="#home" onClick={() => navigate('/')}>Home</a>
            <a href="#about" onClick={() => navigate('/about')}>About Us</a>
            <a href="#category" onClick={() => navigate('/category')}>Category</a>
            <a href="#contact" onClick={() => navigate('/contact')}>Contact Us</a>
          </nav>

          <div className="top-actions">
            <div className="search-container">
              <input
                type="text"
                className="search-input"
                placeholder="Search items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleSearchKeyPress}
              />
              <button className="search-btn" onClick={handleSearch} title="Search">
                <FaSearch />
              </button>
            </div>
            <button className="cart-btn" onClick={() => navigate('/cart')} title="Shopping Cart">
              <FaShoppingCart />
              {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
            </button>
            {!user && (
              <button
                className="login-btn"
                onClick={() => navigate('/login')}
                title="Login"
              >
                <FaUser />
              </button>
            )}
            {user ? (
              <>
                {user.isAdmin && (
                  <button
                    className="admin-btn"
                    onClick={() => navigate('/admin/dashboard')}
                  >
                    Admin Dashboard
                  </button>
                )}
                <div className="user-menu">
                  <FaUser className="user-icon" />
                  <span>{user.name}</span>
                  <button className="logout-btn" onClick={handleLogout}>
                    <FaSignOutAlt /> Logout
                  </button>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};
