let seed = 4281;

let ivory = "#F1EBDD";
let silver = "#AAA6A2";

function setup() {
  pixelDensity(1);

  let canvas = createCanvas(1100, 1700);
  canvas.parent("canvas-holder");

  noLoop();
}

function draw() {
  background("#111111");

  randomSeed(seed);

  drawSwirls();
  drawStars();
}

// SWIRLS

function drawSwirls() {
  let positions = [
    [100, 100, 1],
    [1000, 100, -1],
    [100, 1600, -1],
    [1000, 1600, 1],
    [90, 500, 1],
    [1010, 500, -1],
    [90, 1200, -1],
    [1010, 1200, 1]
  ];

  for (let p of positions) {
    push();
    translate(p[0], p[1]);
    scale(p[2], 1);
    swirl();
    pop();
  }

  for (let i = 0; i < 18; i++) {
    let x = random(85, 180);
    let y = random(150, height - 150);

    if (random() > 0.5) {
      x = width - x;
    }

    push();
    translate(x, y);
    rotate(random(TWO_PI));
    scale(random(0.3, 0.65));
    swirl();
    pop();
  }
}

function swirl() {
  noFill();
  stroke(ivory);
  strokeWeight(2);

  bezier(0, 0, 40, -65, 110, -45, 85, 5);
  bezier(85, 5, 65, 45, 25, 25, 45, 5);

  stroke(silver);
  strokeWeight(1.2);

  bezier(15, 15, 65, -25, 120, 30, 90, 65);
  bezier(90, 65, 70, 90, 45, 75, 55, 55);
}

// STARS

function drawStars() {
  for (let i = 0; i < 130; i++) {
    let x = random(75, width - 75);
    let y = random(75, height - 75);

    if (x > 220 && x < 880 && y > 300 && y < 1400) {
      continue;
    }

    let size = random(3, 13);

    push();
    translate(x, y);
    rotate(random(TWO_PI));

    if (i % 4 === 0) {
      sparkle(size * 1.5);
    } else {
      star(0, 0, size, i % 2 === 0 ? 4 : 8);
    }

    pop();
  }
}

function star(x, y, size, points) {
  push();
  translate(x, y);

  noFill();
  stroke(silver);
  strokeWeight(1.3);

  beginShape();

  for (let i = 0; i < points * 2; i++) {
    let angle = TWO_PI * i / (points * 2) - HALF_PI;
    let r = i % 2 === 0 ? size : size * 0.3;

    vertex(cos(angle) * r, sin(angle) * r);
  }

  endShape(CLOSE);
  pop();
}

function sparkle(size) {
  stroke(ivory);
  strokeWeight(1.5);

  line(0, -size, 0, size);
  line(-size * 0.6, 0, size * 0.6, 0);
  line(-size * 0.35, -size * 0.35,
       size * 0.35, size * 0.35);
  line(size * 0.35, -size * 0.35,
       -size * 0.35, size * 0.35);
}

// KEYBOARD CONTROLS

function keyPressed() {
  if (key === " ") {
    seed = floor(random(100000));
    redraw();
  }

  if (key === "s" || key === "S") {
    saveCanvas("ORNAMENT-celestial-artwork", "png");
  }

  return false;
}