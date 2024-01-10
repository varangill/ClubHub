import NavBar from "./NavigationBar";
import { useNavigate } from "react-router-dom";
import "../Club.css"

export default function MyClubs() {
  const navigate = useNavigate();

  const myGlobalArray = window.globalArray;

  const temp = [1, 2, 3]

  interface Listitem {
    name: string;
    id: int;
    }

const myList: Listitem[] = [ //use club list from user
    {name: "Club1", id: 1},
    {name: "Club2", id: 2},
    {name: "Club3", id: 3}
]

  return (
    <div>
      <NavBar />
      <header>
        <h1>
          My Clubs
        </h1>
      </header>

      <div id="list-container">
        {myList.map((item) => {
          if(myGlobalArray.includes(item.id)) {
            return <ul className="club-list-item" id={item.id} onClick={() => navigate("/club/" + item.id)}>{item.name}</ul>
          }
        })}
        {/* {myList.map((item) => {
          temp.map((item2) => { 
            if(item.id==item2){
              <ul className="club-list-item" id={item.id} onClick={() => navigate("/club/" + item.id)}>{item.name}</ul>
            }
          }
        )}
        )} */}
      </div>
    </div>
  );
}
