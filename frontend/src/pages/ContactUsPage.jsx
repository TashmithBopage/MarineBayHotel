import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, CheckCircle2 } from 'lucide-react';
import contactHeroImg from '../assets/images/gallery-1.jpg';
import AnimatedHeading from '../components/AnimatedHeading';
import './ContactUsPage.css';

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const apiHost = window.location.hostname || 'localhost';
      const response = await fetch(`http://${apiHost}:5000/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        setError(data.error || 'Something went wrong. Please try again.');
      }
    } catch (requestError) {
      console.error('Contact form request failed:', requestError);
      setError('The contact service is unavailable. Please make sure the hotel server is running and try again.');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero-section">
        <div className="contact-hero-bg">
          <img src={contactHeroImg} alt="Contact Us - Marine Bay Hotel" />
          <div className="contact-hero-overlay"></div>
        </div>
        <div className="contact-hero-content">
          <AnimatedHeading as="h1" className="contact-hero-heading">Contact Us</AnimatedHeading>
          <p className="contact-hero-subheading">When You Needed</p>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="contact-content-section">
        <div className="contact-container">
          <div className="contact-header-area">
            <AnimatedHeading className="contact-main-title">Contact Us</AnimatedHeading>
            <p className="contact-main-description">
              We would be delighted to hear from you. Please fill out the form below or reach out to our concierge directly.
            </p>
          </div>

          <div className="contact-layout-grid">
            {/* Left Column: Form */}
            <div className="contact-form-column">
              {submitted ? (
                <div className="contact-success-state">
                  <CheckCircle2 size={52} className="success-icon" />
                  <h3>Thank You, {formData.name || 'Valued Guest'}!</h3>
                  <p>Your inquiry has been received. Our concierge team will reach out to you shortly.</p>
                  <button 
                    type="button" 
                    className="btn-new-message"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', phone: '', message: '' });
                    }}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="concierge-form">
                  <div className="form-two-fields-row">
                    <div className="form-field-group">
                      <label htmlFor="name" className="field-label">NAME</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={handleChange}
                        className="form-input"
                      />
                    </div>

                    <div className="form-field-group">
                      <label htmlFor="email" className="field-label">EMAIL</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div className="form-field-group">
                    <label htmlFor="phone" className="field-label">PHONE</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>

                  <div className="form-field-group">
                    <label htmlFor="message" className="field-label">MESSAGE</label>
                    <textarea
                      id="message"
                      name="message"
                      rows="6"
                      required
                      placeholder="How can we assist you?"
                      value={formData.message}
                      onChange={handleChange}
                      className="form-textarea"
                    ></textarea>
                  </div>

                  <div className="form-submit-row">
                    {error && <p className="form-error-msg">{error}</p>}
                    <button type="submit" className="contact-submit-btn" disabled={loading}>
                      {loading ? 'Sending…' : 'Send Message'}
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Right Column: Contact Details & Coastal Map Card */}
            <div className="contact-info-column">
              <ul className="direct-contact-list">
                <li className="direct-contact-item">
                  <MapPin size={18} className="direct-contact-icon" />
                  <span>720 Marina Vista Way, Oceanside, California.</span>
                </li>
                <li className="direct-contact-item">
                  <Phone size={18} className="direct-contact-icon" />
                  <span>+1 (800) 450-9830</span>
                </li>
                <li className="direct-contact-item">
                  <Mail size={18} className="direct-contact-icon" />
                  <span>stay@marinebayhotel.com</span>
                </li>
              </ul>

              {/* Find Us Section & Custom Map Card */}
              <div className="find-us-section">
                <span className="find-us-label">FIND US</span>
                <div className="coastal-map-card">
                  <svg viewBox="0 0 420 220" className="map-illustration-svg" xmlns="http://www.w3.org/2000/svg">
                    {/* Sand / Land Area */}
                    <rect width="420" height="220" fill="#E8DEC8" />
                    
                    {/* Ocean / Coastal Water */}
                    <path d="M 0,0 L 130,0 C 120,45 105,95 115,140 C 125,185 105,220 90,220 L 0,220 Z" fill="#9FBCC4" />
                    <path d="M 0,0 L 115,0 C 105,45 92,95 102,140 C 112,185 92,220 80,220 L 0,220 Z" fill="#8EAFB7" />

                    {/* Coastal Pier / Boardwalk */}
                    <rect x="95" y="105" width="45" height="10" fill="#D2B48C" stroke="#B8977E" strokeWidth="1" rx="2" />
                    <rect x="135" y="100" width="12" height="20" fill="#D2B48C" stroke="#B8977E" strokeWidth="1" rx="2" />

                    {/* Hotel Building Footprints */}
                    <g fill="#DCD3BE" stroke="#C4B99F" strokeWidth="1">
                      <rect x="160" y="40" width="60" height="35" rx="3" />
                      <rect x="230" y="45" width="70" height="40" rx="3" />
                      <rect x="175" y="85" width="115" height="50" rx="4" />
                      <rect x="195" y="145" width="90" height="30" rx="3" />
                      <circle cx="230" cy="110" r="14" fill="#A4C4CD" stroke="#8CAFB8" strokeWidth="1.5" />
                    </g>

                    {/* Pathways */}
                    <path d="M 140,110 L 175,110" stroke="#C2B599" strokeWidth="3" strokeDasharray="4 2" />
                    <path d="M 230,85 L 230,96" stroke="#C2B599" strokeWidth="2" />

                    {/* Compass / Location Pin */}
                    <g transform="translate(380, 25)">
                      <circle cx="0" cy="0" r="12" fill="rgba(255,255,255,0.7)" />
                      <path d="M 0,-8 L 3,0 L 0,8 L -3,0 Z" fill="#786B59" />
                      <path d="M -8,0 L 0,3 L 8,0 L 0,-3 Z" fill="#9C8F7E" />
                    </g>

                    {/* Hotel Label */}
                    <text x="230" y="198" textAnchor="middle" fill="#6E624E" fontFamily="'Playfair Display', serif" fontSize="11" letterSpacing="2">
                      OCEANSIDE HOTEL, CALIFORNIA
                    </text>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUsPage;
