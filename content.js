// content.js
// Author: JackBailey
// Author URI: https://jackbailey.dev
// Author Github URI: https://github.com/JackBailey
// Project Repository URI: https://github.com/JackBailey/Scheduleit-HighlightToday
// Description: Highlights the current day on ScheduleIt.
// License: MIT

let now = new Date();
let hasScrolled = false;

function isToday(someDate) {
	const today = now;
	return someDate.getDate() == today.getDate() && someDate.getMonth() == today.getMonth() && someDate.getFullYear() == today.getFullYear();
}

document.querySelector("#ics").addEventListener("DOMNodeInserted", (e) => {
	if (e.target.localName === "div" && e.target.classList.contains("section_0")) {
		let date = new Date(e.target.querySelector(".eventbodyouter").innerText);
		let dateIsToday = isToday(date);
		if (dateIsToday) {
			e.target.querySelector(".eventbodyouter").style.backgroundColor = "#6cbeeb";
			e.target.querySelector(".eventbodyouter").style.color = "white";
			e.target.querySelector(".eventbody").style.height = "";
			if (!hasScrolled) {
				hasScrolled = true;
				const element = e.target;
				element.scrollIntoView({
					behavior: "smooth",
				});
			}
		}
		if (!dateIsToday && !hasScrolled) {
			if (date > now) {
				const placeholder = document.createElement("div");
				placeholder.style.backgroundColor = "#6cbeeb";
				placeholder.style.color = "white";
				placeholder.style.maxWidth = "650px";
				placeholder.style.borderRadius = "5px";
				placeholder.style.padding = "10px";
				placeholder.style.boxSizing = "border-box";
				placeholder.style.marginBottom = "20px";
				const text = document.createTextNode("Nothing planned for today.");
				placeholder.appendChild(text);

				document.querySelector("#ics").insertBefore(placeholder, e.target);
				hasScrolled = true;
			}
		}
	}
});
