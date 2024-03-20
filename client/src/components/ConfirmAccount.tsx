import { useParams } from "react-router-dom";

export default function ConfirmAccount() {

  const { email } = useParams();

  return (
    <>
    <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.woorichina.com%2Fwp-content%2Fuploads%2F2015%2F10%2Fo-UNIVERSITY-WESTERN-ONTARIO-facebook.jpg&f=1&nofb=1&ipt=8628d723842a71f22f350f0300b8b7a2d283be7c3bc2a2a8fbd5987c344cc6fa&ipo=images" className="login-background"></img>
    <div className="login-section">
      <h2>Please confirm your account email</h2><br></br>
      <span className="confirm-email-text">
        A confirmation email has been sent to: {email}
      </span>
    </div>
    </>
  );
}
