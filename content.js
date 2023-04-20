// content.js
// Author: JackBailey
// Author URI: https://jackbailey.dev
// Author Github URI: https://github.com/JackBailey
// Project Repository URI: https://github.com/JackBailey/Scheduleit-HighlightToday
// Description: Highlights the current day on ScheduleIt.
// License: MIT

let now = new Date();
let hasScrolled = false;

const getEventBoundaries = (date) => {
	let multiDay = date.includes("to");
	let start = new Date(date.split(multiDay ? "to" : "-")[0]);
	let end;
	if (multiDay) {
		end = new Date(date.split("to")[1]);
	} else {
		let [hour, minutes] = date.split("-")[1].split(":")
		end = new Date(date.split(multiDay ? "to" : "-")[0])
		end.setHours(parseInt(hour))
		end.setMinutes(parseInt(minutes));
	}

	return [start, end];
}

document.querySelector("#ics").addEventListener("DOMNodeInserted", (e) => {
	if (e.target.localName === "div" && e.target.classList.contains("section_0")) {
		let [start, end] = getEventBoundaries (e.target.querySelector(".eventbodyouter").innerText);
		let eventIsCurrent = start < now && end > now;
		if (eventIsCurrent) {
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
		} else if (!hasScrolled) {
			if (end > now) {
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
