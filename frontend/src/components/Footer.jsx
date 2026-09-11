import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { MapPin, Phone, Mail, Globe } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (sectionId) => {
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: sectionId } });
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <div className="brand-header">
            <span className="footer-logo-letter">M</span>
            <div className="brand-text">
              <h3>MARINE BAY</h3>
              <span className="brand-tagline">LUXURY COASTAL SANCTUARY</span>
            </div>
          </div>
          <p className="brand-description">
            Where modern luxury seamlessly blends with the tranquil, unforgettable rhythm of the ocean.
          </p>
        </div>

        <div className="footer-column">
          <h4 className="column-title">NAVIGATION</h4>
          <ul className="footer-links">
            <li><button type="button" onClick={() => scrollToSection('hero')}>Home</button></li>
            <li><button type="button" onClick={() => scrollToSection('about')}>About Us</button></li>
            <li><Link to="/rooms">Rooms</Link></li>
            <li><Link to="/gallery">Gallery</Link></li>
            <li><Link to="/offers">Offers</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4 className="column-title">OUR HOTEL</h4>
          <ul className="footer-links">
            <li><a href="#privacy">Privacy Policy</a></li>
            <li><a href="#terms">Terms of Service</a></li>
            <li><a href="#cookies">Cookie Settings</a></li>
            <li><a href="#accessibility">Accessibility</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4 className="column-title">CONNECT & INQUIRE</h4>
          <ul className="contact-info">
            <li>
              <MapPin size={16} className="contact-icon" />
              <span>720 Marina Vista Way, Oceanside, California</span>
            </li>
            <li>
              <Phone size={16} className="contact-icon" />
              <span>+1 (800) 450-9830</span>
            </li>
            <li>
              <Mail size={16} className="contact-icon" />
              <span>stay@marinebayhotel.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 Marine Bay Hotel. All rights reserved. Crafted for tranquility and luxury.</p>
        <div className="social-icons">
          <a href="https://www.instagram.com/__mesith__" target="_blank" rel="noreferrer" aria-label="Instagram">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
          </a>
          <a href="https://www.facebook.com/share/1CUV4iZ9K4/" target="_blank" rel="noreferrer" aria-label="Facebook">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
          </a>
          <a href="https://x.com/bopagemesi50662?s=11" target="_blank" rel="noreferrer" aria-label="X">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 4l14 16M19 4L5 20"></path></svg>
          </a>
          <a href="#website" aria-label="Website"><Globe size={18} /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
