import React, { useState } from 'react';
import NavBar from './NavigationBar';
import { Link } from 'react-router-dom';

export default function AllClubs() {
  const initialClubs = [
    { name: 'Tennis Club', id: 'tennis' },
    { name: 'Chess Club', id: 'chess' },
    { name: 'Reading Club', id: 'reading' },
    { name: 'Science Club', id: 'science' },
    { name: 'Art Club', id: 'art' },
    { name: 'Music Club', id: 'music' },
    { name: 'Cooking Club', id: 'cooking' },
    { name: 'Photography Club', id: 'photography' },
    { name: 'Gaming Club', id: 'gaming' },
    { name: 'Dance Club', id: 'dance' },
  ];

  const [clubs, setClubs] = useState(initialClubs);
  const [joinedClubs, setJoinedClubs] = useState([]);
  const [query, setQuery] = useState('');

  // Function to handle joining a club
  const joinClub = (clubId) => {
    const joinedClub = clubs.find((club) => club.id === clubId);
    setClubs(clubs.filter((club) => club.id !== clubId));
    setJoinedClubs([...joinedClubs, joinedClub]);
  };

  // Function to handle leaving a joined club
  const leaveClub = (clubId) => {
    const leftClub = joinedClubs.find((club) => club.id === clubId);
    setJoinedClubs(joinedClubs.filter((club) => club.id !== clubId));
    setClubs([...clubs, leftClub]);
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
          color: 'black',
        }}
      >
        Total Clubs Joined: {joinedClubs.length}
      </div>

      <h2
        style={{
          fontSize: '36px',
          color: '#333',
          margin: '20px 0',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        All Clubs
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
          width: '300px',
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
                  to={`/club/${club.id}?clubName=${encodeURIComponent(
                    club.name
                  )}`}
                  style={buttonStyle}
                >
                  {club.name}
                </Link>
                <button style={joinButtonStyle} onClick={() => joinClub(club.id)}>
                  Join
                </button>
              </td>
            </tr>
          ))}
          {/* Display Joined Clubs with Leave Option */}
          {joinedClubs.map((club) => (
            <tr key={club.id}>
              <td>
                <Link
                  to={`/club/${club.id}?clubName=${encodeURIComponent(
                    club.name
                  )}`}
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
  transition: 'all 0.2s',
};

const joinButtonStyle = {
  ...buttonStyle,
  background: '#28a745',
};

const leaveButtonStyle = {
  ...buttonStyle,
  background: '#dc3545',
  marginLeft: '15px',
};
