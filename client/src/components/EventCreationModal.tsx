import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { postData } from "../api";
import { useAuth } from "../AuthContext";
import "../Announcement.css"

export default function ClubCreationModal(props) {
  const [title, setTitle] = useState("");
  const [eventText, setDesc] = useState("");
  const [event_date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const { user } = useAuth();


  const onSubmit = async () => {
    const userId = user?.id;
    const clubId = props.clubId;

    try { 
        await postData(`event/create-event/:event-id`, {
            clubId,
            userId,
            title,
            eventText: eventText,
            event_date,
            location
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
                    value={title}
                    maxLength="80"
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div>
                <p class="text">Description</p>
                <textarea name="" 
                id="" 
                cols="30"
                placeholder="Description"
                class="desc"
                value={eventText}
                onChange={(e) => setDesc(e.target.value)}
                />
            </div>
            <div>
                <p class="text">Event Date</p>
                <input type="date"
                    placeholder="Date"
                    value={event_date}
                    maxLength="80"
                    onChange={(e) => setDate(e.target.value)}
                    style={{marginBottom: 10}}
                />
            </div>
            <div>
                <p class="text">Location</p>
                <input type="text"
                    placeholder="Location"
                    value={location}
                    maxLength="80"
                    onChange={(e) => setLocation(e.target.value)}
                    style={{marginBottom: 10}}
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