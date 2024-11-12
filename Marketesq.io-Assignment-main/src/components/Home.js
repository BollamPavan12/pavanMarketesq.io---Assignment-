// src/components/Home.js
import React from 'react';
import BookingCard from './BookingCard';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <div className="home-intro">
        <h2>Welcome to Brisphere</h2>
        <p>
          Work and travel at the same time! Brisphere makes it possible to
          combine your remote job with an unforgettable experience in Ladakh.
        </p>
      </div>
      <BookingCard />
    </div>
  );
};

export default Home;
