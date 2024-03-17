import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { getData, postData, deleteData } from "../api";

export default function ViewApplicationsModal(props) {
    const [memberApplications, setMemberApplications] = useState([]);
    const [executiveApplications, setExecutiveApplications] = useState([]);
    const [executiveNames, setExecutiveNames] = useState([]);
    const [memberNames, setMemberNames] = useState<any[]>([]);
    

    useEffect(() => {
        getData(`filled-applications/executive/${props.id}`).then((res)=> {
            setExecutiveApplications(res)
        });

        getData(`filled-applications/member/${props.id}`).then((res)=> {
            setMemberApplications(res)
        });

        // getData(`filled-applications/executive/${props.id}`).then((res)=> {
        //     setExecutiveApplications(res[0]["appText"].split(","))
        // });

        // getData(`filled-applications/member/${props.id}`).then((res) => {
        //     setMemberApplications(res[0]["appText"].split(","))
        // });

        assignExecutiveNames();
        assignMemberNames();
    });

    const convertId = async (array) => {
        let names = []

        for(let i = 0; i < array.length; i++) {
            try {
                await getData(`/users/getUser/${array["userId"]}`).then((res) => {
                    names.push(res[0]["name"])
                })

                return names;
            } catch (err) {
                console.log(err)
            }
        }
    }

    const assignExecutiveNames = () => {
        const userArray = executiveApplications.map(obj => obj["userId"]);
        
        const namesArray = convertId(userArray)

        setExecutiveNames(namesArray);
    }

    const assignMemberNames = () => {
        const userArray = memberApplications.map(obj => obj["userId"]);
        setMemberNames(userArray);
    }

    

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
                    <h1>
                        Executive Applications
                    </h1>
                    <div>
                        {executiveApplications.map((question, index) => {
                            return (
                                <div></div>
                            )
                        })}
                    </div>
                </div>
                    <h1>
                        Member Applications
                    </h1>
                    <div>

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