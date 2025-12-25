import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { CategoryPage } from './pages/CategoryPage';
import { CartPage } from './pages/CartPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { OrderConfirmationPage } from './pages/OrderConfirmationPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { AdminLoginPage } from './pages/AdminLoginPage';
import { AdminPanel } from './pages/admin/AdminPanel';
import { useStore } from './store/useStore';

function App() {
  const { user } = useStore();

  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <div className="app">
        <Header />
        <main className="main">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/category" element={<CategoryPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
            
            {/* Admin Routes */}
            <Route path="/admin-login" element={<AdminLoginPage />} />
            <Route
              path="/admin/*"
              element={
                user?.isAdmin ? <AdminPanel /> : <Navigate to="/admin-login" replace />
              }
            />
          </Routes>
        </main>
        <footer className="footer">
          <div className="footer-content">
            <div className="footer-section">
              <h4>About FOJ Rentals</h4>
              <p>Your trusted partner for event rentals</p>
            </div>
            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/category">Category</a></li>
                <li><a href="/contact">Contact</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Contact</h4>
              <p>Email: <a href="mailto:fojrentals@gmail.com">fojrentals@gmail.com</a></p>
              <p>Phone: <a href="tel:+233240291516">+233240291516</a></p>
            </div>
            <div className="footer-section">
              <h4>Follow Us</h4>
              <div className="social-links">
                <a href="https://facebook.com/fojrentals" target="_blank" rel="noopener noreferrer" title="Facebook">
                  <FaFacebook />
                </a>
                <a href="https://instagram.com/fojrentals" target="_blank" rel="noopener noreferrer" title="Instagram">
                  <FaInstagram />
                </a>
                <a href="https://tiktok.com/@fojrentals" target="_blank" rel="noopener noreferrer" title="TikTok">
                  <FaTiktok />
                </a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 FOJ Rentals. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
