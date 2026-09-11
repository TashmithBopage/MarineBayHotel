import React from 'react';
import aboutImg from '../assets/images/about.jpg';
import AnimatedHeading from './AnimatedHeading';
import './AboutSection.css';

const AboutSection = () => {
  return (
    <section id="about" className="about-section">
      <div className="about-bg-wrapper">
        <img src={aboutImg} alt="Marine Bay Luxury Room View" className="about-bg-image" />
        <div className="about-overlay"></div>
      </div>

      <div className="about-content-container">
        <AnimatedHeading className="about-title">About Us</AnimatedHeading>

        <div className="about-text-content">
          <p>
            At Marine Bay Hotel, we redefine the coastal getaway by blending modern luxury with the tranquil rhythm of the ocean. Located along a pristine coastline, our hotel serves as a sanctuary for travelers seeking relaxation, adventure, and unmatched hospitality. Whether you are here for a romantic escape, a family vacation, or an inspiring corporate retreat, we provide an environment where unforgettable memories are made.
          </p>
          <p>
            Our beautifully appointed rooms and suites offer panoramic ocean views, contemporary design, and top-tier amenities to ensure your absolute comfort. From indulging in locally sourced cuisine at our signature waterfront restaurant to unwinding by our infinity pool, every detail of your stay is curated to perfection. At Marine Bay Hotel, our dedicated team is committed to delivering personalized service that makes you feel at home from the moment you arrive.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
