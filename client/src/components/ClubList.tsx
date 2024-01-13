import { useState } from "react";
import { Link } from "react-router-dom";

export default function ClubList(props) {
  const [query, setQuery] = useState("");

  // Filter clubs based on query
  const filteredClubs = props.clubs.filter((club) =>
    club.clubName.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="my-clubs-container">
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
                <Link to={`/club/${club.id}`} className="club-link">
                  {club.clubName}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
