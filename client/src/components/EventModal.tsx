import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { getData } from "../api";

export default function EventModal(props) {
    const [author, setAuthor] = useState("")

    useEffect(() => {
        getData(`users/getUser/${props.announcement.userId}`).then((res) => {
            setAuthor(res.name)
        })
    })

    return (
        <Modal
            show={true}
            onHide={() => {
                props.hideModal();
            }}
        >
            <Modal.Header closeButton>
                <Modal.Title>{props.announcement.announcementTitle} - {author}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.announcement.announcementText}
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
            </Modal.Footer>
        </Modal>
    )
}