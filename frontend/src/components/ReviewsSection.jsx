import React, { useEffect, useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Trash2 } from 'lucide-react';
import AnimatedHeading from './AnimatedHeading';
import './ReviewsSection.css';

const initialReviews = [
  {
    id: 1,
    name: 'John',
    rating: 5,
    comment: 'An absolute paradise the ocean views from the room were breathtaking.'
  },
  {
    id: 2,
    name: 'Peter',
    rating: 5,
    comment: 'The perfect coastal escape; we cannot wait to booking our next stay.'
  },
  {
    id: 3,
    name: 'David',
    rating: 5,
    comment: 'Flawless service and the most relaxing infinity pool I\'ve ever experienced.'
  },
  {
    id: 4,
    name: 'Sophia',
    rating: 5,
    comment: 'Exquisite dining and unmatched hospitality. Marine Bay Hotel exceeded all expectations.'
  }
];

const ReviewsSection = () => {
  const [reviews, setReviews] = useState(() => {
    try {
      const savedReviews = window.localStorage.getItem('marine-bay-reviews');
      return savedReviews ? [...initialReviews, ...JSON.parse(savedReviews)] : initialReviews;
    } catch {
      return initialReviews;
    }
  });
  const [scrollIndex, setScrollIndex] = useState(0);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isRatingOpen, setIsRatingOpen] = useState(false);
  const [formValues, setFormValues] = useState({ name: '', rating: 5, comment: '' });

  const maxScrollIndex = Math.max(reviews.length - 3, 0);

  useEffect(() => {
    const submittedReviews = reviews.slice(initialReviews.length);
    window.localStorage.setItem('marine-bay-reviews', JSON.stringify(submittedReviews));
  }, [reviews]);

  const handleNext = () => {
    setScrollIndex((prev) => (prev + 1) % (maxScrollIndex + 1));
  };

  const handlePrev = () => {
    setScrollIndex((prev) => (prev - 1 + maxScrollIndex + 1) % (maxScrollIndex + 1));
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormValues((currentValues) => ({ ...currentValues, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newReview = {
      id: `review-${Date.now()}`,
      name: formValues.name.trim(),
      rating: Number(formValues.rating),
      comment: formValues.comment.trim()
    };

    setReviews((currentReviews) => [...currentReviews, newReview]);
    setFormValues({ name: '', rating: 5, comment: '' });
    setIsFormOpen(false);
    setScrollIndex(Math.max(reviews.length - 2, 0));
  };

  const handleRemoveReview = (reviewId) => {
    setReviews((currentReviews) => currentReviews.filter((review) => review.id !== reviewId));
    setScrollIndex((currentIndex) => Math.min(currentIndex, Math.max(reviews.length - 4, 0)));
  };

  return (
    <section id="reviews" className="reviews-section">
      <div className="reviews-header">
        <AnimatedHeading className="reviews-title">Reviews</AnimatedHeading>
        <button type="button" className="write-review-btn" onClick={() => setIsFormOpen(true)}>
          Write a Review
        </button>
      </div>

      <div className="reviews-carousel-wrapper">
        <button type="button" className="carousel-nav-btn left" onClick={handlePrev}>
          <ChevronLeft size={20} />
        </button>

        <div className="reviews-grid">
          {reviews.slice(scrollIndex, scrollIndex + 3).map((review) => (
            <div key={review.id} className="review-card">
              <div className="review-card-header">
                <h3 className="reviewer-name">{review.name}</h3>
                {typeof review.id === 'string' && review.id.startsWith('review-') && (
                  <button
                    type="button"
                    className="remove-review-btn"
                    onClick={() => handleRemoveReview(review.id)}
                    aria-label={`Remove review by ${review.name}`}
                    title="Remove review"
                  >
                    <Trash2 size={17} />
                  </button>
                )}
              </div>
              <div className="star-rating">
                {[...Array(review.rating)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={22} 
                    className="star-icon filled"
                  />
                ))}
              </div>
              <p className="review-comment">{review.comment}</p>
            </div>
          ))}
        </div>

        <button type="button" className="carousel-nav-btn right" onClick={handleNext}>
          <ChevronRight size={20} />
        </button>
      </div>

      {isFormOpen && (
        <div className="review-modal-backdrop" role="presentation" onMouseDown={() => setIsFormOpen(false)}>
          <div className="review-modal" role="dialog" aria-modal="true" aria-labelledby="review-form-title" onMouseDown={(event) => event.stopPropagation()}>
            <div className="review-modal-header">
              <h2 id="review-form-title">Write a Review</h2>
              <button type="button" className="review-modal-close" aria-label="Close review form" onClick={() => setIsFormOpen(false)}>
                &times;
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <label htmlFor="reviewer-name-input">Your name</label>
              <input id="reviewer-name-input" name="name" type="text" value={formValues.name} onChange={handleFormChange} required maxLength={40} />

              <label id="review-rating-label">Rating</label>
              <div className="rating-picker">
                <button
                  type="button"
                  className="rating-picker-toggle"
                  aria-haspopup="listbox"
                  aria-expanded={isRatingOpen}
                  aria-labelledby="review-rating-label"
                  onClick={() => setIsRatingOpen((isOpen) => !isOpen)}
                >
                  <span className="rating-picker-stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} size={19} className={star <= formValues.rating ? 'picker-star active' : 'picker-star'} />
                    ))}
                  </span>
                  <span className="rating-picker-value">{formValues.rating} stars</span>
                  <span className="rating-picker-arrow">{isRatingOpen ? '▲' : '▼'}</span>
                </button>
                {isRatingOpen && (
                  <div className="rating-picker-menu" role="listbox" aria-label="Choose a rating">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <button
                        key={rating}
                        type="button"
                        className={`rating-picker-option ${formValues.rating === rating ? 'selected' : ''}`}
                        role="option"
                        aria-selected={formValues.rating === rating}
                        onClick={() => {
                          setFormValues((currentValues) => ({ ...currentValues, rating }));
                          setIsRatingOpen(false);
                        }}
                      >
                        <span className="rating-option-stars">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} size={18} className={star <= rating ? 'picker-star active' : 'picker-star'} />
                          ))}
                        </span>
                        <span>{rating} {rating === 1 ? 'star' : 'stars'}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <label htmlFor="review-comment-input">Your review</label>
              <textarea id="review-comment-input" name="comment" value={formValues.comment} onChange={handleFormChange} required maxLength={300} rows="4" />
              <button type="submit" className="review-submit-btn">Submit Review</button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default ReviewsSection;
