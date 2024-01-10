import NavBar from "./NavigationBar";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom"
import "../ClubPage.css"
import { useEffect, useState } from "react";
import AllClubs from "./AllClubs";
// import fetchData from "../api/index";

var joinedArray = []

export default function ClubPage() {
  const navigate = useNavigate();

  joinedArray = [1, 2, 3]

  const {id} = useParams(); 
  // const [list, setList] = useState([]); 

  //  useEffect(() => {
  //    setList(fetchData("users/getUser/1", "GET"));
  // }, []);

  type dataItem = {
    id: Number;
    clubName: string;
    clubDesc: string;
    creationDate: string;
    joinStatus: string;
  }

  type clubItem = {
    clubId: Number;
    userId: Number;
    membershipType: string;
  }

  const myList: Listitem[] = [
    {member: "Justin", announcementHeader: "announcement1", announcementId: 1},
    {member: "Justin2", announcementHeader: "announcement2", announcementId: 2},
    {member: "Justin3", announcementHeader: "announcement3", announcementId: 3}
  ]

  const [clubData, setClubData] = useState<dataItem>({id: -1, clubName: "", clubDesc: "", creationDate: "", joinStatus: ""}); 

  const [memberData, setMemberData] = useState<clubItem>({clubId: -1, userId: -1, membershipType: ""});

  const [clubJoined, setClubJoined] = useState(false);

  useEffect(() => {
    fetch(`http://${import.meta.env.VITE_BACKEND_URL}/api/clubs/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setClubData(data);
      });

    fetch(`http://${import.meta.env.VITE_BACKEND_URL}/api/clubs/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setClubData(data);
      });
  });

  // function joinClub(clubId: any, userId: any): void {
  //   fetch(`http://${import.meta.env.VITE_BACKEND_URL}/api/clubs/${id}`, {POST})
  //     .then((res) => res.json())
  //     .then((data) => {

  //     });
  // } 

  return (
    <div>
      <NavBar />
      <header className="custom-header">
        <div>
          <h1>
            {clubData.clubName}
          </h1>
          <h2>
          </h2>
        </div>
        <div>
          <button onClick={() => {alert(clubJoined ? "Left Club" : "Joined Club"); setClubJoined(!clubJoined); clubJoined ? window.globalArray.push({id}) : window.globalArray=window.globalArray.filter((value) => value !== {id})}}>{clubJoined ? "Leave Club" : "Join Club"}</button>
        </div>
      </header>

      <div className="split-container">
        <div className="left-side">
          <h1>
            Club Description
          </h1>
          <p className="description">
            {clubData.clubDesc}
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

export const myVariable: Number[]=joinedArray
