// function to store the task object in the list
let taskList = [];
const storeData = () => {
		let taskObject = {
		taskName: document.forms[0][0].value,
		description: document.forms[0][1].value,
		startDate: document.getElementById("startDate").value,
		endDate: document.getElementById("endDate").value
	};
	taskList.push(taskObject);
	localStorage.setItem("fullList",JSON.stringify(taskList));
}

	// function to retrieve data from local storage
const getData = () => {
	let list = document.querySelector(".list");
	list.innerHTML = "";
	let retrievedList = JSON.parse(localStorage.getItem("fullList"));
	for (let i = 0; i < retrievedList.length; i++) {
		// create and retrieve elements in the DOM
		section = document.createElement("div");
		section.classList.add("section");
		let checkbox = document.createElement("input");
		checkbox.setAttribute("type", "checkbox");
		checkbox.classList.add("checkbox");
		let taskName = document.createElement("span");
		taskName.classList.add("clickable");
		let startDate = document.createElement("span");
		daysLeft = document.createElement("span");
		daysLeft.classList.add("daysLeft");
		let icon = document.createElement("span");
		p = document.createElement("p");
		p.style.display = "none";
		icon.setAttribute("class","fas fa-times-circle");
		section.appendChild(icon);
		section.appendChild(checkbox);
		section.appendChild(taskName);
		section.appendChild(startDate);
		section.appendChild(daysLeft);
		section.appendChild(p);
		// event listener to delete individual task
		icon.addEventListener("click", deleteTask);
		// event listener to change task color when completed
		checkbox.addEventListener("change", checkTask);
		// event listener for the task
		taskName.addEventListener("click", showDescription);
		//retrieve data from local storage, and append to DOM
		let nameValue = retrievedList[i]["taskName"];
		let descriptionValue = retrievedList[i]["description"];
		let startDateValue = retrievedList[i]["startDate"];
		let endDateValue = retrievedList[i]["endDate"];
		endDateValueParsed = Date.parse(endDateValue);
		// calculate remaining days
		// append values to webpage
		if (endDateValue != '') {
			let today = Date.now();
			let result = endDateValueParsed - today;
			let oneDay = 1000 * 60 * 60 * 24;
			let diffInDays = Math.round(result / oneDay);
			daysLeft.innerHTML = diffInDays + " days remaining";
		}
		p.innerHTML = descriptionValue
		taskName.innerHTML = nameValue;
		startDate.innerHTML = startDateValue;
		document.forms[0].reset();
		list.appendChild(section);
	}
};

// function  to be called upon form submission
const addTask = (e) => {
	e.preventDefault();
	storeData();
	getData();
}

// function to toggle the display of the description
const showDescription =  (e) => {
	let parent = e.target.parentNode;
	let x = parent.lastChild;
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

// function to delete an individual task
const deleteTask = (e) => {
	let reply = confirm("Are you sure you want to delete this task?");
	if (reply) {
		list = document.querySelector(".list");
		let entry = e.target.parentNode;
		list.removeChild(entry);

	}
}

// function to delete all tasks
const clearAll = () => {
	let reply = confirm("Are you sure you want to delete all tasks?");
	if (reply) {
		localStorage.clear();
		let allSections = document.querySelectorAll(".section");
		for (let i = 0; i < allSections.length; i++) {
			document.querySelector(".list").removeChild(section);
		}
	}
}

// function to change color of checked task
const checkTask = (e) => {
	let entry = e.target.parentNode;
	if (e.target.checked) {
		entry.style.backgroundColor = "green";
		entry.removeChild(e.target);
	} else {
		entry.style.backgroundColor = "white";
	}
}

// event listener for the form submission
let button = document.querySelector(".submit");
button.addEventListener("click", addTask);

// event listener for the clear button
let clear = document.querySelector(".clear");
clear.addEventListener("click", clearAll);


// function to display existing list on page load
getData();
// localStorage.clear(); 