import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NavBar from "./NavigationBar";
import MemberEditModal from "./MemberEditModal";
import ClubSettingsModal from "./ClubSettingsModal";
import { getData, postData, deleteData } from "../api";
import { useAuth } from "../AuthContext";
import { MoreVertical } from "lucide-react";

export default function ClubPage() {
  const [showPopup, setShowPopup] = useState(false);
  const [showMemberModal, setShowMemberModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState({});
  const [clubName, setClubName] = useState("");
  const [clubDesc, setClubDesc] = useState("");
  const [clubStatus, setClubStatus] = useState("open");
  const [memberType, setMemberType] = useState("");
  const [members, setMembers] = useState([]); //Stores the current members of the club
  const { id } = useParams();
  const { user } = useAuth();

  //Fetch relevant data on render
  useEffect(() => {
    getData(`users/membership?userId=${user?.id}&clubId=${id}`).then((res) => {
      setMemberType(res.membershipType);
    });
    updateMemberList();
    updateClubInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateMemberList = async () => {
    try {
      await getData(`clubs/memberships/${id}`).then((res) => {
        setMembers(res);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updateClubInfo = async () => {
    try {
      await getData(`clubs/${id}`).then((res) => {
        setClubDesc(res.clubDesc);
        setClubName(res.clubName);
        setClubStatus(res.joinStatus);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const joinClub = () => {
    postData(`users/join-club`, {
      userId: user?.id,
      clubId: id,
    }).then((res) => {
      if (res.membershipType === "member") {
        setMemberType(res.membershipType);
        setShowPopup(true);
        setTimeout(() => {
          setShowPopup(false); // Hide the popup after a few seconds
        }, 3000);
      } else if (res.membershipType === "banned") {
        alert("You are banned from this club.");
      }
    });
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

  const SettingsButton = () => {
    return (
      <div className="join-button-container">
        <button
          onClick={() => {
            setShowSettingsModal(true);
          }}
          className="join-button"
        >
          Settings
        </button>
      </div>
    );
  };

  return (
    <div className="club-detail-container">
      <NavBar />
      {showMemberModal && (
        <MemberEditModal
          hideModal={() => {
            setShowMemberModal(false);
          }}
          member={selectedMember}
          memberType={memberType}
          userId={user?.id}
          clubId={id}
          requestUpdate={updateMemberList}
        />
      )}
      {showSettingsModal && (
        <ClubSettingsModal
          hideModal={() => {
            setShowSettingsModal(false);
          }}
          requestUpdate={updateClubInfo}
          clubId={id}
          originalName={clubName}
          originalDesc={clubDesc}
          originalStatus={clubStatus}
          isOwner={memberType === "owner"}
        />
      )}
      <h2 className="club-heading">{clubName}</h2>
      <h5>{clubDesc}</h5>

      {/* Render join button if user isn't a member, otherwise render the leave button for non-owners (members, executives) */}
      {memberType != "member" && <SettingsButton />}
      {memberType === "none" ? (
        <JoinButton />
      ) : memberType === "owner" ? null : (
        <LeaveButton />
      )}
      <div>
        Members
        {members.map((member) => {
          return (
            <div key={member["userId"]}>
              {member["name"]}
              {user?.id != member["userId"] ? ( //Don't render menu option if member is the logged in user
                <MoreVertical
                  onClick={() => {
                    setSelectedMember(member);
                    setShowMemberModal(true);
                  }}
                />
              ) : null}
            </div>
          );
        })}
      </div>
      {showPopup && <div className="popup">Club has been joined!</div>}
    </div>
  );
}
