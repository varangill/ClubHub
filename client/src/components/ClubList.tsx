import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getData } from "../api";

interface Club {
  id: number;
  clubName: string;
  clubDesc: string;
}

interface OwnerData {
  [key: number]: string; // Keyed by club ID, value is owner name
}

interface ClubListProps {
  clubs: Club[];
}

export default function ClubList({ clubs }: ClubListProps) {
  const [query, setQuery] = useState("");
  const [owners, setOwners] = useState<OwnerData>({});

  useEffect(() => {
    const fetchOwners = async () => {
      try {
        const ownersData: OwnerData = {};
        await Promise.all(
          clubs.map(async (club) => {
            const response = await getData(`clubs/owner/${club.id}`);
            if (response[0]) {
              ownersData[club.id] = response[0].name;
            }
          })
        );
        setOwners(ownersData);
      } 
      catch (error) {
        console.error("Error fetching owners:", error);
      }
    };
    fetchOwners();
  }, [clubs]);

  // Filter clubs based on query
  const filteredClubs = clubs.filter((club) =>
    club.clubName.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
    <div className="my-clubs-container">
      <input
        type="text"
        placeholder="Search clubs..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-input"
      />
    </div>

      <table className="clubs-table">
          <tr className="club-header-row">
            <th className="club-tb-header club-table-col-name">
              Name
            </th>
            <th className="club-tb-header club-table-col-desc">
              Description
            </th>
            <th className="club-tb-header club-table-col-owner">
              Owner
            </th>
          </tr>
          {filteredClubs.map((club) => (
            <tr key={club.id}>
              <Link className="table-club-link" to={`/club/${club.id}`}>
                <td>
                  {club.clubName}
                </td>
              </Link>
              <td>
                {club.clubDesc}
              </td>
              <td>
                {owners[club.id]}
              </td>
            </tr>
          ))}
      </table>
    </>
  );
}
