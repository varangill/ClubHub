import ClubList from "./ClubList";
import NavBar from "./NavigationBar";
import { useEffect, useState } from "react";
import { getData } from "../api";

export default function AllClubs() {
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    getData("clubs").then((res) => {
      setClubs(res);
    });
  }, []);

  return (
    <div className="my-clubs-container">
      <NavBar />
      <h2 className="club-heading">All Clubs</h2>
      <ClubList clubs={clubs} />
    </div>
  );
}
