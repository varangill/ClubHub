import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NavBar from "./NavigationBar";
import { getData, postData, deleteData } from "../api";
import { useAuth } from "../AuthContext";
import "../ApplicationForm.css";

export default function ApplicationForm() {
    const { id } = useParams();
    const [clubName, setClubName] = useState("");
    const [name, setName] = useState("");
    const [application, setApplication] = useState<any>([]);
    const [applicationQuestions, setApplicationQuestions] = useState<string[]>([])
    const [answers, setAnswers] = useState("");
    const [inputValues, setInputValues] = useState(Array(applicationQuestions.length).fill(''))
    const [type, setType] = useState("executive");
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        getData(`clubs/${id}`).then((res) => {
            setClubName(res.clubName);
        });

        getData(`users/getUser/${user?.id}`).then((res) => {
            setName(res.name)
        })

        retrieveInfo();
    }, []);

    const handleInputChange = (index, value) => {
        const newInputValues = [...inputValues];
        newInputValues[index] = value;
        setInputValues(newInputValues);
        updateValues();
    };

    const fillApplication = async () => {
        updateValues();
        const clubId = id;
        const userId = user?.id;
        const applicationId = application[0]["id"];
        const appText = answers;

        try {
            await postData(`filled-applications/create-filled-application`, {
                userId,
                clubId,
                applicationId,
                type,
                appText,
                name,
            })
        } catch (err) {
            console.log(err)
        }
    }

    const updateValues = () => {
        let wholeString = inputValues[0];

        for(let i = 1; i < inputValues.length; i++) {
            wholeString += "," + inputValues[i];
        }

        setAnswers(wholeString);
    }

    const handleSubmit = () => {
        const result = window.confirm("Are you sure you want to submit?");
        if(result) {
            fillApplication();
            navigate(`/club/${id}`);
        }
    };

    const retrieveInfo = async () => {
        try {
            await getData(`applications/executive/${id}`).then((res) => {
                setApplication(res)
            });
            setApplicationQuestions(application[0]["appText"].split(","));
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
                                <div key={index}>
                                    <ul class="question">
                                        {question}
                                    </ul>
                                    <input 
                                    type="text" 
                                    class="input"
                                    value={inputValues[index]}
                                    onChange={(e) => handleInputChange(index, e.target.value)}
                                    />
                                </div>
                            )
                        })}
                    </div>
                    <div >
                        <button onClick={handleSubmit} class="application-submit">Submit</button>
                    </div>
                </div>
            </div>
        </div>
    );
}