import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRightCircle, ArrowLeft, ArrowRight } from 'lucide-react';
import gallery1 from '../assets/images/gallery-1.jpg';
import gallery2 from '../assets/images/gallery-2.jpg';
import gallery3 from '../assets/images/gallery-3.jpg';
import AnimatedHeading from './AnimatedHeading';
import './GallerySection.css';

const galleryImages = [
  { id: 1, src: gallery1, alt: 'Ocean View Suite', title: 'Ocean View Suite' },
  { id: 2, src: gallery2, alt: 'Resort Illuminated Pool', title: 'Luxury Resort Pool' },
  { id: 3, src: gallery3, alt: 'Twilight Infinity Pool', title: 'Twilight Palm Pool' },
];

const GallerySection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % galleryImages.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + galleryImages.length) % galleryImages.length);
  };

  return (
    <section id="gallery" className="gallery-section">
      <div className="gallery-header">
        <AnimatedHeading className="gallery-title" onClick={() => navigate('/gallery')} style={{ cursor: 'pointer' }}>
          Gallery
        </AnimatedHeading>
        <button 
          type="button" 
          className="gallery-arrow-btn" 
          onClick={() => navigate('/gallery')} 
          title="View Full Photo Gallery"
        >
          <ArrowRightCircle size={32} />
        </button>
      </div>

      <div className="gallery-container">
        <div className="gallery-grid">
          {galleryImages.map((image, index) => (
            <div
              key={image.id}
              className={`gallery-card ${index === currentIndex ? 'highlight' : ''}`}
              onClick={() => navigate('/gallery')}
              style={{ cursor: 'pointer' }}
            >
              <div className="image-wrapper">
                <img src={image.src} alt={image.alt} />
                <div className="image-caption">
                  <span>{image.title}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="gallery-mobile-controls">
          <button type="button" className="ctrl-btn" onClick={handlePrev}>
            <ArrowLeft size={20} />
          </button>
          <span className="ctrl-indicator">{currentIndex + 1} / {galleryImages.length}</span>
          <button type="button" className="ctrl-btn" onClick={handleNext}>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
