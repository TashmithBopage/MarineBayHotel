import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    setIsMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: sectionId } });
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <Link to="/" onClick={() => scrollToSection('hero')} className="navbar-logo">
          <span className="logo-letter">M</span>
        </Link>

        <button
          type="button"
          className="mobile-menu-toggle"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X size={25} /> : <Menu size={25} />}
        </button>

        <nav className={`navbar-menu ${isMenuOpen ? 'open' : ''}`}>
          <button 
            type="button" 
            className="nav-link nav-button" 
            onClick={() => scrollToSection('hero')}
          >
            Home
          </button>
          
          <button 
            type="button" 
            className="nav-link nav-button" 
            onClick={() => scrollToSection('about')}
          >
            About Us
          </button>

          <Link to="/rooms" onClick={closeMenu} className={`nav-link ${location.pathname === '/rooms' ? 'active' : ''}`}>
            Rooms
          </Link>

          <Link to="/gallery" onClick={closeMenu} className={`nav-link ${location.pathname === '/gallery' ? 'active' : ''}`}>
            Gallery
          </Link>

          <Link to="/offers" onClick={closeMenu} className={`nav-link ${location.pathname === '/offers' ? 'active' : ''}`}>
            Offers
          </Link>

          <Link to="/contact" onClick={closeMenu} className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`}>
            Contact Us
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
