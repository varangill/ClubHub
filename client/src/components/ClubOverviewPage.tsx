import NavBar from "./NavigationBar";
import { useNavigate } from "react-router-dom";
import "../Club.css"

export default function ClubOverviewPage() {
  const navigate = useNavigate();

  interface Listitem {
    text: string;
    }

const myList: Listitem[] = [
    {text: "Club1"},
    {text: "Club2"},
    {text: "Club3"}
]


  return (
    <div>
        
      <NavBar />
      Club Overview Page

      <ul>
        <button type="button" onClick={() => navigate("/") }>
          To main
        </button>
      </ul>
      <div id="list-container">
        {myList.map((item) => 
            <ul className="club-list-item" id={item.text} onClick={() => navigate("/")}>{item.text}</ul>
        )}
      </div>
    </div>
  );

  
}