import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Check, X } from 'lucide-react';
import roomsHeroImg from '../assets/images/rooms-hero.jpg';
import singleRoomImg from '../assets/images/single-room.jpg';
import doubleRoomImg from '../assets/images/double-room.jpg';
import tripleRoomImg from '../assets/images/triple-room.jpg';
import AnimatedHeading from '../components/AnimatedHeading';
import './RoomsPage.css';

const initialRoomsData = [
  {
    id: 'single-room',
    name: 'Single Room',
    price: '$ 50',
    image: singleRoomImg,
    bedAndBreakfast: true,
    fullBoard: true,
    dd: '',
    mm: '',
    yyyy: ''
  },
  {
    id: 'double-room',
    name: 'Double Room',
    price: '$ 100',
    image: doubleRoomImg,
    bedAndBreakfast: true,
    fullBoard: true,
    dd: '',
    mm: '',
    yyyy: ''
  },
  {
    id: 'triple-room',
    name: 'Triple Room',
    price: '$ 150',
    image: tripleRoomImg,
    bedAndBreakfast: true,
    fullBoard: true,
    dd: '',
    mm: '',
    yyyy: ''
  }
];

const roomPrices = {
  'single-room': { bedAndBreakfast: 25, fullBoard: 50 },
  'double-room': { bedAndBreakfast: 50, fullBoard: 100 },
  'triple-room': { bedAndBreakfast: 75, fullBoard: 150 }
};

const getRoomPrice = (room) => {
  const prices = roomPrices[room.id];
  if (room.fullBoard) return prices.fullBoard;
  if (room.bedAndBreakfast) return prices.bedAndBreakfast;
  return 0;
};

const formatPrice = (price) => `$ ${Number.isInteger(price) ? price : price.toFixed(2)}`;

const formatDateParts = (date) => {
  if (!date) return { dd: '', mm: '', yyyy: '' };
  const [yyyy, mm, dd] = date.split('-');
  return { dd, mm, yyyy };
};

