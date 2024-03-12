import { useParams } from "react-router-dom";
import { postData } from "../api";
import { useEffect } from "react";

export default function RegisterUser() {

  const { email } = useParams();

  useEffect( () => {
        const registerUser = async () => {
            try {
                await postData(`users/register-user`, {email: email});
            } catch (error) {
                console.error(error);
            }
        };

        registerUser();
  }, []);

  return (
    <>
    <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.woorichina.com%2Fwp-content%2Fuploads%2F2015%2F10%2Fo-UNIVERSITY-WESTERN-ONTARIO-facebook.jpg&f=1&nofb=1&ipt=8628d723842a71f22f350f0300b8b7a2d283be7c3bc2a2a8fbd5987c344cc6fa&ipo=images" className="login-background"></img>
    <div className="login-section">
        <h2>This account is now registered</h2>
        <a className="sign-up-link" href="/login">Login</a>
    </div>
    </>
  );
}

