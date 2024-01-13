import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NavBar from "./NavigationBar";
import { getData, postData, deleteData } from "../api";
import { useAuth } from "../AuthContext";

export default function ClubPage() {
  const [showPopup, setShowPopup] = useState(false);
  const [clubName, setClubName] = useState("");
  const [clubDesc, setClubDesc] = useState("");
  const [memberType, setMemberType] = useState("");
  const { id } = useParams();
  const { user } = useAuth();

  useEffect(() => {
    getData(`clubs/${id}`).then((res) => {
      setClubDesc(res.clubDesc);
      setClubName(res.clubName);
    });
    getData(`users/membership?userId=${user?.id}&clubId=${id}`).then((res) => {
      setMemberType(res.membershipType);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const joinClub = () => {
    postData(`users/join-club`, {
      userId: user?.id,
      clubId: id,
    }).then((res) => {
      setMemberType(res.membershipType);
    });
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false); // Hide the popup after a few seconds
    }, 3000);
  };

  const JoinButton = () => {
    return (
      <div className="join-button-container">
        <button onClick={joinClub} className="join-button">
          Join Club
        </button>
      </div>
    );
  };

  const leaveClub = () => {
    deleteData(`users/leave-club`, {
      userId: user?.id,
      clubId: id,
    }).then((res) => {
      setMemberType(res.membershipType);
    });
  };

  const LeaveButton = () => {
    return (
      <div className="join-button-container">
        <button onClick={leaveClub} className="join-button">
          Leave Club
        </button>
      </div>
    );
  };

  return (
    <div className="club-detail-container">
      <NavBar />
      <h2 className="club-heading">{clubName}</h2>
      <h5>{clubDesc}</h5>

      {/* Render join button if user isn't a member, otherwise render the leave button for non-owners (members, executives) */}
      {memberType === "none" ? (
        <JoinButton />
      ) : memberType === "owner" ? null : (
        <LeaveButton />
      )}
      {showPopup && <div className="popup">Club has been joined!</div>}
    </div>
  );
}
