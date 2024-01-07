import NavBar from "./NavigationBar";
import { useNavigate } from "react-router-dom";
import "../Club.css"
import { useEffect, useState } from "react";
import fetchData from "../api/index";

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

  useEffect(() => {
    fetch(`http://${import.meta.env.VITE_BACKEND_URL}/api/clubs`)
      .then((res) => res.json())
      .then((data) => {
        setList(data);
      });
  });

  return (
    <div>
      <NavBar />
      <header>
        <h1>
        All Clubs
        </h1>
      </header>

      <div id="list-container">
        {list &&
        list.map((item) => 
            <ul className="club-list-item" id={item.id} key={item.id} onClick={() => navigate("/club/" + item.id)}>{item.clubName}</ul>
        )}
      </div>
    </div>
  );

  
}
