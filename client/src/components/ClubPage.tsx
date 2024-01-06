import React from 'react';
import NavBar from './NavigationBar';
import { Link, useParams } from 'react-router-dom';

export default function ClubPage() {
  // Get the clubName parameter from the URL
  const { clubName } = useParams();

  return (
    <div style={{ textAlign: 'center' }}>
      <NavBar />
      {/* Display Club Name */}
      <h2
        style={{
          fontSize: '36px',
          color: '#333',
          margin: '20px 0',
          fontFamily: 'Arial, sans-serif'
        }}
      >
        Club page - {clubName ? decodeURIComponent(clubName) : 'Unknown Club'}
      </h2>

      {/* Add a Go Back button */}
      <Link to="/my_clubs" style={buttonStyle}>
        Go Back
      </Link>
    </div>
  );
}

// Button style for Go Back button
const buttonStyle = {
  width: '150px',
  padding: '15px 20px',
  margin: '15px',
  cursor: 'pointer',
  border: 'none',
  borderRadius: '10px',
  background: '#007bff',
  color: 'white',
  fontSize: '20px',
  boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
  transition: 'all 0.2s'
};
