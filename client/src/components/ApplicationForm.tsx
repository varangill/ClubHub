import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NavBar from "./NavigationBar";
import { getData, postData, deleteData } from "../api";
import "../ApplicationForm.css"


//WIP
export default function ApplicationForm() {
    const { id } = useParams();
    const [clubName, setClubName] = useState("");
    const [application, setApplication] = useState<any>([])
    const [applicationQuestions, setApplicationQuestions] = useState<string[]>([])
    const [answers, setAnswers] = useState<any>([]);

    useEffect(() => {
        getData(`clubs/${id}`).then((res) => {
            setClubName(res.clubName);
        });

        retrieveInfo();
    })

    const handleInputChange = (index, value) => {
        const newAnswers = [...answers];
        newAnswers[index] = value;
        setAnswers(newAnswers);
    }

    const handleSubmit = () => {
        console.log(answers)
    }

    const retrieveInfo = async () => {
        try {
            await getData(`applications/latest/${id}`).then((res) => {
                setApplication(res)
            });
            setApplicationQuestions(application[0]["appText"].split(","));
            setAnswers(new Array(applicationQuestions.length).fill(''));
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
                        {clubName} Application Forms
                    </h1>
                    <div class="section">
                        {applicationQuestions.map((question, index) => {
                            return (
                                <div>
                                    <ul class="question">
                                        {question}
                                    </ul>
                                    <input 
                                    type="text" 
                                    class="input"
                                    onChange={(e) => handleInputChange(index, e.target.value)}
                                    />
                                </div>
                            )
                        })}

                        <h2>
                        </h2>
                    </div>
                    <div >
                        <button onClick={handleSubmit}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    );
}