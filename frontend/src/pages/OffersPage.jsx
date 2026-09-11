import React, { useEffect } from 'react';
import offersHeroImg from '../assets/images/offers-hero.jpg';
import AnimatedHeading from '../components/AnimatedHeading';
import './OffersPage.css';

// Active offers array (empty by default as per UI design; easily populated when active promotions exist)
const activeOffers = [];

const OffersPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="offers-page">
      {/* Hero Section */}
      <section className="offers-hero-section">
        <div className="offers-hero-bg">
          <img src={offersHeroImg} alt="Hotel Offers - Marine Bay Hotel" />
          <div className="offers-hero-overlay"></div>
        </div>
        <div className="offers-hero-content">
          <AnimatedHeading as="h1" className="offers-hero-heading">Hotel Offers</AnimatedHeading>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="offers-content-section">
        <div className="offers-container">
          {activeOffers.length === 0 ? (
            <div className="no-offers-container">
              <h2 className="no-offers-text">
                <span className="bullet-symbol">•</span> We Do Not Have Any Active Offers or Promotions At This Time.
              </h2>
            </div>
          ) : (
            <div className="active-offers-grid">
              {activeOffers.map((offer) => (
                <div key={offer.id} className="offer-card">
                  <div className="offer-card-image">
                    <img src={offer.image} alt={offer.title} />
                    <span className="discount-tag">{offer.discount}</span>
                  </div>
                  <div className="offer-card-body">
                    <h3>{offer.title}</h3>
                    <p>{offer.description}</p>
                    <div className="offer-card-footer">
                      <span className="promo-code">{offer.code}</span>
                      <button type="button" className="btn-claim">Claim Offer</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default OffersPage;
