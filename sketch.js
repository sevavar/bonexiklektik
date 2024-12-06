let wavelength = 75;
let waveSpeed = 0.05;
let resolution = 15;

let gradientStops;

function setup() {
  createCanvas(800, 800);
  //noCursor();
  noSmooth();

  gradientStops = [
    color(0, 0, 0),        // Black
    color(128, 0, 128),    // Purple
    color(255, 0, 0),      // Red
    color(255, 165, 0),    // Orange
    color(255, 255, 255),  // White
  ];
}

function draw() {
  background(0);

  let t = frameCount * waveSpeed;
  

  let slit1 = createVector(mouseX, mouseY);
  let slit2 = createVector(width - mouseX, height - mouseY);


  for (let x = 0; x < width; x += resolution) {
    for (let y = 0; y < height; y += resolution) {
      let screenPoint = createVector(x, y);


      let dist1 = dist(slit1.x, slit1.y, screenPoint.x, screenPoint.y);
      let dist2 = dist(slit2.x, slit2.y, screenPoint.x, screenPoint.y);


      let phase1 = (dist1 / wavelength) * TWO_PI - t;
      let phase2 = (dist2 / wavelength) * TWO_PI - t;


      let interference = sin(phase1) + sin(phase2);


      let brightness = map(interference, -2, 2, 0, 1);


      let gradientColor = getGradientColor(brightness);


      noStroke();
      fill(gradientColor);
      rect(x, y, resolution, resolution);
    }
  }


  filter(BLUR, 10);
  
  fill(0);
  noStroke();

}


function getGradientColor(value) {
  let numStops = gradientStops.length - 1;
  let scaledValue = value * numStops;
  let lowerIndex = floor(scaledValue);
  let upperIndex = ceil(scaledValue);
  let t = scaledValue - lowerIndex;

  return lerpColor(gradientStops[lowerIndex], gradientStops[upperIndex], t);
}