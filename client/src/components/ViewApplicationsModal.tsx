import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import FilledApplicationsModal from "./FilledApplicationModal";
import { getData, postData, deleteData } from "../api";

export default function ViewApplicationsModal(props) {
    const [memberApplications, setMemberApplications] = useState<any>([]);
    const [executiveApplications, setExecutiveApplications] = useState<any>([]);
    const [selectedApplication, setSelectedApplication] = useState({});
    const [showFilledApplicationModal, setShowFilledApplicationModal] = useState(false);
    
    useEffect(() => {
        getData(`filled-applications/executive/${props.clubId}`).then((res)=> {
            setExecutiveApplications(res)
        });

        getData(`filled-applications/member/${props.clubId}`).then((res)=> {
            setMemberApplications(res)
        });

        // getData(`filled-applications/executive/${props.id}`).then((res)=> {
        //     setExecutiveApplications(res[0]["appText"].split(","))
        // });

        // getData(`filled-applications/member/${props.id}`).then((res) => {
        //     setMemberApplications(res[0]["appText"].split(","))
        // });
    });    

    return (
        <Modal show={true}
        onHide={() => {
            props.hideModal();
        }}
        >
            <Modal.Header closeButton>
                <Modal.Title>Club Application Forms</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <div>
                    {showFilledApplicationModal && (
                        <FilledApplicationsModal
                            hideModal={() => {
                                setShowFilledApplicationModal(false);
                            }}
                            clubId={props.id}
                            application={selectedApplication}
                        />
                    )}
                    <h1>
                        Executive Applications
                    </h1>
                    <div className="scroll">
                        {executiveApplications.map((application) => {

                            const time = application["applicationTime"].slice(0, -14);

                            return (
                                <ul
                                  key={application["id"]}
                                  className="announcement"
                                  onClick={() => {
                                    setSelectedApplication(application);
                                    setShowFilledApplicationModal(true);
                                  }}
                                >
                                  {application["name"]} - {time}
                                </ul>
                            )
                        })}
                    </div>
                </div>
                    <h1>
                        Member Applications
                    </h1>
                    <div className="scroll">
                        {memberApplications.map((application) => {

                            const time = application["applicationTime"].slice(0, -14);

                            return (
                                <ul
                                  key={application["id"]}
                                  className="announcement"
                                  onClick={() => {
                                    setSelectedApplication(application);
                                    setShowFilledApplicationModal(true);
                                  }}
                                >
                                  {application["name"]} - {time}
                                </ul>
                            )
                        })}
                    </div>
                <div>

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
            </Modal.Footer>
        </Modal>
    )
}