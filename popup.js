const options = ["enablePastHiding", "highlightCurrent", "scrollToCurrent", "expandCurrent"];

const button = document.querySelector("#saveButton");

button.addEventListener("click", (e) => {
	let saveData = Object.fromEntries(
		options.map((option) => {
			const el = document.getElementById(option);
			return [option, el.checked];
		})
	);
	chrome.storage.local.set(saveData);
	e.target.innerText = "Saved!";
	setTimeout(() => {
		e.target.innerText = "Save";
	}, 1000);
});

chrome.storage.local.get(options, (items) => {
	options.forEach((id) => {
		const el = document.getElementById(id);
		el.checked = items[id];
	});
});
