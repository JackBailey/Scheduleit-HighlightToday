// content.js
// Author: JackBailey
// Author URI: https://jackbailey.dev
// Author Github URI: https://github.com/JackBailey
// Project Repository URI: https://github.com/JackBailey/Scheduleit-HidePast
// Description: Adds a button to toggle visibility of past tasks and toggles them if they took place yesterday or before.
// License: MIT

let showingPast = false;

function togglePast() {
    showingPast = !showingPast
    document.querySelectorAll(".section_0").forEach((el)=>{
        let inPast = el.getAttribute('past') === "true"
        if (inPast) el.style.display = showingPast ? "block" : "none"
    })
    document.querySelector("#togglePastTasksButton").innerText = showingPast ? "Hide Past" : "Show Past"
    
}

function loadButton () {
    let button = document.createElement("button");
    button.onclick = togglePast
    let buttonText = document.createTextNode("Show Past");
    button.style.padding = "10px 20px";
    button.style.backgroundColor = "#e4181f";
    button.style.color = "white"
    button.style.border = "none";
    button.style.borderRadius = "5px";
    button.style.cursor = "pointer";
    button.appendChild(buttonText);
    button.id = "togglePastTasksButton"
    const containerBox = document.querySelector("body > center > div#ics")
    containerBox.insertBefore(button, containerBox.firstChild)
}


document.querySelector("#ics").addEventListener("DOMNodeInserted", (e) => {
    if (e.target.localName === "div" && e.target.classList.contains("section_0")) {
        let date = new Date(e.target.querySelector(".eventbodyouter").innerText)
        let now = new Date()
        now.setDate(now.getDate()-1)
        let inPast = date < now
        e.target.setAttribute('past', inPast.toString())
        if (inPast) {
            console.log(inPast)
            e.target.style.display = showingPast ? "block" : "none"
        }
    
        if (!document.querySelector("#togglePastTasksButton")) loadButton()
    }
})