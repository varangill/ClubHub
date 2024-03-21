import { useNavigate } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { Home, ClipboardCheck, ClipboardList, User2 } from 'lucide-react';
import { useAuth } from "../AuthContext";


export default function NavigationBar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();


  function logoutUser () {
    logout();
    navigate('/');
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
            </Nav>
            <div className="justify-content-end">

                
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
