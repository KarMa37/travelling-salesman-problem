let cities = [];
let totalCities = 5;

function setup() {
    createCanvas(800, 600);
    for (let i = 0; i < totalCities; i++) {
        cities[i] = createVector(random(width), random(height));
    }
}

function draw() {
    background(0);
    fill(255);
    for (let i = 0; i < cities.length; i++) {
        ellipse(cities[i].x, cities[i].y, 8, 8)
    }

}