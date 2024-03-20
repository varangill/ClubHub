import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { getData, deleteData } from "../api";

export default function EventModal(props) {
  const [author, setAuthor] = useState("");

  useEffect(() => {
    getData(`users/getUser/${props.event.userId}`).then((res) => {
      setAuthor(res.name);
    });
  });

  const deleteEvent = () => {
    deleteData(`event/${props.event.event_id}`, {}).then(() => {
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
          {props.event.title} - {author} <br />
          {props.event.event_date.substring(0, 10)}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.event.eventText}</Modal.Body>
      <Modal.Footer>
        {props.currMemberType === "executive" ||
        props.currMemberType === "owner" ? (
          <Button variant="danger" onClick={deleteEvent}>
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
