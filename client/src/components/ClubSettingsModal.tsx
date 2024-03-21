import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { postData, deleteData, getData } from "../api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { useParams } from "react-router-dom";
import ClubTagsDropdown from "./ClubTagsDropdown";

export default function ClubSettingsModal(props) {
  const [clubName, setClubName] = useState(props.originalName);
  const [desc, setDesc] = useState(props.originalDesc);
  const [joinStatus, setJoinStatus] = useState(props.originalStatus);
  const navigate = useNavigate();
  const [bannedMembers, setBannedMembers] = useState([]);
  const [memberType, setMemberType] = useState("");
  const { id } = useParams();
  const { user } = useAuth();

  useEffect(() => {
    getData(`users/membership?userId=${user?.id}&clubId=${id}`).then((res) => {
      setMemberType(res.membershipType);
    });
    listBannedMembers();
  }, [id]);

  //listing all the banned members
  const listBannedMembers = async () => {
    try {
      await getData(`clubs/banned-members/${id}`).then((res) => {
        setBannedMembers(res);
      });
    } catch (error) {
      console.log(error);
    }
  };

  //function for button to unban the banned member
  const unbanMember = async (userId) => {
    try {
      const response = await deleteData("clubs/unban-user", {
        userId: userId,
        clubId: props.clubId,
      });
      if (response.ok) {
        props.requestUpdate();
        props.hideModal();
      } else {
        props.hideModal();
      }
    } catch (error) {
      console.error("Error in unbanMember:", error);
    }
  };

  //function that gives the banned section area: member name, banner name, date of banning
  const BannedMembersSection = () => {
    return (
      <div>
        <h3>Banned Members</h3>
        {bannedMembers.length > 0 ? (
          bannedMembers.map((member, index) => (
            <div key={index}>
              Member: {member.BannedUserName},{member.id},Banned By:{" "}
              {member.BannerName}, Banned on:{" "}
              {new Date(member.BanDate).toLocaleDateString()}
              <button onClick={() => unbanMember(member.id)}>Unban</button>
            </div>
          ))
        ) : (
          <p>No banned members.</p> //if there are no banned members it will show this
        )}
      </div>
    );
  };

  const onSubmit = async () => {
    try {
      await postData(`clubs/update-club`, {
        clubId: props.clubId,
        name: clubName,
        desc,
        status: joinStatus,
      }).then(() => {
        props.requestUpdate();
        props.hideModal();
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onDelete = async () => {
    //TO-DO: Add in confirmation asking if owner wants to delete club
    try {
      await deleteData(`clubs/delete-club`, {
        clubId: props.clubId,
      }).then(() => {
        navigate(`/all_clubs`); //Navigate user to all clubs page after deleting club
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      show={true}
      onHide={() => {
        props.hideModal();
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>Update Club</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <p class="text">Club Name: </p>
          <input
            type="text"
            placeholder="Club name"
            value={clubName}
            onChange={(e) => setClubName(e.target.value)}
            style={{marginBottom: 10}}
          />
        </div>
        <div>
          <p class="text">Club Description: </p>
          <input
            type="text"
            placeholder="Club description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            style={{marginBottom: 10}}
          />
        </div>
        <div>
          <p class="text">Join Status: </p>
          <select
            onChange={(e) => setJoinStatus(e.target.value)}
            value={joinStatus}
            style={{marginBottom: 10}}
          >
            <option value="open">Open</option>
            <option value="application">Application</option>
            <option value="closed">Closed</option>
          </select>
          {/*Banned Members Section*/}
          {
            (memberType === "owner" || memberType === "executive") && (
              <BannedMembersSection />
            ) //only executive and owners can see the banned section
          }
          <ClubTagsDropdown clubId={props.clubId}/>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => {
            props.hideModal();
          }}
        >
          Close
        </Button>
        {props.isOwner && (
          <Button variant="danger" onClick={onDelete}>
            Delete Club
          </Button>
        )}
        <Button variant="primary" onClick={onSubmit}>
          Update
        </Button>
        <Button
          variant="primary"
          onClick={() => navigate(`/application_form_creation/${props.clubId}`)}
        >
          Create Application
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
