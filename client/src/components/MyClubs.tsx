import ClubList from "./ClubList";
import NavBar from "./NavigationBar";

export default function MyClubs() {
  const initialClubs = [
    { name: "Tennis Club", id: "tennis" },
    { name: "Chess Club", id: "chess" },
    { name: "Reading Club", id: "reading" },
    { name: "Science Club", id: "science" },
  ];
  return (
    <div className="my-clubs-container">
      <NavBar />
      <h2 className="club-heading">My Clubs</h2>
      <ClubList clubs={initialClubs} />
    </div>
  );
}
