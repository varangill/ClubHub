import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { getData, deleteData } from "../api";

export default function AnnouncementsModal(props) {
  const [author, setAuthor] = useState("");

  useEffect(() => {
    getData(`users/getUser/${props.announcement.userId}`).then((res) => {
      setAuthor(res.name);
    });
  }, []);

  const deleteAnnouncement = () => {
    deleteData(`announcements/${props.announcement.id}`, {}).then(() => {
      props.requestUpdate();
      props.hideModal();
    });
  };

  return (
    <Modal
      show={true}
      onHide={() => {
        props.hideModal();
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {props.announcement.announcementTitle} - {author}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.announcement.announcementText}</Modal.Body>
      <Modal.Footer>
        {props.currMemberType === "executive" ||
        props.currMemberType === "owner" ? (
          <Button variant="danger" onClick={deleteAnnouncement}>
            Delete
          </Button>
        ) : null}
        <Button
          variant="secondary"
          onClick={() => {
            props.hideModal();
          }}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
