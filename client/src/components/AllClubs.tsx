import React, { useState } from 'react';
import NavBar from './NavigationBar';
import { Link } from 'react-router-dom';
import '../AllClubs.css'; // Import the CSS file

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
    // ... (rest of the joinClub function)
  };

  // Function to handle leaving a joined club
  const leaveClub = (clubId) => {
    // ... (rest of the leaveClub function)
  };

  // Filter clubs based on query
  const filteredClubs = clubs.filter((club) =>
    club.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="my-clubs-container">
      <NavBar />

      <div className="total-club-count">
        Total Clubs Joined: {joinedClubs.length}
      </div>

      <h2 className="club-heading">All Clubs</h2>

      <input
        type="text"
        placeholder="Search clubs..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-input"
      />

      <table className="clubs-table">
        <tbody>
          {filteredClubs.map((club) => (
            <tr key={club.id}>
              <td>
                <Link
                  to={`/club/${club.id}?clubName=${encodeURIComponent(
                    club.name
                  )}`}
                  className="club-link"
                >
                  {club.name}
                </Link>
                <button className="join-button" onClick={() => joinClub(club.id)}>
                  Join
                </button>
              </td>
            </tr>
          ))}
          {joinedClubs.map((club) => (
            <tr key={club.id}>
              <td>
                <Link
                  to={`/club/${club.id}?clubName=${encodeURIComponent(
                    club.name
                  )}`}
                  className="club-link"
                >
                  {club.name}
                </Link>
                <button className="leave-button" onClick={() => leaveClub(club.id)}>
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
