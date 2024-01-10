import NavBar from "./NavigationBar";
import { useNavigate } from "react-router-dom";
import "../Club.css"
import { useEffect, useState } from "react";

export default function MyClubs() {
  const navigate = useNavigate();

  const [list, setList] = useState<Listitem[]>([]); 
  const [joinedList, setJoinedList] = useState<userData[]>([])

  var joinedClubIds = []

  type Listitem = {
    id: Number;
    clubName: string;
    clubDesc: string;
    creationDate: string;
    joinStatus: string;
  }

  type userData = {
    clubId: Number;
    userId: Number;
    membershipType: string;
  }

  joinedList.map((club) => {
    joinedClubIds.push(club.clubId)
  })

  useEffect(() => {
    fetch(`http://${import.meta.env.VITE_BACKEND_URL}/api/clubs`)
      .then((res) => res.json())
      .then((data) => {
        setList(data);
      });
    
    fetch(`http://${import.meta.env.VITE_BACKEND_URL}/api/users/clubs/1`)
      .then((res) => res.json())
      .then((data) => {
        setJoinedList(data);
      });
  });

  return (
    <div>
      <NavBar />
      <header>
        <h1>
          My Clubs
        </h1>
      </header>

      <div id="list-container">
        {list.map((club) => {
          if(joinedClubIds.includes(club.id)) {
            return <ul className="club-list-item" id={club.id} onClick={() => navigate("/club/" + club.id)}>{club.clubName}</ul>
          }
        })}
      </div>
    </div>
  );
}
