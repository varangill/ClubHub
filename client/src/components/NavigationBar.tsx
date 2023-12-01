import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";

export default function NavigationBar() {
  const navigate = useNavigate();

  return (
    <Navbar id="navbar-main">
      <Container>
        <Navbar.Brand>ClubHub</Navbar.Brand>
        <Navbar.Collapse>
          <Nav>
            <Nav.Link
              onClick={() => {
                navigate("/");
              }}
            >
              Home
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/club/1");
              }}
            >
              Clubs
            </Nav.Link>
          </Nav>
          <Navbar.Collapse className="justify-content-end">
            <Button
              variant="primary"
              onClick={() => {
                console.log("clicked login");
                //TO-DO: pop open login modal/pop-up
              }}
            >
              Login
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                console.log("clicked signup");
                //TO-DO: pop open signup modal/pop-up
              }}
            >
              Sign up
            </Button>
          </Navbar.Collapse>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
