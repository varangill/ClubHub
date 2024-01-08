import React, { useState, useEffect } from 'react';
import NavBar from './NavigationBar';
import { Link } from 'react-router-dom';

export default function MyClubs() {
  const initialClubs = [
    { name: 'Tennis Club', id: 'tennis' },
    { name: 'Chess Club', id: 'chess' },
    { name: 'Reading Club', id: 'reading' },
    { name: 'Science Club', id: 'science' }
  ];

  const [clubs, setClubs] = useState(initialClubs);
  const [undoableClubs, setundoableClubs] = useState([]);
  const [query, setQuery] = useState('');

  // Function to handle leaving a club
  const leaveClub = (clubId) => {
    const leftClub = clubs.find((club) => club.id === clubId);
    setClubs(clubs.filter((club) => club.id !== clubId));
    setundoableClubs([...undoableClubs, leftClub]);

    // Set a timer to automatically remove the undo option after 30 seconds
    setTimeout(() => {
      setundoableClubs((undoableClubs) => undoableClubs.filter((club) => club.id !== clubId));
    }, 5000); // 30 seconds
  };

  // Function to handle undoing leave action
  const undoLeave = (clubId) => {
    const returnedClub = undoableClubs.find((club) => club.id === clubId);
    setClubs([...clubs, returnedClub]);
    setundoableClubs(undoableClubs.filter((club) => club.id !== clubId));
  };

  // Filter clubs based on query
  const filteredClubs = clubs.filter((club) =>
    club.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div style={{ textAlign: 'center' }}>
      <NavBar />

      {/* Total Club Count and Search Bar */}
      <div
        style={{
          position: 'absolute',
          top: '60px',
          right: '10px',
          fontSize: '18px',
          color: 'black'
        }}
      >
        Total Clubs Joined: {filteredClubs.length + undoableClubs.length}
      </div>

      <h2
        style={{
          fontSize: '36px',
          color: '#333',
          margin: '20px 0',
          fontFamily: 'Arial, sans-serif'
        }}
      >
        My Clubs
      </h2>

      <input
        type="text"
        placeholder="Search clubs..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          fontSize: '18px',
          padding: '10px',
          margin: '20px',
          width: '300px'
        }}
      />

      {/* Display Active Clubs */}
      <table style={{ margin: 'auto' }}>
        <tbody>
          {filteredClubs.map((club) => (
            <tr key={club.id}>
              <td>
                {/* Use Link to navigate to ClubPage with the club's ID and name */}
                <Link
                  to={`/club/${club.id}?clubName=${encodeURIComponent(club.name)}`}
                  style={buttonStyle}
                >
                  {club.name}
                </Link>
                <button style={leaveButtonStyle} onClick={() => leaveClub(club.id)}>
                  Leave
                </button>
              </td>
            </tr>
          ))}
          {/* Display Clubs with Undo Option */}
          {undoableClubs.map((club) => (
            <tr key={club.id}>
              <td style={{ textAlign: 'center' }}>
                <button style={undoButtonStyle} onClick={() => undoLeave(club.id)}>
                  Undo - {club.name}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Button styles
const buttonStyle = {
  width: '200px',
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

const leaveButtonStyle = {
  ...buttonStyle,
  background: '#dc3545',
  marginLeft: '15px'
};

const undoButtonStyle = {
  ...buttonStyle,
  background: '#28a745',
  width: '100%'
};
