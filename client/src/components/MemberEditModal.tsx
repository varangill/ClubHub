import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { postData, deleteData } from "../api";

export default function MemberEditModal(props) {
  const onPromote = async () => {
    try {
      await postData(`clubs/promote-member`, {
        userId: props.member["userId"],
        clubId: props.clubId,
      }).then(() => {
        props.requestUpdate(); //Make parent page refresh member list
        props.hideModal();
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onDemote = async () => {
    try {
      await postData(`clubs/demote-member`, {
        userId: props.member["userId"],
        clubId: props.clubId,
      }).then(() => {
        props.requestUpdate(); //Make parent page refresh member list
        props.hideModal();
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onKick = async () => {
    try {
      await deleteData(`clubs/kick-user`, {
        userId: props.member["userId"],
        clubId: props.clubId,
      }).then(() => {
        props.requestUpdate(); //Make parent page refresh member list
        props.hideModal();
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onBan = async () => {
    try {
      await postData(`clubs/ban-user`, {
        userId: props.member["userId"],
        clubId: props.clubId,
        bannerId: props.userId,
      }).then(() => {
        props.requestUpdate(); //Make parent page refresh member list
        props.hideModal();
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onTransferOwnership = async () => {
    try {
      await postData(`clubs/transfer-ownership`, {
        newOwnerId: props.member["userId"],
        clubId: props.clubId,
        oldOwnerId: props.userId,
      }).then(() => {
        props.requestUpdate(); //Make parent page refresh member list
        props.hideModal();
      });
    } catch (error) {
      console.log(error);
    }
  };

  const ExecutiveRankButton = (props) => {
    return (
      <div>
        {props.membershipType === "member" ? (
          <Button onClick={onPromote}>Promote to Executive</Button>
        ) : (
          <Button onClick={onDemote}>Demote to Member</Button>
        )}
      </div>
    );
  };

  //Boolean to check if the current user can promote/demote/kick/ban the selected member
  //True conditions: current user is owner, or current user is executive and selected member is member
  const doesUserOutrankSelectedMember =
    props.memberType === "owner" ||
    (props.member["membershipType"] === "member" &&
      props.memberType === "executive");

  return (
    <Modal
      show={true}
      onHide={() => {
        props.hideModal();
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>Member: {props.member.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <div>
            <Button
              variant="primary"
              onClick={() => {
                console.log("Clicked message button"); //To be done
              }}
            >
              Message
            </Button>
          </div>
          <div>
            {doesUserOutrankSelectedMember ? (
              <ExecutiveRankButton
                membershipType={props.member["membershipType"]}
              />
            ) : null}
          </div>
          {doesUserOutrankSelectedMember ? (
            <div>
              <div>
                <Button variant="primary" onClick={onKick}>
                  Kick
                </Button>
              </div>
              <div>
                <Button variant="primary" onClick={onBan}>
                  Ban
                </Button>
              </div>
            </div>
          ) : null}
        </div>
        {props.memberType === "owner" ? (
          <div>
            <Button variant="primary" onClick={onTransferOwnership}>
              Transfer Ownership
            </Button>
          </div>
        ) : null}
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
  );
}
