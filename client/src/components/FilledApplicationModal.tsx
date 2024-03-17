import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { postData, deleteData, getData } from "../api";

export default function FilledApplicationsModal(props) {
    const [showPopup, setShowPopup] = useState(false);
    const [memberType, setMemberType] = useState("");
    const [userId, setUserId] = useState(props.userId);
    const [clubId, setClubId] = useState(props.clubId);
    const [type, setType] = useState("")

    useEffect(() => {
        
    })

    const approve = async () => {
        if(type === "executive") {

        }

        if(type === "member") {
            postData(`users/join-club`, {
                userId: userId,
                clubId: clubId,
            }).then((res) => {
                if (res.membershipType === "member") {
                    setMemberType(res.membershipType);
                    setShowPopup(true);
                    setTimeout(() => {
                      setShowPopup(false); // Hide the popup after a few seconds
                    }, 3000);
                  } else if (res.membershipType === "banned") {
                    alert("You are banned from this club.");
                  }
            })
        }
    }

    const reject = async () => {

    }

    <Modal show={true}
    onHide={() => {
        props.hideModal();
    }}
    >
        <Modal.Header closeButton>
            <Modal.Title>Club Application Forms</Modal.Title>
        </Modal.Header>

        <Modal.Body>

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
                onClick={approve}
            >
                Approve
            </Button>
            <Button variant="danger"
                onClick={reject}
            >
                Reject
            </Button>
        </Modal.Footer>
    </Modal>
}