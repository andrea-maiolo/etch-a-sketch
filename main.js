//selecting buttons from html
const reset = document.querySelector('#Reset');
const toggle = document.querySelector('#toggle');
const rainbow = document.querySelector('#rainbow');
const fine = document.querySelector('#fine');
const pencil = document.querySelector('#black');
const erase = document.querySelector('#erase');
let container = document.querySelector('#container');
const buttonsDiv = document.querySelector('.buttons');
const content = document.querySelector('.content');

//creating the grid
for (let i = 0; i < 256; i++) {
    container.appendChild(document.createElement('div'))
}

//adding classes
function addingClass() {
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
}
addingClass();

//making the grid a grid(if it makes sense)
container.style.gridTemplateColumns = "repeat(16, 1fr)";
container.style.gridTemplateRows = "repeat(16, 1fr)";

//creting the event listener for drawing on the grid
function firstContact() {
	let gridItem = document.querySelectorAll('.gridItem');
    gridItem.forEach((div) => {
        div.addEventListener('mouseenter', colorIn);
    })
}
firstContact();

//this is the function that add the initial color
function colorIn(e) {
    this.style.backgroundColor = '';
    this.classList.remove('fine');
    this.classList.remove('erase');
    this.classList.add("change");
}

//adding event listener to the buttons with relative functions
//this is for the rainbow color
//event listener
rainbow.addEventListener('click', (e) => {
	let gridItem = document.querySelectorAll('.gridItem');
    gridItem.forEach((div) => {
        div.removeEventListener("mouseenter", colorIn);
        div.removeEventListener("mouseenter", eraseElement);
        div.addEventListener('mouseenter', random);
    })
})
//function
function random(e) {
    this.classList.remove('fine');
    this.classList.remove('erase');
    this.classList.remove("change");
    let myColor = '#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6);
    this.style.backgroundColor = myColor;
}

//this is the eraser
//event
erase.addEventListener('click', (e) => {
	let gridItem = document.querySelectorAll('.gridItem');
    gridItem.forEach((div) => {
        div.removeEventListener("mouseenter", colorIn);
        div.removeEventListener("mouseenter", random);
        div.addEventListener('mouseenter', eraseElement)
    })
})
//function
function eraseElement(e) {
    this.style.backgroundColor = '';
    this.classList.remove('fine');
    this.classList.add('erase');
    this.classList.remove("change");
}

//this is the black button 
//event
pencil.addEventListener('click', (e) => {
	let gridItem = document.querySelectorAll('.gridItem');
    gridItem.forEach((div) => {
        div.removeEventListener("mouseenter", eraseElement);
        div.removeEventListener("mouseenter", random);
        div.addEventListener('mouseenter', colorIn)
    })
})

//this toggle the grid borders
toggle.addEventListener('click', (e) => {
	let gridItem = document.querySelectorAll('.gridItem');
    gridItem.forEach((div) => {
        div.classList.toggle('borderGrid')
    })
})


//this is the fine drawing 
let checker =false;
//event
fine.addEventListener('click', checkerF)
//function that toggel the fine button
function checkerF(){
if(fine.innerHTML== "Pencil mode off"){    
    fine.innerHTML = "Pencil mode on";
	let gridItem = document.querySelectorAll('.gridItem');
    gridItem.forEach((div) => {
        div.addEventListener('mouseenter', opacity)
	})
	checker = true;
}else{
    fine.innerHTML = "Pencil mode off";
    checker = false;
    let gridItem = document.querySelectorAll('.gridItem');
    gridItem.forEach((div) => {
        div.removeEventListener('mouseenter', opacity)
	})
}
}
//function that changes the opacity of the div
function opacity(e) {
    let currentLevel = Number(this.style.opacity);
    if (currentLevel == 1) return;
    this.style.opacity = currentLevel += 0.1;
}

//THIS is the reset button that allow us to create a new grid
//event
reset.addEventListener('click', start);
//function
function start(numberForGrid) {
    content.removeChild(container);
    do {
        numberForGrid = (prompt("Please enter grid area(max 64)"));
    } while (isNaN(numberForGrid) || numberForGrid > 64 || numberForGrid < 1);
    powerOf = Math.pow(numberForGrid, 2);

    container = document.createElement('div');
    container.id = "container";
    content.appendChild(container);
    for (let j = 0; j < powerOf; j++) {
        container.appendChild(document.createElement('div'))
    }

    addingClass();
    container.style.gridTemplateColumns = "repeat(" + numberForGrid + ", 1fr)";
    container.style.gridTemplateRows = "repeat(" + numberForGrid + ", 1fr)";
    firstContact();
}