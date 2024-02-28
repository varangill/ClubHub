import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { postData } from '../api';

export default function SignUp() {
    const [name, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(''); // For image preview
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateRecord()) {
            try {
                const formData = new FormData();
                formData.append('name', name);
                formData.append('email', email);
                formData.append('password', password);
                if (image) {
                    formData.append('image', image);
                }

                // Replace the postData URL and method as necessary for your backend
                postData(`users/create-user`, formData).then(() => {
                    alert("User successfully created!");
                    navigate("/login");
                });
            } catch (error) {
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

    // For handling image upload and setting up preview, only accept PNG images
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type === "image/png") {
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        } else {
            setImage(null);
            setImagePreview('');
            setErrorMessage("Only PNG images are accepted.");
        }
    };

    return (
        <>
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
                        {/* Line above profile photo section */}
                        <div style={{ marginTop: '20px', marginBottom: '10px' }}>
                            <hr />
                            <p style={{ textAlign: 'center' }}>Upload a Profile Photo (PNG only)</p>
                        </div>
                        {/* Profile photo section with preview */}
                        <div className="photo-upload-section">
                            <input
                                type="file"
                                accept="image/png"
                                onChange={handleImageChange}
                            />
                            {imagePreview && (
                                <img src={imagePreview} alt="Profile Preview" style={{ width: '100%', marginTop: '10px' }} />
                            )}
                        </div>
                    </div>
                    <button className="login-submit-btn" type="submit">Confirm</button>
                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                    <a className="sign-up-link" href="/login">Already have an account? Login</a>
                </form>
            </div>
            <Button className="login-go-back-btn" onClick={() => navigate("/")}>Go Back</Button>
        </>
    );
}
