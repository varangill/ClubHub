import ClubList from "./ClubList";
import NavBar from "./NavigationBar";
import { useEffect, useState } from "react";
import { getData } from "../api";
import { useAuth } from "../AuthContext";

export default function MyClubs() {
  const [clubs, setClubs] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    getData(`users/clubs/${user?.id}`).then((res) => {
      setClubs(res);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="my-clubs-container">
      <NavBar />
      <h2 className="club-heading">My Clubs</h2>
      <ClubList clubs={clubs} />
    </div>
  );
}
