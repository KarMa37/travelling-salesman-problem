let cities = [];
let orders = [];
let totalCities = 6;
let recordDistance;
let bestRoute;
let totalConvertions = factorial(totalCities);
let count = 0;

function swap(a, i, j) {
    let temp = a[i];
    a[i] = a[j];
    a[j] = temp;
}

function calcDistance(points, orders) {
    let sum = 0;
    for (let i = 0; i < orders.length - 1; i++) {
        let firstCityIndex = orders[i];
        let firstCity = points[firstCityIndex];
        let secondCityIndex = orders[i + 1];
        let secondCity = points[secondCityIndex];
        sum += dist(firstCity.x, firstCity.y, secondCity.x, secondCity.y);
    }
    return sum;
}

function nextOrder() {
    count++;
    let largestI = -1;
    for (let i = 0; i < orders.length - 1; i++) {
        if (orders[i] < orders[i + 1]) {
            largestI = i;
        }
    }
    if (largestI === -1) {
        noLoop();
    }

    let largestJ = -1;
    for (let j = 0; j < orders.length; j++) {
        if (orders[largestI] < orders[j]) {
            if (orders[largestI] < orders[j]) {
                largestJ = j;
            }
        }
    }

    swap(orders, largestI, largestJ);

    let endArray = orders.splice(largestI + 1);
    endArray.reverse();
    orders = orders.concat(endArray);
}

function factorial(n) {
    if ((n === 0) || (n === 1))
        return 1;
    else {
        return (n * factorial(n - 1));
    }
}

function setup() {
    createCanvas(800, 800);
    for (let i = 0; i < totalCities; i++) {
        cities[i] = createVector(random(width), random(height));
        orders[i] = i;
    }
    recordDistance = calcDistance(cities, orders);
    bestRoute = orders.slice();
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
    for (let i = 0; i < orders.length; i++) {
        let n = orders[i];
        vertex(cities[n].x, cities[n].y)
    }
    endShape();

    stroke(255, 0, 0);
    strokeWeight(3);
    noFill();
    beginShape();
    for (let i = 0; i < orders.length; i++) {
        let n = bestRoute[i];
        vertex(cities[n].x, cities[n].y)
    }
    endShape();

    let dist = calcDistance(cities, orders);
    if (dist < recordDistance) {
        recordDistance = dist;
        bestRoute = orders.slice();
    }

    textSize(45);
    fill(255, 0, 0);
    text(`min L = ${Math.round(recordDistance)}px`, 30, height - 15);

    let percentage = 100 * (count / totalConvertions);
    textSize(45);
    fill(255, 0, 0);
    text(`${Math.ceil(percentage)}% done`, 550, height - 15);

    nextOrder();
}