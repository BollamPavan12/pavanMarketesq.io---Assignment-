// src/components/BookingForm.js
import React, { useState } from 'react';
import './BookingForm.css';
import { FaHotel, FaUsers, FaCalendarAlt, FaMoneyBillWaveAlt } from 'react-icons/fa'; // Removed FaChild

const BookingForm = () => {
  // State to hold form data
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [rooms, setRooms] = useState(1);
  const [adults, setAdults] = useState(1);  // State for adults
  const [children, setChildren] = useState(0);  // State for children
  const [confirmation, setConfirmation] = useState(null);

  // Static hotel address
  const hotelAddress = 'Hotel Ladakh Paradise, Leh, Ladakh, India';

  // Calculate price based on rooms, adults, children, and duration
  const calculatePrice = (checkInDate, checkOutDate, numRooms, numAdults, numChildren) => {
    const checkInTime = new Date(checkInDate).getTime();
    const checkOutTime = new Date(checkOutDate).getTime();
    const days = (checkOutTime - checkInTime) / (1000 * 3600 * 24); // Days difference
    
    const adultPrice = 1000;  // Price per adult per room
    const childPrice = 500;   // Price per child per room

    return (
      days * numRooms * (numAdults * adultPrice + numChildren * childPrice)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Ensure the check-in and check-out dates are valid
    if (new Date(checkIn) >= new Date(checkOut)) {
      alert('Check-out date must be later than check-in date!');
      return;
    }

    // Calculate the price
    const totalPrice = calculatePrice(checkIn, checkOut, rooms, adults, children);

    setConfirmation({
      name,
      email,
      checkIn,
      checkOut,
      rooms,
      adults,
      children,
      price: totalPrice,  // Price is directly passed in confirmation
      hotelAddress,
    });
  };

  return (
    <div className="booking-form">
      {!confirmation ? (
        <div>
          <h2>Book Your Stay in Ladakh</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
            <input
              type="number"
              placeholder="Number of rooms"
              value={rooms}
              onChange={(e) => setRooms(e.target.value)}
              min="1"
            />
            <div className="person-category">
              <div>
                <label>Adults:</label>
                <input
                  type="number"
                  value={adults}
                  onChange={(e) => setAdults(e.target.value)}
                  min="1"
                />
              </div>
              <div>
                <label>Children:</label>
                <input
                  type="number"
                  value={children}
                  onChange={(e) => setChildren(e.target.value)}
                  min="0"
                />
              </div>
            </div>
            <button type="submit">Book Now</button>
          </form>
        </div>
      ) : (
        <div className="confirmation-card">
          <div className="confirmation-header">
            <h3>Booking Confirmation</h3>
          </div>

          <div className="confirmation-body">
            <div className="info-section">
              <FaUsers className="icon" />
              <p><strong>Guests:</strong> {confirmation.adults} Adults, {confirmation.children} Children</p>
            </div>
            <div className="info-section">
              <FaHotel className="icon" />
              <p><strong>Hotel:</strong> {confirmation.hotelAddress}</p>
            </div>
            <div className="info-section">
              <FaCalendarAlt className="icon" />
              <p className="check-in"><strong>Check-in:</strong> {confirmation.checkIn}</p>
              <p className="check-out"><strong>Check-out:</strong> {confirmation.checkOut}</p>
            </div>
            <div className="info-section">
              <FaMoneyBillWaveAlt className="icon" />
              <p className="total-price"><strong>Total Price:</strong> ₹{confirmation.price}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingForm;
