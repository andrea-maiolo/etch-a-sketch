//selecting buttons from html
const reset = document.querySelector('#Reset');
const toggle = document.querySelector('#toggle');
const rainbow = document.querySelector('#rainbow');
const fine = document.querySelector('#fine');
const pencil = document.querySelector('#black');
const erase = document.querySelector('#erase');
const container = document.querySelector('#container');
const buttonsDiv = document.querySelector('.buttons');
const content = document.querySelector('.content');

//creating the grid
for (let i = 0; i < 256; i++) {
	container.appendChild(document.createElement('div'))
}

//adding classes
const divs = document.querySelectorAll('div');
divs.forEach((div) => {
	div.classList.add("gridItem");
	div.classList.add("borderGrid")
	container.classList.remove("gridItem");
	container.classList.remove("borderGrid");
	buttonsDiv.classList.remove('gridItem');
	buttonsDiv.classList.remove('borderGrid');
	content.classList.remove('gridItem');
	content.classList.remove('borderGrid');
})

//making the grid a grid(if it makes sense)
container.style.gridTemplateColumns = "repeat(16, 1fr)";
container.style.gridTemplateRows = "repeat(16, 1fr)";

//creting the event listener for drawing on the grid
let gridItem = document.querySelectorAll('.gridItem');
gridItem.forEach((div) => {
	div.addEventListener('mouseenter', colorIn);   //this could be modified so that you need to press and hold, look web bos for canvas
})

//this is the function that add the initial color
function colorIn(e) {
	this.classList.remove('rainbow');
	this.classList.remove('fine');
	this.classList.remove('erase');
	this.classList.add("change");
}

//adding event listener to the buttons with relative functions
//this is for the rainbow color
//event listener
rainbow.addEventListener('click', (e) => {
	gridItem.forEach((div)=>{
		div.removeEventListener("mouseenter", colorIn);
		div.removeEventListener("mouseenter", eraseElement);
	})
	gridItem.forEach((div) => {
		div.addEventListener('mouseenter', random);
	})
})
//function
function random(e) {
	this.classList.add('rainbow');
	this.classList.remove('fine');
	this.classList.remove('erase');
	this.classList.remove("change");
	
	let myColor = '#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6);
	this.style.backgroundColor = myColor;
}

//this is the eraser
//event
erase.addEventListener('click', (e) => {
	gridItem.forEach((div)=>{
		div.removeEventListener("mouseenter", colorIn);
		div.removeEventListener("mouseenter", random);
	})
	gridItem.forEach((div) => {
		div.addEventListener('mouseenter', eraseElement)
	})
})
//function
function eraseElement(e) {
	this.classList.remove('rainbow');
	this.classList.remove('fine');
	this.classList.add('erase');
	this.classList.remove("change");
}

//this is the black button 
//event
pencil.addEventListener('click', (e) => {
	gridItem.forEach((div)=>{
		div.removeEventListener("mouseenter", eraseElement);
		div.removeEventListener("mouseenter", random);
	})
	gridItem.forEach((div) => {
		div.addEventListener('mouseenter', colorIn)
	})
})

//this toggle the grid borders
toggle.addEventListener('click', (e) => {
	gridItem.forEach((div) => {
		div.classList.toggle('borderGrid')
	})
})


//this is the fine drawing 
//event
fine.addEventListener('click', (e) => {
	gridItem.forEach((div) => {
		div.addEventListener('mouseenter', pressure)
	})
})
//function
function pressure(e) {
	let currentLevel = Number(e.target.style.opacity);
	if (currentLevel == 1) return;
	e.target.style.opacity = currentLevel += 0.1;
}


reset.addEventListener('click', start);
function start(a) {
	document.body.removeChild(container);
	do {
		a = (prompt("Please enter grid area(max 128)"));
	} while (isNaN(a) || a > 128 || a < 1);
	powerOf = Math.pow(a, 2);
	container = document.createElement('div');
	container.id = "container";
	document.body.appendChild(container);
	for (let j = 0; j < powerOf; j++) {
		container.appendChild(document.createElement('div'))
	}
	var divs = document.querySelectorAll('div');
	divs.forEach((div) => {
		div.classList.add("gridItem");
		div.classList.add("borderGrid")
		container.classList.remove("gridItem");
		container.classList.remove("borderGrid");
	})
	var gridItem = document.querySelectorAll('.gridItem');
	gridItem.forEach((div) => {
		div.addEventListener('mouseenter', colorIn);
	})
	container.style.gridTemplateColumns = "repeat(" + a + ", 1fr)";
	container.style.gridTemplateRows = "repeat(" + a + ", 1fr)";
}


