import ClubList from "./ClubList";
import NavBar from "./NavigationBar";
import { useEffect, useState } from "react";
import { getData } from "../api";
import Button from "react-bootstrap/Button";
import ClubCreationModal from "./ClubCreationModal";

export default function AllClubs() {
  const [clubs, setClubs] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getData("clubs").then((res) => {
      setClubs(res);
    });
  }, []);

  const findClubsByTag = (tag) => {
    getData(`tags/${tag["id"]}`).then((clubsRes) => {
      setClubs(clubsRes);
    });
  };

  return (
    <div className="my-clubs-container">
      <NavBar />
      {showModal && (
        <ClubCreationModal
          hideModal={() => {
            setShowModal(false);
          }}
        />
      )}
      <h2 className="club-heading">All Clubs</h2>
      <ClubList
        clubs={clubs}
        isAllPage={true}
        tagSelectorUpdate={findClubsByTag}
      />
      <Button
        variant="success"
        size="lg"
        onClick={() => {
          setShowModal(true);
        }}
        className="create-club-btn"
      >
        Create Club
      </Button>
    </div>
  );
}
