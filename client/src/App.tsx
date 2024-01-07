import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./routers/Router";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
);

interface Listitem {
  text: string;
}

function createUL(listItems: Listitem[]): void {
  const container = document.getElementById("list-container")

  if(container) {
      const ul = document.createElement("ul")

      listItems.forEach((item) => {
          const li = document.createElement("li")
          li.textContent = item.text

          ul.appendChild(li)
      })

      container.appendChild(ul)
  }
}

const myList: Listitem[] = [
  {text: "Club1"},
  {text: "Club2"},
  {text: "Club3"}
]

createUL(myList)
