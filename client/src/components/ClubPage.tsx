import { useState } from "react";
import NavBar from "./NavigationBar";

export default function ClubDetailPage() {
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

      <h2 className="club-heading">Club</h2>

      <div className="join-button-container">
        <button onClick={joinClub} className="join-button">
          Join Club
        </button>
      </div>

      {showPopup && <div className="popup">Club has been joined!</div>}
    </div>
  );
}
