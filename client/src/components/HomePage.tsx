import React from "react";
import NavBar from "./NavigationBar";

// URL of the image
const welcomeImageUrl = "https://www.uwo.ca/finance/images/homepage_images/westernu-campus.jpg";

export default function HomePage() {
  const welcomeToStyle = {
    fontFamily: "cursive",
    fontSize: "5em",
  };

  return (
    <div style={{ backgroundColor: "#c080d0", color: "white", height: "100vh", textAlign: "center", position: "relative" }}>
      <NavBar />

      {/* Welcome to Section */}
      <div id="welcome-section" style={{ position: "absolute", top: "40%", left: "30%", transform: "translate(-50%, -50%)", maxWidth: "80%" }}>
        <div id="title-content" style={{ margin: "1em 0", textAlign: "left" }}>
          <p style={welcomeToStyle}>Welcome to:</p>
        </div>
      </div>

      {/* ClubHub Section */}
      <div id="clubhub-section" style={{ position: "absolute", top: "50%", left: "27%", transform: "translate(-50%, -50%)", maxWidth: "80%" }}>
        <div id="title-content" style={{ margin: "1em 0", textAlign: "left" }}>
          <p style={{ fontSize: "8em", fontWeight: "bold", marginLeft: "1em" }}>ClubHub</p>
        </div>
      </div>

      {/* Photo Section */}
      <div id="photo-section" style={{ position: "absolute", top: "40%", left: "70%", transform: "translate(-50%, -50%)" }}>
        <div id="image-content" style={{ marginLeft: "1em" }}>
          <img src={welcomeImageUrl} alt="Welcome Image" style={{ width: "120%", height: "auto" }} />
        </div>
      </div>

      {/* Paragraph Section */}
      <div id="paragraph-section" style={{ position: "absolute", top: "70%", left: "75%", transform: "translate(-50%, -50%)", maxWidth: "80%" }}>
        <div id="paragraph-content" style={{ fontFamily: "Roboto, sans-serif", fontSize: "1.2em" }}>
          <p>
            ClubHub is Western University's official gateway to the dynamic world of campus clubs. ClubHub provides students with a seamless experience to explore, connect, and immerse themselves in the diverse tapestry of our extracurricular scene, 
            fostering a vibrant university community.
          </p>
        </div>
      </div>
    </div>
  );
}
