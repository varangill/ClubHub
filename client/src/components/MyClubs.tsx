import React, { useState } from 'react';
import NavBar from './NavigationBar';
import { Link } from 'react-router-dom';
import '../MyClubs.css'; // Import the CSS file

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
    <div className="my-clubs-container"> {/* Use CSS class for styling */}
      <NavBar />

      <h2 className="club-heading">My Clubs</h2> {/* Use CSS class for styling */}

      <input
        type="text"
        placeholder="Search clubs..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-input" // Use CSS class for styling
      />

      {/* Display Active Clubs */}
      <table className="clubs-table"> {/* Use CSS class for styling */}
        <tbody>
          {filteredClubs.map((club) => (
            <tr key={club.id}>
              <td>
                {/* Use Link to navigate to ClubPage with the club's ID and name */}
                <Link
                  to={`/club/${club.id}?clubName=${encodeURIComponent(club.name)}`}
                  className="club-link" // Use CSS class for styling
                >
                  {club.name}
                </Link>
                <button className="leave-button" onClick={() => leaveClub(club.id)}>Leave</button> {/* Use CSS class for styling */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
