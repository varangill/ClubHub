import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NavBar from "./NavigationBar";
import { useNavigate } from "react-router-dom";
import { getData, postData, deleteData } from "../api";
import "../ApplicationForm.css"

export default function ApplicationForm() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [clubName, setClubName] = useState("");
    const [inputFields, setInputFields] = useState([]);
    const [listData, setListData] = useState([]);

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

    const handleAddInputField = () => {
        setInputFields([...inputFields, '']);
      };
    
      const handleInputChange = (index, value) => {
        const updatedInputFields = [...inputFields];
        updatedInputFields[index] = value;
        setInputFields(updatedInputFields);
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
                    <ul>
                        {listData.map((item, index) => (
                        <li key={index}>{item}</li>
                        ))}
                    </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}