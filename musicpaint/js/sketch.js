let colors = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'magenta', 'brown', 'white', 'black'];
let color = 0;
let size = 28;
let x, y;
let drawing = false;


let standbySound = new Tone.Player("js/sounds/sbm.wav").toDestination();
standbySound.loop = true;
standbySound.autostart = true;


let brushSound = new Tone.Player("js/sounds/paint.wav").toDestination();


let switchSound = new Tone.Player("js/sounds/switch.wav").toDestination();


let backgroundMusic = new Tone.Player("js/sounds/bgmusic.m4a").toDestination();
backgroundMusic.loop = true;

function setup() {
  createCanvas(800, 800);
  strokeWeight(10);
  background(255);
  fill(0);
  textSize(12);

  text("standby music playing, paint to change music", 300, 700);
  text("theres a sound when switching colors", 300,720);
  text("theres a sound when painting", 300, 740);
}

function draw() {
  noStroke();
  for (let i = 0; i < colors.length; i++) {
    fill(colors[i]);
    rect(0, i * size, size, size);
  }
  stroke(colors[color]);
  
}

function mousePressed() {
  if (mouseX >= 0 && mouseX < size && mouseY >= 0 && mouseY < colors.length * size) {
    color = floor(mouseY / size);
    stroke(colors[color]);
    switchSound.start();
    drawing = false;
  } else {
    x = mouseX;
    y = mouseY;
    drawing = true;
    brushSound.loop = true;
    brushSound.start(); 
  }

 
  if (standbySound.state === "started") {
    standbySound.stop();
    backgroundMusic.autostart = true;
    backgroundMusic.start();
  }
}

function mouseReleased() {
  if (drawing) {
    brushSound.stop(); 
    drawing = false;
  }
}

function mouseDragged() {
  if (drawing) {
    line(x, y, mouseX, mouseY);
    x = mouseX;
    y = mouseY;
  }
}
