import NavBar from "./NavigationBar";
import { useNavigate } from "react-router-dom";
import "../Club.css"
import { useEffect, useState } from "react";
import fetchData from "../api/index";
import joined from "./ClubPage"

type Listitem = {
  id: Number;
  clubName: string;
  clubDesc: string;
  creationDate: string;
  joinStatus: string;
}

export default function AllClubs() {
  const navigate = useNavigate();

  const [list, setList] = useState<Listitem[]>([]); 

  const [query, setQuery] = useState('');

  useEffect(() => {
    fetch(`http://${import.meta.env.VITE_BACKEND_URL}/api/clubs`)
      .then((res) => res.json())
      .then((data) => {
        setList(data);
      });
  });

  const filteredClubs = list.filter((club) =>
    club.clubName.toLowerCase().includes(query.toLowerCase())
  );


  return (
    <div>
      <NavBar />
      <header>
        <h1>
        All Clubs
        {window.globalVar}
        </h1>
      </header>

      <input
        type="text"
        placeholder="Search clubs..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-input"
      />

      <div id="list-container">
        {filteredClubs &&
        filteredClubs.map((item) => 
            <ul className="club-list-item" id={item.id} key={"club-list-item"} onClick={() => navigate("/club/" + item.id)}>{item.clubName}</ul>
        )}
      </div>
    </div>
  );

  
}