const RoomsPage = () => {
  const location = useLocation();
  const [rooms, setRooms] = useState(initialRoomsData);
  const [departureDate, setDepartureDate] = useState('');
  const [onlineNoticeOpen, setOnlineNoticeOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    const dateParts = formatDateParts(location.state?.arrivalDate);
    setDepartureDate(location.state?.departureDate || '');
    setRooms((currentRooms) => currentRooms.map((room) => ({ ...room, ...dateParts })));
  }, [location.state]);

  const handleCheckboxChange = (id, field) => {
    setRooms(prevRooms =>
      prevRooms.map(room =>
        room.id === id ? { ...room, [field]: !room[field] } : room
      )
    );
  };

  const handleDateChange = (id, field, value) => {
    const numericValue = value.replace(/\D/g, '');
    let maxLength = 2;
    if (field === 'yyyy') maxLength = 4;
    const finalValue = numericValue.slice(0, maxLength);

    setRooms(prevRooms =>
      prevRooms.map(room =>
        room.id === id ? { ...room, [field]: finalValue } : room
      )
    );
  };

  const handleWhatsAppBooking = (room) => {
    const mealPlans = [];
    if (room.bedAndBreakfast) mealPlans.push('Bed & Breakfast');
    if (room.fullBoard) mealPlans.push('Full Board');

    const arrivalDate = room.dd && room.mm && room.yyyy
      ? `${room.dd}/${room.mm}/${room.yyyy}`
      : 'Date to be confirmed';

    const endDate = departureDate ? formatDateParts(departureDate) : null;
    const departureDateText = endDate?.dd && endDate?.mm && endDate?.yyyy
      ? `${endDate.dd}/${endDate.mm}/${endDate.yyyy}`
      : 'Date to be confirmed';
    const message = `Hello Marine Bay Hotel! I would like to book the ${room.name} (${formatPrice(getRoomPrice(room))}) from ${arrivalDate} to ${departureDateText}. Meal preferences: ${mealPlans.join(', ') || 'Room Only'}.`;
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/94785226544?text=${encoded}`, '_blank');
  };

  const handleOnlineBooking = () => {
    setOnlineNoticeOpen(true);
  };

  return (
    <div className="rooms-page">
      {/* Hero Section */}
      <section className="rooms-hero-section">
        <div className="rooms-hero-bg">
          <img src={roomsHeroImg} alt="Explore Our Rooms" />
          <div className="rooms-hero-overlay"></div>
        </div>
        <div className="rooms-hero-content">
          <AnimatedHeading as="h1" className="rooms-hero-heading">Explore Our Rooms</AnimatedHeading>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="rooms-content-section">
        <div className="rooms-container">
          <AnimatedHeading className="rooms-main-title">A Best Place To Enjoy Your Life</AnimatedHeading>

          <div className="rooms-list">
            {rooms.map((room) => (
              <div key={room.id} className="room-card-item">
                {/* Left: Image with Price Tag */}
                <div className="room-image-column">
                  <div className="room-image-frame">
                    <img src={room.image} alt={room.name} />
                    <div className="room-price-tag">
                      <span>{formatPrice(getRoomPrice(room))}</span>
                    </div>
                  </div>
                </div>

                {/* Right: Info & Controls */}
                <div className="room-details-column">
                  {/* Title & Offers Button */}
                  <div className="room-header-row">
                    <h3 className="room-type-title">{room.name}</h3>
                    <button
                      type="button"
                      className="room-offers-btn"
                      onClick={() => navigate('/offers')}
                    >
                      Offers
                    </button>
                  </div>

                  {/* Date Input Fields (DD / MM / YYYY) */}
                  <div className="room-dates-row">
                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder="DD"
                      value={room.dd}
                      onChange={(e) => handleDateChange(room.id, 'dd', e.target.value)}
                      className="date-segment-input"
                    />
                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder="MM"
                      value={room.mm}
                      onChange={(e) => handleDateChange(room.id, 'mm', e.target.value)}
                      className="date-segment-input"
                    />
                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder="YYYY"
                      value={room.yyyy}
                      onChange={(e) => handleDateChange(room.id, 'yyyy', e.target.value)}
                      className="date-segment-input yyyy"
                    />
                  </div>

                  {/* Checkbox Options */}
                  <div className="room-options-group">
                    <div
                      className="room-option-item"
                      onClick={() => handleCheckboxChange(room.id, 'bedAndBreakfast')}
                    >
                      <span className="option-label">Bed & Breakfast</span>
                      <div className={`custom-checkbox ${room.bedAndBreakfast ? 'checked' : ''}`}>
                        {room.bedAndBreakfast && <Check size={14} strokeWidth={3} />}
                      </div>
                    </div>

                    <div
                      className="room-option-item"
                      onClick={() => handleCheckboxChange(room.id, 'fullBoard')}
                    >
                      <span className="option-label">Full Board</span>
                      <div className={`custom-checkbox ${room.fullBoard ? 'checked' : ''}`}>
                        {room.fullBoard && <Check size={14} strokeWidth={3} />}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="room-buttons-group">
                    <button
                      type="button"
                      className="room-action-btn"
                      onClick={() => handleWhatsAppBooking(room)}
                    >
                      Book Via WhatsApp
                    </button>
                    <button
                      type="button"
                      className="room-action-btn"
                      onClick={handleOnlineBooking}
                    >
                      Book Via Online
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {onlineNoticeOpen && (
        <div className="modal-overlay" onClick={() => setOnlineNoticeOpen(false)}>
          <div className="modal-card online-notice-card" role="dialog" aria-modal="true" aria-labelledby="online-notice-title" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              className="modal-close-x"
              onClick={() => setOnlineNoticeOpen(false)}
              title="Close"
              aria-label="Close message"
            >
              <X size={20} />
            </button>
            <h3 id="online-notice-title" className="modal-title">Online Booking</h3>
            <p className="online-notice-message">Online booking is currently unavailable. Please use WhatsApp to contact Marine Bay Hotel and complete your reservation.</p>
            <button type="button" className="modal-done-btn" onClick={() => setOnlineNoticeOpen(false)}>
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
};


export default RoomsPage;
