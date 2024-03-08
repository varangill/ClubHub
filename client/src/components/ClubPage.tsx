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
  const [bannedMembers, setBannedMembers] = useState([]);


  //Fetch relevant data on render
  useEffect(() => {
    getData(`users/membership?userId=${user?.id}&clubId=${id}`).then((res) => {
      setMemberType(res.membershipType);
    });
    updateMemberList();
    updateClubInfo();
    listBannedMembers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  
  const unbanMember = async (userId) => {
    try {
      const response = await postData(`/api/club/${id}/unban`, { userId });
      if (response.ok) {
        // Update the bannedMembers list to reflect the change
        setBannedMembers(bannedMembers.filter(member => member.userId !== userId));
      } else {
        throw new Error('Failed to unban the member');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const listBannedMembers = async () => {
    try {
      await getData(`clubs/banned-members/${id}`).then((res) => {
        setBannedMembers(res);
      });
    } catch (error) {
      console.log(error);
    }
  };

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

  const BannedMembersSection = () => {
    return (
      <div>
        <h3>Banned Members</h3>
        {bannedMembers.length > 0 ? (
          bannedMembers.map((member) => (
            <div key={userId.id}>  // Ensure you use a unique key, such as the member's ID.
              {member.name}  // Replace 'name' with the actual property that contains the member's name.
              <button onClick={() => unbanMember(name.id)}>Unban</button>  // Ensure you pass the member's ID to unbanMember.
            </div>
          ))
        ) : (
          <p>No banned members.</p>
        )}
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
            {/*Banned Members*/}
       {<BannedMembersSection />
       }
       
      </div>
      {showPopup && <div className="popup">Club has been joined!</div>}
    </div>
  );
}
