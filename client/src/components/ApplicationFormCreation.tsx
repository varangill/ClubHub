import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NavBar from "./NavigationBar";
import { useNavigate } from "react-router-dom";
import { getData, postData, deleteData } from "../api";
import "../ApplicationForm.css"
import { useAuth } from "../AuthContext";

export default function ApplicationForm() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [clubName, setClubName] = useState("");
    const [inputFields, setInputFields] = useState([]);
    const [listData, setListData] = useState([]);
    const [appText, setAppText] = useState("");
    const { user } = useAuth();
    const [type, setType] = useState("executive");

    useEffect(() => {
        getData(`clubs/${id}`).then((res) => {
            setClubName(res.clubName);
        })
    })

    const createApplication = async () => {
        const userId = user?.id;
        const clubId = id;
        let applicationTime = new Date();

        try {
            await postData(`applications/create-application`, {
                clubId,
                userId,
                type,
                appText,
                applicationTime,
            })
        } catch (err) {
            console.log(err)
        }
    }

    const updateString = () => {
        let wholeString = "";

        if(inputFields)
            wholeString = inputFields[0];

        if(inputFields.length > 1) {
            for(let i = 1; i < inputFields.length; i++) {
                wholeString += "," + inputFields[i];
            }
        }

        setAppText(wholeString)
    }

    const handleAddInputField = () => {
        setInputFields([...inputFields, '']);
    };
    
    const handleInputChange = (index, value) => {
        const updatedInputFields = [...inputFields];
        updatedInputFields[index] = value;
        setInputFields(updatedInputFields);
        updateString();
    };
    
    const handleRemoveInputField = (index) => {
        const updatedInputFields = [...inputFields];
        updatedInputFields.splice(index, 1);
        setInputFields(updatedInputFields);
    };
    
    const handleSubmit = (event) => {
        const result = window.confirm("Are you sure you want to submit?");
        if(result) {
            event.preventDefault();
            const newData = inputFields.filter(input => input.trim() !== '');
            setListData([...listData, ...newData]);
            createApplication();
            navigate(`/club/${id}`);
        }
    };

    const handleSelection = (event) => {
        setType(event.target.value);
    }

    const options = [
        {label: "Executive", value: "executive"},
        {label: "Member", value: "member"},
    ];

    return (
        <div>
            <NavBar />
            <div class="container">
                <div class="content">
                    <h1 class="title">
                        {clubName} Application Form
                    </h1>
                    <div class="dropdown">
                        Application Type: 
                        <select value={type} id="dropdown" onChange={(e) => handleSelection(e)} class="selector">
                            {options.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div class="section">
                    <form onSubmit={handleSubmit}>
                        {inputFields.map((input, index) => (
                        <div key={index}>
                            <input
                            type="text"
                            value={input}
                            class="inputText"
                            onChange={(e) => handleInputChange(index, e.target.value)}
                            />
                            <button type="button" onClick={() => handleRemoveInputField(index)}>Remove</button>
                        </div>
                        ))}
                        <button type="button" class="add" onClick={handleAddInputField}>+</button>
                        <button type="submit" class="submit" onClick={updateString}>Submit</button>
                    </form>
                    </div>
                </div>
            </div>
        </div>
    );
}