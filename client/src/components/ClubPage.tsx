import React, { useState } from 'react';
import NavBar from './NavigationBar';
import { useNavigate } from 'react-router-dom';
import '../ClubPage.css';

export default function ClubDetailPage() {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  const joinClub = () => {
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false); // Hide the popup after a few seconds
    }, 3000);
  };

  return (
    <div className="club-detail-container">
      <NavBar />

      {/* ... rest of your club detail content ... */}
      <h2 className="club-heading">Club Group</h2>

      <div className="join-button-container">
        <button onClick={joinClub} className="join-button">
          Join Club
        </button>
      </div>

      {showPopup && (
        <div className="popup">
          Club has been joined!
        </div>
      )}
    </div>
  );
}
