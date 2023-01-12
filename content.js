// content.js
// Author: JackBailey
// Author URI: https://jackbailey.dev
// Author Github URI: https://github.com/JackBailey
// Project Repository URI: https://github.com/JackBailey/Scheduleit-HighlightToday
// Description: Highlights the current day on ScheduleIt.
// License: MIT

let hasScrolled = false;

function isToday(someDate) {
	const today = new Date();
	return someDate.getDate() == today.getDate() && someDate.getMonth() == today.getMonth() && someDate.getFullYear() == today.getFullYear();
}

document.querySelector("#ics").addEventListener("DOMNodeInserted", (e) => {
	if (e.target.localName === "div" && e.target.classList.contains("section_0")) {
		let date = new Date(e.target.querySelector(".eventbodyouter").innerText);
		let dateIsToday = isToday(date);
		if (dateIsToday) {
			e.target.querySelector(".eventbodyouter").style.backgroundColor = "#6cbeeb";
			e.target.querySelector(".eventbodyouter").style.color = "white";
			if (!hasScrolled) {
				hasScrolled = true;
				const element = e.target;
				const elementRect = element.getBoundingClientRect();
				const absoluteElementTop = elementRect.top + window.pageYOffset;
				const middle = Math.abs(absoluteElementTop - window.innerHeight / 2);
				window.scrollTo(0, middle);
			}
		}
	}
});
