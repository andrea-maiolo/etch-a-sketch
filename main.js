const reset = document.querySelector('#Reset');
const toggle = document.querySelector('#toggle');
const rainbow = document.querySelector('#rainbow');
const fine = document.querySelector('#fine');
const pencil = document.querySelector('#black');
const erase = document.querySelector('#erase');
var randomColor = false;
var blackColor = false;
var eraseColor = false;
var container = document.querySelector('#container');
let buttonsDiv = document.querySelector('.buttons');
let main = document.querySelector('.content');
for (let i = 0; i < 256; i++) {
	container.appendChild(document.createElement('div'))
}
var divs = document.querySelectorAll('div');
divs.forEach((div) => {
	div.classList.add("gridItem");
	div.classList.add("borderGrid")
	container.classList.remove("gridItem");
	container.classList.remove("borderGrid");
	buttonsDiv.classList.remove('gridItem');
	buttonsDiv.classList.remove('borderGrid');
	main.classList.remove('gridItem');
	main.classList.remove('borderGrid');
})
container.style.gridTemplateColumns = "repeat(16, 1fr)";
container.style.gridTemplateRows = "repeat(16, 1fr)";
var gridItem = document.querySelectorAll('.gridItem');
gridItem.forEach((div) => {
	div.addEventListener('mouseenter', colorIn);
})

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
reset.addEventListener('click', start);
toggle.addEventListener('click', (e) => {
	var gridItem = document.querySelectorAll('.gridItem');
	gridItem.forEach((div) => {
		div.classList.toggle('borderGrid')
	})
})
rainbow.addEventListener('click', (e) => {
	randomColor = true;
	blackColor = false;
	eraseColor = false;
	var gridItem = document.querySelectorAll('.gridItem');
	gridItem.forEach((div) => {
		div.addEventListener('mouseenter', random);
	})
})
erase.addEventListener('click', (e) => {
	randomColor = false;
	blackColor = false;
	eraseColor = true;
	var gridItem = document.querySelectorAll('.gridItem');
	gridItem.forEach((div) => {
		div.addEventListener('mouseenter', eraseElement)
	})
})
pencil.addEventListener('click', (e) => {
	randomColor = false;
	blackColor = true;
	eraseColor = false;
	var gridItem = document.querySelectorAll('.gridItem');
	gridItem.forEach((div) => {
		div.addEventListener('mouseenter', backToBlack)
	})
})
fine.addEventListener('click', (e) => {
	var gridItem = document.querySelectorAll('.gridItem');
	gridItem.forEach((div) => {
		div.addEventListener('mouseenter', pressure)
	})
})

function backToBlack(e) {
	if (blackColor === false) {
		return
	} else {
		this.style.backgroundColor = 'black';
	}
}

function eraseElement(e) {
	if (eraseColor === false) {
		return
	} else {
		this.style.backgroundColor = '#fff';
	}
}

function random(e) {
	if (randomColor === false) {
		return
	} else {
		this.style.backgroundColor = '#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6);
	}
}

function colorIn(e) {
	this.classList.add("change");
}

function pressure(e) {
	let currentLevel = Number(e.target.style.opacity);
	if (currentLevel == 1) return;
	e.target.style.opacity = currentLevel += 0.1;
}