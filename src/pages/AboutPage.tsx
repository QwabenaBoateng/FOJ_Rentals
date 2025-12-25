import { FaAward, FaUsers, FaHeart, FaTrophy } from 'react-icons/fa';

export const AboutPage = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-content">
          <h1>About FOJ Rentals</h1>
          <p>Your Trusted Partner for Unforgettable Events</p>
        </div>
      </section>

      {/* Company Info */}
      <section className="about-section">
        <div className="about-container">
          <div className="about-text">
            <h2>Who We Are</h2>
            <p>
              FOJ Rentals is dedicated to making your events memorable and stress-free. With years of experience, we've become the trusted choice for customers who value quality and exceptional service.
            </p>
            <p>
              Our mission is simple: to make every event special by providing high-quality rental items and outstanding customer support. Whether you're planning an intimate dinner, a grand wedding, or a corporate event, we have everything you need to create the perfect atmosphere.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-choose-us">
        <div className="about-container">
          <h2>Why Choose Us?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <FaAward className="feature-icon" />
              <h3>Premium Quality</h3>
              <p>All our items are carefully maintained and regularly updated to ensure the highest standards.</p>
            </div>
            <div className="feature-card">
              <FaUsers className="feature-icon" />
              <h3>Expert Team</h3>
              <p>Our experienced staff is ready to help you plan and execute your event perfectly.</p>
            </div>
            <div className="feature-card">
              <FaHeart className="feature-icon" />
              <h3>Customer Care</h3>
              <p>Your satisfaction is our priority. We provide 24/7 support for all your event needs.</p>
            </div>
            
          </div>
        </div>
      </section>

      {/* Our Offerings */}
      <section className="offerings-section">
        <div className="about-container">
          <h2>Our Offerings</h2>
          <div className="offerings-grid">
            <div className="offering-item">
              <h3>Chairs & Seating</h3>
              <p>Premium chairs in various styles and colors to suit any event theme.</p>
            </div>
            <div className="offering-item">
              <h3>Tables</h3>
              <p>Elegant tables ranging from intimate dinners to large banquet setups.</p>
            </div>
            <div className="offering-item">
              <h3>Chair Covers</h3>
              <p>Beautiful chair covers to transform your seating arrangements.</p>
            </div>
            <div className="offering-item">
              <h3>Chafing Dishes</h3>
              <p>Professional catering equipment to keep your food warm and fresh.</p>
            </div>
            
            
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="about-container">
          <div className="stats-grid">
            <div className="stat">
              <h3>100+</h3>
              <p>Happy Customers</p>
            </div>
            <div className="stat">
              <h3>5+</h3>
              <p>Years of Experience</p>
            </div>
            <div className="stat">
              <h3>100%</h3>
              <p>Quality Guarantee</p>
            </div>
            <div className="stat">
              <h3>24/7</h3>
              <p>Customer Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta">
        <div className="about-container">
          <h2>Ready to Plan Your Event?</h2>
          <p>Browse our wide selection of rental items and create an unforgettable experience.</p>
          <a href="/category" className="cta-btn">Explore Our Items</a>
        </div>
      </section>
    </div>
  );
};
