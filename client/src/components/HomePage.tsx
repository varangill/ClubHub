import React from "react";
import NavBar from "./NavigationBar";
import welcomeImage from "keerthenravichandran/Downloads/ClubHub/server/UWO.jpeg";

 


export default function HomePage() {
  const welcomeToStyle = {
    fontFamily: "cursive",
    fontSize: "5em",
  };

  return (
    <div style={{ backgroundColor: "#c080d0", color: "white", height: "100vh", textAlign: "center", position: "relative" }}>
      <NavBar />
      <div id="title-content" style={{ margin: "1em 0", position: "absolute", top: "45%", left: "20%", transform: "translate(-50%, -50%)", maxWidth: "60%" }}>
        <p style={welcomeToStyle}>Welcome to:</p>
        <p style={{ fontSize: "8em", fontWeight: "bold" }}>ClubHub</p>
      </div>
      <div id="paragraph-content" style={{ fontFamily: "Roboto, sans-serif", margin: "1em 0", position: "absolute", top: "70%", right: "31%", transform: "translate(50%, -50%)", maxWidth: "40%", fontSize: "1.2em" }}>
        <p>
          ClubHub is Western University's official gateway to the dynamic world of campus clubs. ClubHub provides students with a seamless experience to explore, connect, and immerse themselves in the diverse tapestry of our extracurricular scene, 
          fostering a vibrant university community.
        </p>
      </div>
    </div>
  );
}
