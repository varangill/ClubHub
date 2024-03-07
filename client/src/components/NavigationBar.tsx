import { useNavigate } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { Home, ClipboardCheck, ClipboardList, User2 } from 'lucide-react';
import { useAuth } from "../AuthContext";


export default function NavigationBar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const userProfileImage = localStorage.getItem('userProfileImage');

  function logoutUser () {
    logout();
    navigate('/');
    localStorage.removeItem('userProfileImage');
  }

  return (
    <Navbar id="navbar-main">
      <Navbar.Brand id="nav-title">ClubHub</Navbar.Brand>
        <Navbar.Collapse>

          {user ? 
            <div className="nav-items">
            <Nav>
              <Nav.Link
              onClick={() => {
                navigate("/");
                }}
              >
                <Home />Home
              </Nav.Link>

              <Nav.Link
              onClick={() => {
                navigate("/my_clubs");
              }}
              >
                <ClipboardCheck />My Clubs
              </Nav.Link>

              <Nav.Link
              onClick={() => {
                navigate("/all_clubs");
              }}
              >
                <ClipboardList />All Clubs
              </Nav.Link>

              <Nav.Link
              onClick={() => {
                navigate("/profile");
              }}
              >
              <User2 />View Profile
              </Nav.Link>
            </Nav>
            <div className="justify-content-end">
{user && userProfileImage && (
  <img
    src={userProfileImage} // Make sure userProfileImage is correctly set to the URL of the user's profile image
    alt="Profile"
    style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '90px', marginTop: '90px' }}
  />
)}

                // Your button logic for Sign Out, Login, and Sign Up...
            </div> 
            
              <Navbar.Collapse className="justify-content-end">
                <Button
                variant="light"
                size="lg"
                onClick={() => {
                  logoutUser();
                }}
                >
                Sign Out
                </Button>
              </Navbar.Collapse>
            </div>
          : 
            <div className="nav-items">
            <Nav>
              <Nav.Link
              onClick={() => {
                navigate("/");
                }}
              >
                <Home />Home
              </Nav.Link>

              <Nav.Link
              onClick={() => {
                navigate("/all_clubs");
              }}
              >
                <ClipboardList />All Clubs
              </Nav.Link>
            </Nav>

              <Navbar.Collapse className="justify-content-end">
                <Button
                variant="light"
                size="lg"
                onClick={() => {
                  navigate("/login");
                }}
                >
                Login
                </Button>

                <Button
                variant="light"
                size="lg"
                onClick={() => {
                  navigate("/sign-up");
                }}
                >
                Sign up
                </Button>
              </Navbar.Collapse>
            </div>
          }
        </Navbar.Collapse>
    </Navbar>
  );
}
