/* eslint-disable @typescript-eslint/ban-types */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getData } from "../api";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

interface Club {
  id: number;
  clubName: string;
  clubDesc: string;
  tagnames: string;
}

interface OwnerData {
  [key: number]: string; // Keyed by club ID, value is owner name
}

interface ClubListProps {
  clubs: Club[];
  isAllPage: boolean;
  tagSelectorUpdate: Function;
  reloadClubs: Function;
}

export default function ClubList({
  clubs,
  isAllPage,
  tagSelectorUpdate,
  reloadClubs,
}: ClubListProps) {
  const [query, setQuery] = useState("");
  const [owners, setOwners] = useState<OwnerData>({});
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState({ tagName: "Any" });

  useEffect(() => {
    getData(`tags`).then((allTags) => {
      setTags(allTags);
    });
  }, []);

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
      } catch (error) {
        console.error("Error fetching owners:", error);
      }
    };
    fetchOwners();
  }, [clubs]);

  // Filter clubs based on query
  const filteredClubs = clubs.filter((club) =>
    club.clubName.toLowerCase().includes(query.toLowerCase())
  );

  const onSelectTag = (tag) => {
    setSelectedTag(tag);
    tagSelectorUpdate(tag);
  };

  const selectAnyTag = () => {
    setSelectedTag({ tagName: "Any" });
    reloadClubs();
  };

  return (
    <>
      <div className="my-clubs-container">
        <div className="club-filters">
          <input
            type="text"
            placeholder="Search clubs..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="search-input"
          />
          {isAllPage ? (
            <DropdownButton
              title={selectedTag["tagName"]}
              className="club-list-tags-dropdown"
            >
              <Dropdown.Item onClick={selectAnyTag}>Any</Dropdown.Item>
              {tags.map((tag) => (
                <Dropdown.Item
                  key={tag["id"]}
                  onClick={() => onSelectTag(tag)}
                  className={tag === selectedTag ? "selected-tag" : ""}
                >
                  {tag["tagName"]}
                </Dropdown.Item>
              ))}
            </DropdownButton>
          ) : null}
        </div>
      </div>

      <table className="clubs-table">
        <tr className="club-header-row">
          <th className="club-tb-header club-table-col-name">Name</th>
          <th className="club-tb-header club-table-col-desc">Description</th>
          {isAllPage ? (
            <th className="club-tb-header club-table-col-tags">Tags</th>
          ) : null}
          <th className="club-tb-header club-table-col-owner">Owner</th>
        </tr>
        {filteredClubs.map((club) => (
          <tr key={club.id}>
            <Link className="table-club-link" to={`/club/${club.id}`}>
              <td>{club.clubName}</td>
            </Link>
            <td>{club.clubDesc}</td>
            {isAllPage ? <td>{club.tagnames}</td> : null}
            <td>{owners[club.id]}</td>
          </tr>
        ))}
      </table>
    </>
  );
}
