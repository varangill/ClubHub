import { useState, useEffect  } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { postData, deleteData,getData } from "../api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { useParams } from "react-router-dom";

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

  const listBannedMembers = async () => {
    try {
      await getData(`clubs/banned-members/${id}`).then((res) => {
        setBannedMembers(res);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const unbanMember = async (userId) => {
    try {
      const response = await deleteData('clubs/unban-user', {
        userId: userId,
        clubId: props.clubId
      });
  
      if (response.ok) {
        props.requestUpdate(); 
        props.hideModal(); 
      } else {
        console.error('Failed to unban the member. Status:', response.status);
        props.hideModal();
        const errorData = await response.json();
        console.error('Server responded with:', errorData);
      }
    } catch (error) {
      console.error('Error in unbanMember:', error);
    }
  };
  
  

  const BannedMembersSection = () => {
    console.log('First banned member:', bannedMembers[0]);
    return (
      <div>
        <h3>Banned Members</h3>
        {bannedMembers.length > 0 ? (
           bannedMembers.map((member, index) => (
            <div key={index}>
              Member: {member.BannedUserName},{member.id},Banned By: {member.BannerName}, Banned on: {new Date(member.BanDate).toLocaleDateString() }
              <button onClick={() => unbanMember(member.id)}>Unban</button>
            </div>
          ))
          
        ) : (
          <p>No banned members.</p>
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
          <p>Club Name: </p>
          <input
            type="text"
            placeholder="Club name"
            value={clubName}
            onChange={(e) => setClubName(e.target.value)}
          />
        </div>
        <div>
          <p>Club Description: </p>
          <input
            type="text"
            placeholder="Club description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <div>
          <p>Join Status: </p>
          <select
            onChange={(e) => setJoinStatus(e.target.value)}
            value={joinStatus}
          >
            <option value="open">Open</option>
            <option value="application">Application</option>
            <option value="closed">Closed</option>
          </select>
          {/*Banned Members*/}
       {(memberType === "owner" || memberType === "executive") && <BannedMembersSection />
       }
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
      </Modal.Footer>
    </Modal>
  );
}
