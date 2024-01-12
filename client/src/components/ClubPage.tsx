import React from 'react';
import NavBar from './NavigationBar';
import { Link } from 'react-router-dom';
import '../ClubPage.css'; // Import the CSS file

export default function ClubPage() {
  return (
    <div className="club-page-container">
      <NavBar />
      <h2 className="club-page-heading">
        Club Page
      </h2>

      {/* Add a Go Back button */}
      <Link to="/my_clubs" className="go-back-button">
        Go Back
      </Link>
    </div>
  );
}
