import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "./NavigationBar";
import MemberEditModal from "./MemberEditModal";
import ClubSettingsModal from "./ClubSettingsModal";
import AnnouncementCreationModal from "./AnnouncementCreationModal";
import AnnouncementsModal from "./AnnouncementModal";

import EventCreationModal from "./EventCreationModal";
import ViewApplicationsModal from "./ViewApplicationsModal";
import { getData, postData, deleteData } from "../api";
import { useAuth } from "../AuthContext";
import { MoreVertical } from "lucide-react";
import ClubChat from "./ClubChat";
import EventModal from "./EventModal";

export default function ClubPage() {
  const [showPopup, setShowPopup] = useState(false);
  const [showMemberModal, setShowMemberModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showCreateAnnouncementModal, setShowCreateAnnouncementModal] =
    useState(false);
  const [showAnnouncementModal, setShowAnnouncementModal] = useState(false);

  const [showViewApplicationsModal, setShowViewApplicationsModal] =
    useState(false);
  const [selectedMember, setSelectedMember] = useState({});
  const [selectedAnnouncement, setSelectedAnnouncement] = useState({});

  const [showCreateEventModal, setShowCreateEventModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState({});

  const [clubName, setClubName] = useState("");
  const [clubDesc, setClubDesc] = useState("");
  const [clubStatus, setClubStatus] = useState("open");
  const [memberType, setMemberType] = useState("");
  const [members, setMembers] = useState([]); //Stores the current members of the club
  const [announcements, setAnnouncements] = useState<any>([]);

  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  //Fetch relevant data on render
  useEffect(() => {
    getData(`users/membership?userId=${user?.id}&clubId=${id}`).then((res) => {
      setMemberType(res.membershipType);
    });
    updateEventList();
    updateAnnouncementList();
    updateMemberList();
    updateClubInfo();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  //unbanMember

  const updateAnnouncementList = async () => {
    try {
      getData(`announcements/club/${id}`).then((res) => {
        setAnnouncements(res);
      });
    } catch (err) {
      console.log(err);
    }
  };

  const updateEventList = async () => {
    try {
      getData(`event/club/events/${id}`).then((res) => {
        setEvents(res);
      });
    } catch (err) {
      console.log(err);
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
        updateMemberList();
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
        <button
          onClick={() => {
            navigate(`/member_application_form/${id}`);
          }}
          className="join-button"
        >
          Apply to Join
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
      updateMemberList();
    });

    deleteData(`filled-applications/executive/${user?.id}`, {});
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
          className={memberType === "executive" ? "join-button2" : memberType === "owner" ? "join-button" : ""}
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
          setShowCreateAnnouncementModal(true);
        }}
        className="announcement-button"
      >
        +
      </button>
    );
  };

  const ExecutiveApplicationButton = () => {
    return (
      <div className="view-applications-container">
        <button
          onClick={() => {
            navigate(`/executive_application_form/${id}`);
          }}
          className="apply-executive-button"
        >
          Apply to be an Executive
        </button>
      </div>
    );
  };

  const ViewApplicationsButton = () => {
    return (
      <div className="view-applications-container">
        <button
          onClick={() => {
            setShowViewApplicationsModal(true);
          }}
          className={memberType === "executive" ? "view-applications-button2" : memberType === "owner" ? "view-applications-button" : ""}
        >
          View Applications
        </button>
      </div>
    );
  };

  const EventCreationButton = () => {
    return (
      <button
        onClick={() => {
          try {
            // Attempt to show the create event modal
            setShowCreateEventModal(true);
          } catch (error) {
            // If there's an error, log it to the console
            console.error(
              "Error while trying to show the create event modal:",
              error
            );
          }
        }}
        className="announcement-button"
      >
        +
      </button>
    );
  };

  return (
    <div className="club-detail-container">
      <div className="club-detail-container"></div>
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
      {showCreateEventModal && (
        <EventCreationModal
          hideModal={() => {
            setShowCreateEventModal(false);
          }}
          member={selectedMember}
          memberType={memberType}
          userId={user?.id}
          clubId={id}
          requestUpdate={updateEventList}
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
      {showCreateAnnouncementModal && (
        <AnnouncementCreationModal
          hideModal={() => {
            setShowCreateAnnouncementModal(false);
          }}
          clubId={id}
          userId={user?.id}
          requestUpdate={updateAnnouncementList}
        />
      )}
      {showAnnouncementModal && (
        <AnnouncementsModal
          hideModal={() => {
            setShowAnnouncementModal(false);
          }}
          clubId={id}
          announcement={selectedAnnouncement}
          currMemberType={memberType}
          requestUpdate={updateAnnouncementList}
        />
      )}
      {showEventModal && (
        <EventModal
          hideModal={() => {
            setShowEventModal(false);
          }}
          clubId={id}
          event={selectedEvent}
          currMemberType={memberType}
          requestUpdate={updateEventList}
        />
      )}
      {showViewApplicationsModal && (
        <ViewApplicationsModal
          hideModal={() => {
            setShowViewApplicationsModal(false);
          }}
          clubId={id}
          userId={user?.id}
          memberType={memberType}
          requestUpdate={updateMemberList}
        />
      )}
      <h2 className="club-heading">{clubName}</h2>
      <h5 className="club-desc">{clubDesc}</h5>
      <br></br>

      {/* Render join button if user isn't a member, otherwise render the leave button for non-owners (members, executives) */}
      {(memberType === "executive" || memberType === "owner") && (
          <>
            <SettingsButton />
            <ViewApplicationsButton />
          </>
        )}
      {memberType === "member" && <ExecutiveApplicationButton />}
      {memberType === "none" && clubStatus === "open" ? (
        <JoinButton />
      ) : memberType === "none" && clubStatus === "application" ? (
        <ApplyButton />
      ) : memberType === "owner" || memberType === "none" || memberType === "" ? null : (
        <LeaveButton />
      )}
      <div className="first-row">
        <div className="block-section members">
          <h1 className="section-header">Members</h1>
          {members.map((member) => {
            return (
              <div key={member["userId"]}>
                {member["name"]}
                {user?.id != member["userId"] && (memberType === "member" || memberType === "executive" || memberType === "owner") ? ( //Don't render menu option if member is the logged in user
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

        <div className="block-section events">
          <h1 className="section-header">Events</h1>
          <div className="scroll">
            {events.map((events) => {
              return (
                <ul
                  key={events["id"]}
                  className="announcement"
                  onClick={() => {
                    setSelectedEvent(events);
                    setShowEventModal(true);
                  }}
                >
                  <li>
                    {events["title"]} -{" "}
                    {new Date(events["event_date"]).toLocaleDateString()} -{" "}
                    {events["location"]} - {events["eventText"]}
                  </li>
                </ul>
              );
            })}
          </div>
          {(memberType === "executive" || memberType === "owner") && <EventCreationButton />}
        </div>

        <div className="block-section announcements">
          <h1 className="section-header">Announcements</h1>
          <div className="scroll">
            {announcements.map((announcement) => {
              const time = announcement["announcementTime"].slice(0, -14);

              return (
                <ul
                  key={announcement["id"]}
                  className="announcement"
                  onClick={() => {
                    setSelectedAnnouncement(announcement);
                    setShowAnnouncementModal(true);
                  }}
                >
                  {announcement["announcementTitle"]} - {time} -{" "}
                  {announcement["announcementText"]}
                </ul>
              );
            })}
          </div>
          {(memberType === "executive" || memberType === "owner") && <AnnouncementCreationButton />}
        </div>
        {showPopup && <div className="popup">Club has been joined!</div>}
      </div>
      {(memberType === "member" || memberType === "executive" || memberType === "owner") && (
        <div className="club-message-board">
          <ClubChat clubId={id} userId={user?.id} userName={user?.name} />
        </div>
      )}
    </div>
  );
}
