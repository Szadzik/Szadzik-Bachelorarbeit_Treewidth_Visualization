"use strict";

var radius;
var startRadius = 25;
var startNumber = 3;
var mapBagInformation = new Map(); //map with key = bagId, that contains the number of containing elements and the gap jumps on circle position.

var startX = 0;
var startY = 0;
var backgroundNodes = new Array();
var countTotal;
var circleNumbers;

function mapAngles() {
  bagIds.forEach(function (b) {
    var collect = cr.nodes().filter(function (ele) {
      //all nodes of group source
      return ele.data('bag') == b;
    });
    var grad = 360 / collect.length;
    mapBagInformation.set(b, {
      totalNumber: collect.length,
      numberEle: collect.length
    });
  });
  multipleOnCircle = startNumber;
  countTotal = 0;
  radius = startRadius;
  circleNumbers = startNumber;
}
/**
 * Example grad for bag elements:
 *      gradGap = 360/3 = 120 .
 *      number = 1,2 or 3 .
 *      3* 120 = (360)Grad for 3th node, then 2* 120 = (240)Grad for 2nd Node and 1* 120 = (120)Grad for 1st Node.
 * @param {*} bag 
 */


function calucatePostionCircle(bag) {
  var gap = mapBagInformation.get(bag).gradGap;
  var coordinates = determineNodePositions2(bag);
  mapBagInformation.set(bag, {
    numberEle: mapBagInformation.get(bag).numberEle - 1,
    totalNumber: mapBagInformation.get(bag).totalNumber
  });

  if (mapBagInformation.get(bag).numberEle == 0) {
    backgroundNodes.push({
      x: startX,
      y: startY
    });
    var checkNextLine = (startX + 150) % 600;
    startX = checkNextLine;
    startY = checkNextLine == 0 ? (startY + 150) % 600 : startY;
  }

  console.log("x i ", coordinates[0], " y i ", coordinates[1]);
  return {
    //coordinates
    x: coordinates[0],
    y: coordinates[1]
  };
}

function drawBackgroundNodes() {
  cr.add({
    'data': {
      id: 2
    }
  });
}

function determineNodePositions(bag) {
  var totalNumber = mapBagInformation.get(bag).totalNumber; // console.log("in detremine und totralNumber is ", totalNumber);

  var number = mapBagInformation.get(bag).numberEle; // console.log("number is ", number)

  switch (totalNumber) {
    case 0:
      break;

    case 1:
      break;

    case 2:
      var x = number == 2 ? startX + radius : startX - radius;
      var y = startY;
      return [x, y];

    case 3:
    case 4:
      console.log("determine calculate 3 ele");
      var gap = 360 / 3;
      var radiantGap = number * gap * (Math.PI / 180);
      var x = startX + radius * Math.cos((radiantGap + 10) % 360);
      var y = startY + radius * Math.sin((radiantGap + 10) % 360);
      console.log("x in det ", x, " y: ", y);
      return [x, y];

    case 5:
      var multiple = totalNumber / 3;

      if (number <= 4) {}

      break;

    default:
      break;
  } //triangle

}

function determineNodePositions2(bag) {
  var totalNumber = mapBagInformation.get(bag).totalNumber;
  countTotal += 1; //console.log("in detremine und totralNumber is ", totalNumber);

  var number = mapBagInformation.get(bag).numberEle; // console.log("number is ", number)

  if (totalNumber / startNumber <= 1) {
    //or div 4?
    //  console.log("total is KLEINER 3(startnumber) ")
    if (totalNumber == 1 || totalNumber == 0) {
      return [startX, startY];
    } else if (totalNumber == 2) {
      var x = number == 2 ? startX + radius : startX - radius; //  console.log("in case2 nodes , x is ", x, " y is: ", startY)

      return [x, startY];
    } else {
      return calculateCirlce(number);
    }
  } else {
    // console.log(" total is GRÖßER 3(startnumber) ");
    var coordinates = calculateCirlce(number);

    if (circleNumbers == countTotal) {
      // if this circle is full, increase radius and numbers of vertices on circle for next round
      circleNumbers *= 2;
      radius += startRadius;
    }

    return coordinates;
  }
}

function calculateCirlce(number) {
  console.log("determine calculate 3 ele");
  var gap = 360 / startNumber;
  var radiantGap = number * gap * (Math.PI / 180);
  var x = startX + radius * Math.cos((radiantGap + 10) % 360);
  var y = startY + radius * Math.sin((radiantGap + 10) % 360);
  console.log("x in det ", x, " y: ", y);
  return [x, y];
}

function calculate2Nodes() {//beside
}

function calculate1Nodes() {//alone
}