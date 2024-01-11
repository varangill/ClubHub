import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { postData } from '../api';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const navigate = useNavigate();

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        try {
            const res = await postData(`users/login`, {
                email: email,
                password: password,
            });
            if (res.authenticated) {
                navigate("/");
            }
            else {
                setErrorMessage("Username or password is incorrect.");
            }
        }
        catch (error) {
            setErrorMessage("Username or password is incorrect.");
        }
    };

    return (
        <>
        <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.woorichina.com%2Fwp-content%2Fuploads%2F2015%2F10%2Fo-UNIVERSITY-WESTERN-ONTARIO-facebook.jpg&f=1&nofb=1&ipt=8628d723842a71f22f350f0300b8b7a2d283be7c3bc2a2a8fbd5987c344cc6fa&ipo=images" className="login-background"></img>
        <div className="login-section">
            <h1 className="login-header">Login:</h1>
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="login-input-fields">
                    <div className="username-login-section">
                        <p className="username-label">Email:</p>
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
                    <a className="forgot-pswd" href="/">Forgot password?</a>
                </div>
                <button className="login-submit-btn" type="submit">Confirm</button>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                <a className="sign-up-link" href="/sign-up">Sign up</a>
            </form>
        </div>
        <Button className="login-go-back-btn" onClick={() => {navigate("/");}}>Go Back</Button>
        </>
    );
}