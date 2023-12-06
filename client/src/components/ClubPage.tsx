import NavBar from "./NavigationBar";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom"
import "../ClubPage.css"
import { useEffect, useState } from "react";
import fetchData from "../api/index";

export default function ClubPage() {
  const navigate = useNavigate();

  const text = "Club Overview" //get description text for specific club using id
  const {id} = useParams(); 
  // const [list, setList] = useState([]); 

  //  useEffect(() => {
  //    setList(fetchData("users/getUser/1", "GET"));
  // }, []);

  interface Listitem {
    member: string;
    announcementHeader: string;
    announcementId: int;
    }

  const myList: Listitem[] = [
    {member: "Justin", announcementHeader: "announcement1", announcementId: 1},
    {member: "Justin2", announcementHeader: "announcement2", announcementId: 2},
    {member: "Justin3", announcementHeader: "announcement3", announcementId: 3}
]

  return (
    <div>
      <NavBar />
      <header className="custom-header">
        <div>
          <h1>
            Club Page {id}
          </h1>
          <h2>
            {data}
          </h2>
        </div>
        <div>
          <button>Join Club</button>
        </div>
      </header>

      <div className="split-container">
        <div className="left-side">
          <h1>
            Club Description
          </h1>
          <p className="description">
            {text}
          </p>
          <h1>
            Club Members
          </h1>
          <ul>
          {myList.map((item) => 
            <li className="club-members" id={item.member} onClick={() => alert("report function")}>{item.member}</li>
          )}
          </ul>
        </div>
        <div className="right-side">
           <h1>
             Announcements
           </h1>
           <ul>
           {myList.map((item) => 
            <li className="announcement" id={item.announcementId} onClick={() => alert("announcement description for " + item.announcementId)}>{item.announcementHeader}</li>
           )}
           </ul>
           <h1>Club Calendar</h1>
        </div>
      </div>
    </div>
  );
}
