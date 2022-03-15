const DEFAULT_COLOR = "#e1eedd";
const DEFAULT_SIZE = 8;
const DEFAULT_MODE = "color";

let currentColor = DEFAULT_COLOR;
let currentSize = DEFAULT_SIZE;
let currentMode = DEFAULT_MODE;

function setCurrentColor(color) {
  currentColor = color;
}

function setCurrentSize(size) {
  currentSize = size;
}

function setCurrentMode(mode) {
  activateButton(mode);
  currentMode = mode;
}

const grid = document.getElementById("grid");
const sliderValue = document.getElementById("sizeValue");
const slider = document.getElementById("slider");
const picker = document.getElementById("picker");
const colorModeBtn = document.getElementById("colorBtn");
const rainbowModeBtn = document.getElementById("rainbowBtn");
const eraser = document.getElementById("eraserBtn");
const clear = document.getElementById("clearBtn");

picker.onchange = (e) => setCurrentColor(e.target.value);
colorModeBtn.onclick = () => setCurrentMode("color");
rainbowModeBtn.onclick = () => setCurrentMode("rainbow");
eraser.onclick = () => setCurrentMode("eraser");
clear.onclick = () => reloadGrid();
sliderValue.onmousemove = (e) => updateSizeValue(e.target.value);
slider.onchange = (e) => changeSize(e.target.value);

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

function changeSize(value) {
  sliderValue.textContent = `${value} x ${value}`;
  setCurrentSize(value);
  reloadGrid();
}

function reloadGrid() {
  clearGrid();
  setupGrid(currentSize);
}

function clearGrid() {
  grid.innerHTML = "";
}

function setupGrid(size) {
  grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  for (let i = 0; i < size * size; i++) {
    const gridElement = document.createElement("div");
    gridElement.classList.add("grid-element");
    gridElement.addEventListener("mouseover", changeColor);
    gridElement.addEventListener("mousedown", changeColor);
    grid.appendChild(gridElement);
  }
}

function changeColor(e) {
  if (e.type === "mouseover" && !mouseDown) return;
  if (currentMode === "rainbow") {
    const randomR = Math.floor(Math.random() * 256);
    const randomG = Math.floor(Math.random() * 256);
    const randomB = Math.floor(Math.random() * 256);
    e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`;
  } else if (currentMode === "color") {
    e.target.style.backgroundColor = currentColor;
  } else if (currentMode === "eraser") {
    e.target.style.backgroundColor = "#fefbe9";
  }
}

function activateButton(newMode) {
  if (currentMode === "rainbow") {
    rainbowBtn.classList.remove("active");
  } else if (currentMode === "color") {
    colorBtn.classList.remove("active");
  } else if (currentMode === "eraser") {
    eraserBtn.classList.remove("active");
  }

  if (newMode === "rainbow") {
    rainbowBtn.classList.add("active");
  } else if (newMode === "color") {
    colorBtn.classList.add("active");
  } else if (newMode === "eraser") {
    eraserBtn.classList.add("active");
  }
}

window.onload = () => {
  setupGrid(DEFAULT_SIZE);
  activateButton(DEFAULT_MODE);
};
