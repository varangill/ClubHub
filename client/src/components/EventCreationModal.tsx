import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { postData } from "../api";
import { useAuth } from "../AuthContext";
import "../Announcement.css"

export default function ClubCreationModal(props) {
  const [eventTitle, setTitle] = useState("");
  const [eventText, setDesc] = useState("");
  const { user } = useAuth();


  const onSubmit = async () => {
    const userId = user?.id;
    const clubId = props.clubId;

    try { 
        await postData(`announcements/create-event`, {
            clubId,
            userId,
            eventTitle,
            eventText
        })
        props.requestUpdate();
        props.hideModal();
    } catch (err) {
        console.log(err)
    }
  }

  return (
      <Modal show={true}
      onHide={() => {
          props.hideModal();
      }}
      >
        <Modal.Header closeButton>
            <Modal.Title>Create an Event</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <div>
                <p class="text">Title</p>
                <input type="text"
                    placeholder="Title"
                    value={eventTitle}
                    maxLength="80"
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div>
                <p class="text">Description</p>
                <textarea name="" 
                id="" 
                cols="30" 
                rows="10"
                placeholder="Description"
                class="desc"
                value={eventText}
                onChange={(e) => setDesc(e.target.value)}
                />
            </div>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary"
            onClick={() => {
                props.hideModal();
            }}
            >
                Close
            </Button>
            <Button variant="primary"
                onClick={onSubmit}
            >
                Create
            </Button>
        </Modal.Footer>
      </Modal>
  )

}