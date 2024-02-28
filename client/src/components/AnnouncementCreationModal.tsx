import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { postData } from "../api";
import { useAuth } from "../AuthContext";
import "../Announcement.css"

export default function ClubCreationModal(props) {
  const [announcementTitle, setTitle] = useState("");
  const [announcementText, setDesc] = useState("");
  const { user } = useAuth();


  const onSubmit = async () => {
    const userId = user?.id;
    const clubId = props.clubId
    let announcementTime = new Date()

    try { 
        await postData(`announcements/create-announcement`, {
            clubId,
            userId,
            announcementTitle,
            announcementText,
            announcementTime
        })
        alert("Announcement Created")
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
            <Modal.Title>Create an Announcment</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <div>
                <p class="text">Title</p>
                <input type="text"
                    placeholder="Title"
                    value={announcementTitle}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div>
                <p class="text">Description</p>
                <input type="text" 
                    placeholder="Description"
                    class="desc"
                    value={announcementText}
                    onChange={(e) => setDesc(e.target.value)}
                />
            </div>
        </Modal.Body>
        <Modal.Footer>
            {/* <Button variant="secondary"
            onClick={() => {
                props.hideModal();
            }}
            >
                Close
            </Button> */}
            <Button variant="primary"
                onClick={onSubmit}
            >
                Create
            </Button>
        </Modal.Footer>
      </Modal>
  )

}