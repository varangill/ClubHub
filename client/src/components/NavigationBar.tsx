import { useNavigate } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { Home, ClipboardCheck, ClipboardList, User2 } from 'lucide-react';

export default function NavigationBar() {
  const navigate = useNavigate();
  const is_loggedin = false; //TODO: login treatment

  return (
    <Navbar id="navbar-main">
      <Navbar.Brand id="nav-title">ClubHub</Navbar.Brand>
        <Navbar.Collapse>

          {is_loggedin ? 
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

              <Navbar.Collapse className="justify-content-end">
                <Button
                variant="light"
                size="lg"
                onClick={() => {
                  console.log("clicked signout");
                  //TO-DO: pop open signup modal/pop-up
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
