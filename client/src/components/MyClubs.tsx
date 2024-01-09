import React, { useState } from 'react';
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
  const [query, setQuery] = useState('');

  // Function to handle leaving a club
  const leaveClub = (clubId) => {
    setClubs(clubs.filter((club) => club.id !== clubId));
  };

  // Filter clubs based on query
  const filteredClubs = clubs.filter((club) =>
    club.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div style={{ textAlign: 'center' }}>
      <NavBar />

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
