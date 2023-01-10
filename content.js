// content.js
// Author:
// Author URI: https://
// Author Github URI: https://www.github.com/
// Project Repository URI: https://github.com/
// Description: Handles all the webpage level activities (e.g. manipulating page data, etc.)
// License: MIT

let showingPast = false;

function togglePast() {
    document.querySelectorAll(".eventbodyouter").forEach((el)=>{
        let date = new Date(el.innerText)
        let now = new Date()
        now.setDate(now.getDate()-1)
        let inPast = date < now
        if (inPast) el.closest(".section_0").style.display = showingPast ? "block" : "none"
    })
    document.querySelector("#togglePastTasksButton").innerText = showingPast ? "Hide Past" : "Show Past"
    showingPast = !showingPast
    
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
    // containerBox.style.display = "flex";
    // containerBox.style.alignItems = "center"
    // containerBox.style.justifyContent = "center"
    // containerBox.style.flexDirection ="column";
}




// wait until loaded

let loadingInterval = setInterval(() => {
    let loadingElement = document.querySelector("#loading")
    if (loadingElement.style.display == "none")  {
        clearInterval(loadingInterval)
        loadButton()
        togglePast()
    }
},100)