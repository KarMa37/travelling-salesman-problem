let cities = [];
let totalCities = 5;
let recordDistance;

function swap(a, i, j) {
    let temp = a[i];
    a[i] = a[j];
    a[j] = temp;
}

function calcDistance(points) {
    let sum = 0;
    for (let i = 0; i < points.length - 1; i++) {
        sum += dist(points[i].x, points[i].y, points[i + 1].x, points[i + 1].y);
    }
    return sum;
}

function setup() {
    createCanvas(800, 600);
    for (let i = 0; i < totalCities; i++) {
        cities[i] = createVector(random(width), random(height));
    }
    recordDistance = calcDistance(cities);
}

function draw() {
    background(0);
    fill(255);
    for (let i = 0; i < cities.length; i++) {
        ellipse(cities[i].x, cities[i].y, 8, 8)
    }

    stroke(255);
    strokeWeight(1);
    noFill();
    beginShape();
    for (let i = 0; i < cities.length; i++) {
        vertex(cities[i].x, cities[i].y)
    }
    endShape();

    let i = floor(random(cities.length));
    let j = floor(random(cities.length));
    swap(cities, i, j);

    let dist = calcDistance(cities);
    if (dist < recordDistance) {
        recordDistance = dist;
        console.log(recordDistance);
    }
}