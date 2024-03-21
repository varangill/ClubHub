import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { postData, deleteData, getData } from "../api";
import { useNavigate } from "react-router-dom";

export default function FilledApplicationsModal(props) {
  const [showPopup, setShowPopup] = useState(false);
  const [memberType, setMemberType] = useState("");
  const [userId, setUserId] = useState(props.application["userId"]);
  const [type, setType] = useState(props.application["type"]);
  const [questionsString, setQuestionsString] = useState("");
  const [applicationQuestions, setApplicationQuestions] = useState<string[]>(
    []
  );
  const [responses, setResponses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getData(`applications/${props.application["applicationId"]}`).then(
      (res) => {
        setQuestionsString(res.appText);
        setApplicationQuestions(res.appText.split(","));
      }
    );

    const splitAnswers = props.application["appText"].split(",");
    setResponses(splitAnswers);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const approve = async () => {
    if (type === "executive") {
      await postData(`clubs/promote-member`, {
        userId: userId,
        clubId: props.clubId,
      });

      await deleteData(`filled-applications/executive/${userId}`, {}).then(
        () => {
          props.hideModal();
          props.requestUpdate();
        }
      );
    }

    if (type === "member") {
      await postData(`users/join-club`, {
        userId: userId,
        clubId: props.clubId,
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
      });

      await deleteData(`filled-applications/member/${userId}`, {}).then(() => {
        props.hideModal();
        props.requestUpdate();
      });
    }
  };

  const reject = async () => {
    if (type === "executive") {
      await deleteData(`filled-applications/executive/${userId}`, {}).then(
        () => {
          props.hideModal();
        }
      );
    }

    if (type === "member") {
      await deleteData(`filled-applications/member/${userId}`, {}).then(() => {
        props.hideModal();
      });
    }
  };

  return (
    <Modal
      show={true}
      onHide={() => {
        props.hideModal();
      }}
      size="lg"
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {props.application["name"]}'s club {props.application["type"]}{" "}
          application form
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div>
          {applicationQuestions.map((question, index) => {
            return (
              <div>
                <ul style={{ fontWeight: "bold", padding: 0 }}>{question}</ul>
                <ul style={{ padding: 0 }}>{responses[index]}</ul>
              </div>
            );
          })}
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
        <Button variant="primary" onClick={approve}>
          Approve
        </Button>
        <Button variant="danger" onClick={reject}>
          Reject
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
