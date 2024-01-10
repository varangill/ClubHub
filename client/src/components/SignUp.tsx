import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        try {
            //Sign-Up
        }
        catch (error) {
            console.error('Sign-Up failed');
        }
    };

    return (
        <>
        <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.woorichina.com%2Fwp-content%2Fuploads%2F2015%2F10%2Fo-UNIVERSITY-WESTERN-ONTARIO-facebook.jpg&f=1&nofb=1&ipt=8628d723842a71f22f350f0300b8b7a2d283be7c3bc2a2a8fbd5987c344cc6fa&ipo=images" className="login-background"></img>
        <div className="login-section">
            <h1 className="login-header">Sign Up:</h1>
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="login-input-fields">
                    <div className="username-login-section">
                        <p className="username-label">Username:</p>
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
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
                <a className="sign-up-link" href="/login">Login</a>
            </form>
        </div>
        <Button className="login-go-back-btn" onClick={() => {navigate("/");}}>Go Back</Button>
        </>
    );
}