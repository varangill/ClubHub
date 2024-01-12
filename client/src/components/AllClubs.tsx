import ClubList from "./ClubList";
import NavBar from "./NavigationBar";

export default function AllClubs() {
  const initialClubs = [
    { name: "Tennis Club", id: "tennis" },
    { name: "Chess Club", id: "chess" },
    { name: "Reading Club", id: "reading" },
    { name: "Science Club", id: "science" },
    { name: "Art Club", id: "art" },
    { name: "Music Club", id: "music" },
    { name: "Cooking Club", id: "cooking" },
    { name: "Photography Club", id: "photography" },
    { name: "Gaming Club", id: "gaming" },
    { name: "Dance Club", id: "dance" },
  ];

  // Filter clubs based on query

  return (
    <div className="my-clubs-container">
      <NavBar />
      <h2 className="club-heading">All Clubs</h2>
      <ClubList clubs={initialClubs} />
    </div>
  );
}
