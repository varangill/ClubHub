import React, { useState, useEffect } from 'react';
import NavBar from "./NavigationBar";

export default function MyClubs() {
  const initialClubs = [
    { name: 'Tennis Club', id: 'tennis' },
    { name: 'Chess Club', id: 'chess' },
    { name: 'Reading Club', id: 'reading' },
    { name: 'Science Club', id: 'science' }
  ];

  const [clubs, setClubs] = useState(initialClubs);
  const [leftClubs, setLeftClubs] = useState([]);
  const [query, setQuery] = useState('');

  // Function to handle leaving a club
  const leaveClub = (clubId) => {
    const leftClub = clubs.find(club => club.id === clubId);
    setClubs(clubs.filter(club => club.id !== clubId));
    setLeftClubs([...leftClubs, leftClub]);

    // Set a timer to automatically remove the undo option after 30 seconds
    setTimeout(() => {
      setLeftClubs(leftClubs => leftClubs.filter(club => club.id !== clubId));
    }, 5000); // 30 seconds
  };

  // Function to handle undoing leave action
  const undoLeave = (clubId) => {
    const returnedClub = leftClubs.find(club => club.id === clubId);
    setClubs([...clubs, returnedClub]);
    setLeftClubs(leftClubs.filter(club => club.id !== clubId));
  };

  // Filter clubs based on query
  const filteredClubs = clubs.filter(club =>
    club.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div style={{ textAlign: 'center' }}>
      <NavBar />

      {/* Total Club Count and Search Bar */}
      <div style={{ position: 'absolute', top: '60px', right: '10px', fontSize: '18px', color: 'black' }}>
        Total Clubs Joined: {filteredClubs.length + leftClubs.length}
      </div>
      
      <h2 style={{
        fontSize: '36px',
        color: '#333',
        margin: '20px 0',
        fontFamily: 'Arial, sans-serif'
      }}>My Clubs</h2>

      <input
        type="text"
        placeholder="Search clubs..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ fontSize: '18px', padding: '10px', margin: '20px', width: '300px' }}
      />

      {/* Display Active Clubs */}
      <table style={{ margin: 'auto' }}>
        <tbody>
          {filteredClubs.map(club => (
            <tr key={club.id}>
              <td>
                <button style={buttonStyle} onClick={() => console.log(`Navigating to the ${club.id} page...`)}>
                  {club.name}
                </button>
                <button style={leaveButtonStyle} onClick={() => leaveClub(club.id)}>
                  Leave
                </button>
              </td>
            </tr>
          ))}
          {/* Display Clubs with Undo Option */}
          {leftClubs.map(club => (
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

const buttonStyle = {
  width: '150px',
  padding: '10px',
  margin: '10px',
  cursor: 'pointer',
  border: 'none',
  borderRadius: '5px',
  background: '#007bff',
  color: 'white',
  fontSize: '18px'
}

const leaveButtonStyle = {
  ...buttonStyle,
  background: '#dc3545', // Red color for leave button
  marginLeft: '5px',
}

const undoButtonStyle = {
  ...buttonStyle,
  background: '#28a745', // Green color for undo button
  width: '100%', // Make it full width for emphasis
}
