import NavBar from "./NavigationBar";

// URL of the image
const welcomeImageUrl = "https://www.uwo.ca/finance/images/homepage_images/westernu-campus.jpg";

export default function HomePage() {

  return (
    <div className="main-page">
      <NavBar />
      <div className="main-menu-image-container">
        <img className="main-menu-image" src={welcomeImageUrl} alt="Welcome Image"/>
        <div className="main-page-header"><span className="header-text-1">Welcome to</span> <span className="header-text-2">ClubHub&#8482;</span></div>
      </div>
      <div className="main-menu-lower">
          ClubHub is Western University's official gateway to the dynamic world of campus clubs. ClubHub provides students with a seamless experience to explore, connect, and immerse themselves in the diverse tapestry of our extracurricular scene, fostering a vibrant university community.
      </div>
    </div>
  );
}
//