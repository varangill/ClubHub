import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { postData, deleteData } from "../api";
import { useNavigate } from "react-router-dom";

export default function ClubSettingsModal(props) {
  const [clubName, setClubName] = useState(props.originalName);
  const [desc, setDesc] = useState(props.originalDesc);
  const [joinStatus, setJoinStatus] = useState(props.originalStatus);
  const navigate = useNavigate();

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
          <Button variant="primary" onClick={() => navigate(`/application_form_creation/${props.clubId}`)}>
            Create Application
          </Button>
      </Modal.Footer>
    </Modal>
  );
}
