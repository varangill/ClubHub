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
    const [appText, setAppText] = useState("")
    const { user } = useAuth();

    useEffect(() => {
        
    })

    const createApplication = async () => {
        const userId = user?.id;
        const clubId = id;
        let applicationTime = new Date();

        try {
            await postData(`applications/create-application`, {
                clubId,
                userId,
                appText,
                applicationTime,
            })
        } catch (err) {
            console.log(err)
        }
    }

    const updateString = () => {
        let wholeString = ""

        if(listData)
            wholeString = listData[0];

        if(listData.length > 1) {
            for(let i = 1; i < listData.length; i++) {
                wholeString += "," + listData[i];
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
        const result = window.confirm("Are you sure you want to submit?")
        if(result) {
            event.preventDefault();
            const newData = inputFields.filter(input => input.trim() !== '');
            setListData([...listData, ...newData]);
            createApplication();
            alert("Submitted")
            navigate(`/club/${id}`)
        }
      };

    return (
        <div>
            <NavBar />
            <div class="container">
                <div class="content">
                    <h1 class="title">
                        {clubName} Application Form
                    </h1>
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
                        <button type="submit" class="submit">Submit</button>
                    </form>
                    </div>
                </div>
            </div>
        </div>
    );
}