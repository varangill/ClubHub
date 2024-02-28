import { useState, useEffect } from "react";
import { useNavigate, Navigate, useParams } from "react-router-dom";
import NavBar from "./NavigationBar";
import MemberEditModal from "./MemberEditModal";
import ClubSettingsModal from "./ClubSettingsModal";
import AnnouncementCreationModal from "./AnnouncementCreationModal"
import { getData, postData, deleteData } from "../api";
import { useAuth } from "../AuthContext";
import { MoreVertical } from "lucide-react";

export default function ClubPage() {
  const [showPopup, setShowPopup] = useState(false);
  const [showMemberModal, setShowMemberModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showCreateAnnModal, setShowCreateAnnModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState({});
  const [clubName, setClubName] = useState("");
  const [clubDesc, setClubDesc] = useState("");
  const [clubStatus, setClubStatus] = useState("open");
  const [memberType, setMemberType] = useState("");
  const [members, setMembers] = useState([]); //Stores the current members of the club
  const [announcements, setAnnouncements] = useState([]);

  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  //Fetch relevant data on render
  useEffect(() => {
    getData(`users/membership?userId=${user?.id}&clubId=${id}`).then((res) => {
      setMemberType(res.membershipType);
      console.log(res)
    });

    //getData(`announcements/`)

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

  const ApplyButton = () => {
    return (
      <div className="join-button-container">
        <button onClick={() => {navigate(`/application_form/{id}`);}} className="join-button">
          Apply to Join
        </button>
      </div>
    )
  }

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

  const AnnouncementCreationButton = () => {
    return (
        <button
          onClick={() => {
            setShowCreateAnnModal(true);
          }}
          className="announcement-button"
        >
          Create Announcment
        </button>
    );
  };
  console.log(user)
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
      {showCreateAnnModal && (
        <AnnouncementCreationModal
          hideModal={() => {
            setShowCreateAnnModal(false);
          }}
          //requestupdate for updating announcements
          clubId={id}
          userId={user?.id}
          />
      )}
      <h2 className="club-heading">{clubName}</h2>
      <h5 class="club-desc">{clubDesc}</h5>

      {/* Render join button if user isn't a member, otherwise render the leave button for non-owners (members, executives) */}
      {memberType != "member" && <SettingsButton/>}
      {memberType === "none" && clubStatus === "open" ? (
        <JoinButton />
      ) : memberType === "none" && clubStatus === "application" ? (
        <ApplyButton/>
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
        <div class="announcement-container">
          <h1>Announcements</h1>
          <p></p>
          {memberType != "member" && <AnnouncementCreationButton />}
        </div>
      </div>
      {showPopup && <div className="popup">Club has been joined!</div>}
    </div>
  );
}
