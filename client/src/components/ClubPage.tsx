import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NavBar from "./NavigationBar";
import { getData } from "../api";

export default function ClubDetailPage() {
  const [showPopup, setShowPopup] = useState(false);
  const [clubName, setClubName] = useState("");
  const [clubDesc, setClubDesc] = useState("");
  const { id } = useParams();

  useEffect(() => {
    getData(`clubs/${id}`).then((res) => {
      setClubDesc(res.clubDesc);
      setClubName(res.clubName);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const joinClub = () => {
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false); // Hide the popup after a few seconds
    }, 3000);
  };

  return (
    <div className="club-detail-container">
      <NavBar />

      <h2 className="club-heading">{clubName}</h2>
      <h5>{clubDesc}</h5>

      <div className="join-button-container">
        <button onClick={joinClub} className="join-button">
          Join Club
        </button>
      </div>

      {showPopup && <div className="popup">Club has been joined!</div>}
    </div>
  );
}
