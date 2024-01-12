import { useState } from "react";
import NavBar from "./NavigationBar";
import { Link } from "react-router-dom";

export default function MyClubs() {
  const initialClubs = [
    { name: "Tennis Club", id: "tennis" },
    { name: "Chess Club", id: "chess" },
    { name: "Reading Club", id: "reading" },
    { name: "Science Club", id: "science" },
  ];

  const [clubs, setClubs] = useState(initialClubs);
  const [query, setQuery] = useState("");

  // Function to handle leaving a club
  const leaveClub = (clubId) => {
    setClubs(clubs.filter((club) => club.id !== clubId));
  };

  // Filter clubs based on query
  const filteredClubs = clubs.filter((club) =>
    club.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="my-clubs-container">
      <NavBar />
      <h2 className="club-heading">My Clubs</h2>
      <input
        type="text"
        placeholder="Search clubs..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-input"
      />
      {/* Display Active Clubs */}
      <table className="clubs-table">
        <tbody>
          {filteredClubs.map((club) => (
            <tr key={club.id}>
              <td>
                <Link to={`/club/${club.id}`} className="club-link">
                  {club.name}
                </Link>
                <button
                  className="leave-button"
                  onClick={() => leaveClub(club.id)}
                >
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
