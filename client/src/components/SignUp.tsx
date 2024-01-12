import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { postData } from '../api';

export default function SignUp() {
    const [name, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const navigate = useNavigate();

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        if (validateRecord()) {
            try {
                // TODO: sms to register user
                postData(`users/create-user`, {
                    name: name,
                    email: email,
                    password: password,
                }).then(()=>{
                    // Temporary until sms
                    alert("User successfully created!");
                    navigate("/login");
                });
            }
            catch (error) {
                console.log(error);
            }
        }
    };

    function validateRecord() {
        if (!name) {
            setErrorMessage("Name is required.");
            return false;
        }
        if (!email) {
            setErrorMessage("Email is required.");
            return false;
        }
        if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)) {
            setErrorMessage("Email is not valid.");
            return false;
        }
        if (!password) {
            setErrorMessage("Password is required.");
            return false;
        }
        if (password.length < 8) {
            setErrorMessage("Password must be at least 8 characters long.");
            return false;
        }
        if (!/[A-Z]/.test(password)) {
            setErrorMessage("Password must contain at least one upper-case.");
            return false;
        }
        if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password)) {
            setErrorMessage("Password must contain at least one special character.");
            return false;
        }

        return true;
    }

    return (
        <>
        <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.woorichina.com%2Fwp-content%2Fuploads%2F2015%2F10%2Fo-UNIVERSITY-WESTERN-ONTARIO-facebook.jpg&f=1&nofb=1&ipt=8628d723842a71f22f350f0300b8b7a2d283be7c3bc2a2a8fbd5987c344cc6fa&ipo=images" className="login-background"></img>
        <div className="login-section">
            <h1 className="login-header">Sign Up:</h1>
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="login-input-fields">
                    <div className="username-login-section">
                        <p className="username-label">Name:</p>
                        <input
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="email-login-section">
                        <p className="email-label">Email:</p>
                        <input
                            type="text"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="password-login-section">
                        <p className="password-label">Password:</p>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </div>
                <button className="login-submit-btn" type="submit">Confirm</button>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                <a className="sign-up-link" href="/login">Login</a>
            </form>
        </div>
        <Button className="login-go-back-btn" onClick={() => {navigate("/");}}>Go Back</Button>
        </>
    );
}