import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, ArrowRightCircle } from 'lucide-react';
import heroImg from '../assets/images/hero.jpg';
import AnimatedHeading from './AnimatedHeading';
import './HeroSection.css';

const HeroSection = () => {
  const [arrivalDate, setArrivalDate] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate('/rooms', { state: { arrivalDate, departureDate } });
  };

  return (
    <section id="hero" className="hero-section">
      <div className="hero-bg-wrapper">
        <img src={heroImg} alt="Marine Bay Resort Infinity Pool" className="hero-bg-image" />
        <div className="hero-overlay"></div>
      </div>

      <div className="hero-content">
        <AnimatedHeading as="h1" className="hero-title">Welcome To Marine Bay Hotel</AnimatedHeading>

        <form className="booking-search-bar" onSubmit={handleSearch}>
          <div className="search-input-group">
            <span className="search-label">Arrival</span>
            <div className="input-with-icon">
              <input
                type="date"
                value={arrivalDate}
                onChange={(e) => setArrivalDate(e.target.value)}
                className="date-input"
              />
              <MessageSquare className="input-icon" size={18} />
            </div>
          </div>

          <div className="search-input-group">
            <span className="search-label">Departure</span>
            <div className="input-with-icon">
              <input
                type="date"
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
                className="date-input"
              />
              <MessageSquare className="input-icon" size={18} />
            </div>
          </div>

          <button type="submit" className="search-btn">
            <span>Search</span>
            <ArrowRightCircle size={22} className="search-arrow-icon" />
          </button>
        </form>
      </div>
    </section>
  );
};

export default HeroSection;
