import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';
import galleryHeroImg from '../assets/images/gallery-hero.jpg';
import aboutImg from '../assets/images/about.jpg';
import heroImg from '../assets/images/hero.jpg';
import curvedPoolImg from '../assets/images/gallery-curved-pool.jpg';
import doubleRoomImg from '../assets/images/double-room.jpg';
import resortBuildingImg from '../assets/images/gallery-resort-building.jpg';
import beachImg from '../assets/images/gallery-beach.jpg';
import singleRoomImg from '../assets/images/single-room.jpg';
import tripleRoomImg from '../assets/images/triple-room.jpg';
import gallery2Img from '../assets/images/gallery-2.jpg';
import AnimatedHeading from '../components/AnimatedHeading';
import './GalleryPage.css';

// Initial 6 images matching Figma UI grid layout
const initialGalleryItems = [
  {
    id: 1,
    src: aboutImg,
    alt: 'Sunset Ocean View Bedroom',
    title: 'Sunset Ocean View Suite'
  },
  {
    id: 2,
    src: heroImg,
    alt: 'Main Swimming Pool & Cabanas',
    title: 'Oceanfront Swimming Pool'
  },
  {
    id: 3,
    src: curvedPoolImg,
    alt: 'Curved Resort Pool with Loungers',
    title: 'Lagoon Swimming Pool'
  },
  {
    id: 4,
    src: doubleRoomImg,
    alt: 'Luxury Coastal Double Room',
    title: 'Deluxe Oceanfront Room'
  },
  {
    id: 5,
    src: resortBuildingImg,
    alt: 'Tropical Resort Grounds & Architecture',
    title: 'Resort Villas & Palm Gardens'
  },
  {
    id: 6,
    src: beachImg,
    alt: 'Sunny Turquoise Beach & Palm Shore',
    title: 'Private White Sand Beach'
  }
];

// Extra images revealed on "Load More"
const additionalGalleryItems = [
  {
    id: 7,
    src: singleRoomImg,
    alt: 'Coastal Single Bedroom Suite',
    title: 'Coastal Suite with Ocean Balcony'
  },
  {
    id: 8,
    src: gallery2Img,
    alt: 'Evening Resort Pool & Building Lights',
    title: 'Resort Architecture by Night'
  },
  {
    id: 9,
    src: tripleRoomImg,
    alt: 'Presidential Family Suite',
    title: 'Grand Oceanfront Suite'
  }
];

const GalleryPage = () => {
  const [displayedItems, setDisplayedItems] = useState(initialGalleryItems);
  const [hasMore, setHasMore] = useState(true);
  
  // Lightbox Modal state
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const closeLightbox = React.useCallback(() => {
    setLightboxIndex(null);
    setIsZoomed(false);
  }, []);

  const nextPhoto = React.useCallback(() => {
    setIsZoomed(false);
    setLightboxIndex((prev) => (prev !== null ? (prev + 1) % displayedItems.length : null));
  }, [displayedItems.length]);

  const prevPhoto = React.useCallback(() => {
    setIsZoomed(false);
    setLightboxIndex((prev) => (prev !== null ? (prev - 1 + displayedItems.length) % displayedItems.length : null));
  }, [displayedItems.length]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextPhoto();
      if (e.key === 'ArrowLeft') prevPhoto();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, closeLightbox, nextPhoto, prevPhoto]);

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setIsZoomed(false);
  };

  const toggleZoom = (e) => {
    e.stopPropagation();
    setIsZoomed((prev) => !prev);
  };

  const handleLoadMore = () => {
    setDisplayedItems([...initialGalleryItems, ...additionalGalleryItems]);
    setHasMore(false);
  };

  return (
    <div className="gallery-page">
      {/* Hero Banner */}
      <section className="gallery-hero-section">
        <div className="gallery-hero-bg">
          <img src={galleryHeroImg} alt="Marine Bay Hotel Pool and Cabanas at Dusk" />
          <div className="gallery-hero-overlay"></div>
        </div>
        <div className="gallery-hero-content">
          <AnimatedHeading as="h1" className="gallery-hero-heading">Photo Gallery</AnimatedHeading>
        </div>
      </section>

      {/* Gallery Grid Section */}
      <section className="gallery-content-section">
        <div className="gallery-grid-container">
          <div className="gallery-two-column-grid">
            {displayedItems.map((item, index) => (
              <div 
                key={item.id} 
                className="gallery-grid-card"
                onClick={() => openLightbox(index)}
              >
                <div className="gallery-grid-image-wrapper">
                  <img src={item.src} alt={item.alt} />
                  <div className="gallery-card-hover-overlay">
                    <span className="gallery-zoom-badge">
                      <ZoomIn size={18} /> Click to View
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          {hasMore && (
            <div className="gallery-load-more-wrapper">
              <button 
                type="button" 
                className="gallery-load-more-btn"
                onClick={handleLoadMore}
              >
                Load More
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Fullscreen Lightbox Zoom Modal */}
      {lightboxIndex !== null && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          {/* Top Bar Controls */}
          <div className="lightbox-top-bar" onClick={(e) => e.stopPropagation()}>
            <span className="lightbox-counter">
              {lightboxIndex + 1} / {displayedItems.length}
            </span>
            <span className="lightbox-title">
              {displayedItems[lightboxIndex].title}
            </span>
            <div className="lightbox-controls">
              <button 
                type="button" 
                className="lightbox-ctrl-btn" 
                onClick={toggleZoom}
                title={isZoomed ? "Zoom Out" : "Zoom In"}
              >
                {isZoomed ? <ZoomOut size={22} /> : <ZoomIn size={22} />}
              </button>
              <button 
                type="button" 
                className="lightbox-ctrl-btn close-btn" 
                onClick={closeLightbox}
                title="Close (Esc)"
              >
                <X size={26} />
              </button>
            </div>
          </div>

          {/* Previous Button */}
          <button 
            type="button" 
            className="lightbox-nav-btn prev"
            onClick={(e) => { e.stopPropagation(); prevPhoto(); }}
            title="Previous Image (Left Arrow)"
          >
            <ChevronLeft size={36} />
          </button>

          {/* Centered Image Container with Zoom */}
          <div 
            className={`lightbox-image-container ${isZoomed ? 'zoomed' : ''}`}
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={displayedItems[lightboxIndex].src} 
              alt={displayedItems[lightboxIndex].alt}
              className={`lightbox-image ${isZoomed ? 'zoomed' : ''}`}
              onClick={toggleZoom}
              title={isZoomed ? "Click to Zoom Out" : "Click to Zoom In"}
            />
          </div>

          {/* Next Button */}
          <button 
            type="button" 
            className="lightbox-nav-btn next"
            onClick={(e) => { e.stopPropagation(); nextPhoto(); }}
            title="Next Image (Right Arrow)"
          >
            <ChevronRight size={36} />
          </button>
        </div>
      )}
    </div>
  );
};

export default GalleryPage;
