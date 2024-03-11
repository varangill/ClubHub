import { useState, useEffect } from "react";
import { useNavigate, Navigate, useParams } from "react-router-dom";
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
  const [members, setMembers] = useState([]); 
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  
  useEffect(() => {
    getData(`users/membership?userId=${user?.id}&clubId=${id}`).then((res) => {
      setMemberType(res.membershipType);
    });
    updateMemberList();
    updateClubInfo();
  }, [id]);

  const updateMemberList = async () => {
      await getData(`clubs/memberships/${id}`).then((res) => {
        setMembers(res);
      });
  };

  const updateClubInfo = async () => {
      await getData(`clubs/${id}`).then((res) => {
        setClubDesc(res.clubDesc);
        setClubName(res.clubName);
        setClubStatus(res.joinStatus);
      });
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
          setShowPopup(false); 
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


      {}
      {memberType != "member" && <SettingsButton />}
      {memberType === "none" ? (
        <JoinButton />
      ) : memberType === "owner" ? null : (
        <LeaveButton />
      )}
      <div class="first-row">
        <div class="members">
          <h1>Members</h1>
          {members.map((member) => {
            return (
              <div key={member["userId"]}>
                {member["name"]}
                {user?.id != member["userId"] ? ( 
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
        <div class="announcement-container">
          <div class="announcement-header">
              <h1>Announcements</h1>
          </div>
          <div class="scroll">
            {announcements.map((announcement, index) => {
              return (
                <ul key={announcement["id"]} class="announcement" onClick={() => {setSelectedAnnouncement(announcement); setShowAnnouncementModal(true);}}>
                  {announcement["announcementTitle"]} - {announcement["announcementText"]}
                </ul>
              )
            })}
          </div>
            {memberType != "member" && <AnnouncementCreationButton />}
          </div>
      </div>
      {showPopup && <div className="popup">Club has been joined!</div>}
    </div>
  );
}
