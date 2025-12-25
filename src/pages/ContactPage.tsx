import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import { useState } from 'react';

export const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to a server
    console.log('Form submitted:', formData);
    setSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="contact-hero-content">
          <h1>Get In Touch With Us</h1>
          <p>We'd Love to Help Plan Your Perfect Event</p>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="contact-section">
        <div className="contact-container">
          <div className="contact-grid">
            {/* Contact Information */}
            <div className="contact-info">
              <h2>Contact Information</h2>
              
              <div className="info-item">
                <FaPhone className="info-icon" />
                <div>
                  <h3>Phone</h3>
                  <p><a href="tel:+233240291516">+233240291516</a></p>
                  <p className="small-text">Mon - Fri: 7:00 AM - 5:00 PM</p>
                </div>
              </div>

              <div className="info-item">
                <FaEnvelope className="info-icon" />
                <div>
                  <h3>Email</h3>
                  <p><a href="mailto:fojrentals@gmail.com">fojrentals@gmail.com</a></p>
                  <p className="small-text">We'll respond within an hours</p>
                </div>
              </div>

              <div className="info-item">
                <FaMapMarkerAlt className="info-icon" />
                <div>
                  <h3>Address</h3>
                  <p> East Legon<br />Accra</p>
                  <p className="small-text">Visit us for product demonstrations</p>
                </div>
              </div>

              <div className="info-item">
                <FaClock className="info-icon" />
                <div>
                  <h3>Business Hours</h3>
                  <p>Monday - Friday: 7:00 AM - 5:00 PM<br />
                  Saturday: 9:00 AM - 4:00 PM<br />
                  Sunday: Upon Request</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="contact-form-wrapper">
              <h2>Send Us a Message</h2>
              {submitted ? (
                <div className="success-message">
                  <h3>Thank You!</h3>
                  <p>Your message has been sent successfully. We'll get back to you soon!</p>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your Name"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="your@email.com"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Your Phone Number"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="subject">Subject *</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      placeholder="Event Inquiry"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Message *</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Tell us about your event..."
                    ></textarea>
                  </div>

                  <button type="submit" className="submit-btn">Send Message</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="map-section">
        <div className="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.7829828819356!2d-0.1769577!3d5.6534622!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf9a0d0d0d0d0d%3A0x0!2sEast%20Legon%2C%20Accra%2C%20Ghana!5e0!3m2!1sen!2sgh!4v1702921800000"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="contact-container">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h3>What's your delivery radius?</h3>
              <p>We deliver across Accra and surrounding areas. Contact us for delivery to other locations.</p>
            </div>
            <div className="faq-item">
              <h3>Can I customise my order?</h3>
              <p>Absolutely! We offer custom packages tailored to your event needs. Call us to discuss.</p>
            </div>
            <div className="faq-item">
              <h3>What's your cancellation policy?</h3>
              <p>Cancellations made 7 days before the event receive a full refund. See our terms for details.</p>
            </div>
            <div className="faq-item">
              <h3>Do you provide setup services?</h3>
              <p>Yes, we offer professional setup and breakdown services for an additional fee.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
