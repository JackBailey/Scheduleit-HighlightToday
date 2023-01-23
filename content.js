// content.js
// Author: JackBailey
// Author URI: https://jackbailey.dev
// Author Github URI: https://github.com/JackBailey
// Project Repository URI: https://github.com/JackBailey/Scheduleit-Enhancements
// Description: A few utilities to make the scheduleit calendar view better.
// License: MIT

let now = new Date();
let hasScrolled = false;
let showingPast = false;
let enablePastHiding;
let highlightCurrent;
let scrollToCurrent;
let expandCurrent;

const storageItems = [
	{
		id: "enablePastHiding",
		default: false,
	},
	{
		id: "highlightCurrent",
		default: true,
	},
	{
		id: "scrollToCurrent",
		default: true,
	},
	{
		id: "expandCurrent",
		default: true,
	},
];

const storageItemIDs = storageItems.map((item) => item.id);

const togglePast = () => {
	showingPast = !showingPast;
	document.querySelectorAll(".section_0").forEach((el) => {
		let inPast = el.getAttribute("past") === "true";
		if (inPast) el.style.display = showingPast ? "block" : "none";
	});
	document.querySelector("#togglePastTasksButton").innerText = showingPast ? "Hide Past" : "Show Past";
};

const loadButton = () => {
	let button = document.createElement("button");
	button.onclick = togglePast;
	let buttonText = document.createTextNode("Show Past");
	button.style.padding = "10px 20px";
	button.style.backgroundColor = "#e4181f";
	button.style.color = "white";
	button.style.border = "none";
	button.style.borderRadius = "5px";
	button.style.cursor = "pointer";
	button.appendChild(buttonText);
	button.id = "togglePastTasksButton";
	const containerBox = document.querySelector("body > center > div#ics");
	containerBox.insertBefore(button, containerBox.firstChild);
};

const handleShiftAddition = (e) => {
	if (e.target.localName === "div" && e.target.classList.contains("section_0")) {
		let date = new Date(e.target.querySelector(".eventbodyouter").innerText);
		let now = new Date();
		now.setDate(now.getDate() - 1);
		let inPast = date < now;
		e.target.setAttribute("past", inPast.toString());
		if (inPast && enablePastHiding) {
			e.target.style.display = showingPast ? "block" : "none";
		}
	}
};

chrome.storage.local.get(storageItemIDs, (items) => {
	let undefinedItems = [];
	storageItemIDs.map((id) => {
		if (items[id] === undefined) {
			undefinedItems.push(id);
			items[id] = storageItems.find((item) => item.id === id).default;
		}
	});

	// replaced undefined items with defaults
	let newValues = Object.fromEntries(undefinedItems.map((id) => [id, items[id]]));
	chrome.storage.local.set(newValues, () => {
		let { enablePastHiding, highlightCurrent, scrollToCurrent, expandCurrent } = items;

		if (enablePastHiding) loadButton();

		document.querySelector("#ics").addEventListener("DOMNodeInserted", handleShiftAddition);
	});
});

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
