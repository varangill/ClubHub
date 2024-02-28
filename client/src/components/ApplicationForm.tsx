import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NavBar from "./NavigationBar";
import { getData, postData, deleteData } from "../api";
import "../ApplicationForm.css"

export default function ApplicationForm() {
    const { id } = useParams();
    const [clubName, setClubName] = useState("");

    useEffect(() => {
        retrieveInfo();
    })

    const retrieveInfo = async () => {
        try {
            await getData(`clubs/${id}`).then((res) => {
                setClubName(res.clubName)
            })
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            <NavBar />
            <div class="container">
                <div class="content">
                    <h1 class="title">
                        {clubName} Application Form
                    </h1>
                    <div class="section">
                        <h2>
                            Name
                        </h2>
                    </div>
                    <div class="section">
                    <input type="text" placeholder="First Name" class="input"/>
                    <input type="text" placeholder="Last Name" class="input"/>
                    </div>
                    <div class="section">
                        <h2>Reason for joining:</h2>
                        <input type="text" class="explanation" id="explanation"/>
                    </div>
                    <div>
                        <h2 class="section">
                            Phone Number
                        </h2>
                    </div>
                    <div>
                        <h2 class="section">
                            Address
                        </h2>
                    </div>
                    <div >
                        <button>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    );
}