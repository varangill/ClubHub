import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { postData } from "../api";
import { useAuth } from "../AuthContext";

export default function ClubCreationModal(props) {
  const [clubName, setClubName] = useState("");
  const [desc, setDesc] = useState("");
  const [joinStatus, setJoinStatus] = useState("open");
  const { user } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async () => {
    const userId = user?.id;
    try {
      await postData(`clubs/create-club`, {
        userId,
        clubName,
        desc,
        joinStatus,
      }).then((res) => {
        navigate(`/club/${res.id}`); //On successful club creation, navigate user to new club page
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
        <Modal.Title>Create a Club</Modal.Title>
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
        <Button variant="primary" onClick={onSubmit}>
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
